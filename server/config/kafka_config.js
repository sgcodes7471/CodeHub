import {Kafka} from 'kafkajs'
import fs from 'fs'
import path from 'path'
import { Chat } from '../models/chatModel.js'
import { Room } from '../models/roomModel.js'

const kafka = new Kafka({
    client:'codeHub',
    brokers : ['localhost:9092'],
    //The below code is for running kafka on cloud at time of production
    // ssl:{
    //     ca:[fs.readFileSync(path.resolve('../ca_kafka.pem'),"utf-8")],
    //     //make sure to add the ca.pem file in the same directory as this file.
    // },
    // sasl:{
    //     username:"",
    //     password:process.env.PASSWORD,
    //     mechanism:"plain"
    // }
})

let producer = null

export async function createProducer() {
    if(producer) return producer

    const _producer = kafka.producer()
    await _producer.connect()
    producer = _producer
    return producer
}

export async function produceChat({chatMessage,roomId}) {
    const producer = await createProducer()
    await producer.send({
        messages:[{key:`chat-${Date.now()}` , value:JSON.stringify({chatMessage,roomId})}],
        topic:"CHATS"
    })
    return true
}

export async function consumeChat() {
    const consumer = kafka.consumer({groupId:'default'})
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
}

export default kafka