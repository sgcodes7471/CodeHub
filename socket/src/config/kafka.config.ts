import { Kafka, Producer } from "kafkajs";
import { chats } from "../types";

class KafkaService{
    private _producer:null|Producer;
    private _kafka:Kafka;
    private _messages:chats[];
    private _processing:boolean;
 
    constructor(){
        this._producer = null;
        this._kafka = new Kafka({
            clientId: "codehub",
            brokers: ["<PRIVATE_IP>:9092"], //this will change jab we get the free kafka cloud
        });
        this._messages = [];
        this._processing = false;
    }

    async init(){
        const producer = this._producer;
        const kafka = this._kafka;
        const admin = kafka.admin();
        console.log("Admin connecting");
        admin.connect();
        console.log("Admin Connection Success");
  
        console.log("Creating Topic chats");
        await admin.createTopics({
        topics: [
        {
          topic: "chats",
          numPartitions: 1,
        },
      ],
    });
        console.log("Topic Created Success chats");
  
        console.log("Disconnecting Admin");
        await admin.disconnect();
    }

    async createProducer():Promise<Producer|null> {
        try {
            console.log('Creating a producer');
            if (this._producer) return this._producer;
            this._producer = this._kafka.producer();
            await this._producer.connect();
            console.log('Producer Sorted');
            return this._producer;
        } catch (error) {
            return null;
        }
    }
    
    async produceChat(chat:string):Promise<boolean> {
      const producer = await this.createProducer();
      if(!producer) {
        console.log('Producer not formed');
        return false;
      }
      await producer.send({
        messages: [{ key:`chat-${Date.now()}`, value:chat }],
        topic: "CHATS",
      });
      return true;
    }
    
    async consumeChat() {
      console.log("Consumer is running");
      const consumer = this._kafka.consumer({ groupId:"default" });
      await consumer.connect();
      await consumer.subscribe({ topic:"CHATS",fromBeginning:true });
    
      await consumer.run({
        autoCommit: true,
        eachMessage: async({ message }) => {
          if (!message.value) return;
          console.log(`New Chats`);
          const chat:chats = JSON.parse(message.value.toString());
          this._messages.push(chat);
          const backupBatch = [...this._messages];
          this._messages.length = 0;
          await this.addToDb(backupBatch);
        },
      });
      setInterval(async ()=>{
        const backupBatch = [...this._messages];
        this._messages.length = 0;
        await this.addToDb(backupBatch);
      },5000)
    }

    async addToDb(backupBatch:chats[]) {
        try {
            if(backupBatch.length > 200) {
                //db work
                //await Chats.insertMany(backupBatch,{ordered:false});
                console.log('Bulk insertion to database')
            }
          } catch (err) {
            console.log("Something went wrong");
            this._messages.push(...backupBatch);
          }
    }

    get kafka() {
        return this._kafka;
    }
}

export default KafkaService
