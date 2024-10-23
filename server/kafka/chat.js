import kafka from "../config/kafka_config";
import { createProducer } from "../config/kafka_config";
import { Chat } from "../models/chatModel";
import { Room } from '../models/roomModel.js'

export async function produceChat({chatMessage,roomId}) {
    const producer = await createProducer()
    await producer.send({
        messages:[{key:`chat-${Date.now()}-${roomId}` , value:JSON.stringify({chatMessage,roomId})}],
        topic:"CHATS"
    })
    return true
}

export async function consumeChat() {
    try {
        const consumer = kafka.consumer({groupId:'chat-group'})
        await consumer.connect()
        await consumer.subscribe({topic:'CHATS', fromBeginning:true})
        await consumer.run({
            autoCommit:true,    
            eachMessage: async ({message , pause})=>{
                const {chatMessage , roomId}  = JSON.parse(message.value.toString())
                console.log('New chat')
                try {
                    const newChat = await Chat.create(message.value?.chatMessage)
                    const room = await Room.findById(message.value?.roomId)
                    room.chats.push(newChat._id)
                    await room.save({validateBeforeSave:'true'})
                } catch (error) {
                    console.log("Something went wrong...")
                    pause()
                    setTimeout(()=>{
                        consumer.resume([{topic:'CHATS'}])
                    },60*1000)      
                }
            }
        })
    } catch (error) {
        console.log('Kafka not running')
    }
}