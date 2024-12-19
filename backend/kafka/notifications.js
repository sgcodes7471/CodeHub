import kafka from "../config/kafka_config";
import { createProducer } from "../config/kafka_config";
import {Notification} from '../models/notificationModel.js'

export async function produceNotifications({userId , notification , action}){
    const producer = await createProducer()
    await producer.send({
        messages:[{key:`notifications-${Date.now()}-${userId}` , value:JSON.stringify({payload:{notification:notification,userId:userId},action})}],
        topic:"NOTIFICATIONS"
    })
    return true
}

export async function consumeNotifications() {
    const consumer = kafka.consumer({groupId:'notifications-group'})
    await consumer.connect()
        await consumer.subscribe({topic:'NOTIFICATIONS', fromBeginning:true})
        await consumer.run({
            autoCommit:true,    
            eachMessage: async ({message , pause})=>{
                const {payload,action}  = JSON.parse(message.value.toString())
                console.log('New Notification')
                try {
                    switch(action){
                        case 'CREATE':
                            const newNotification = await Notification.create(payload.notification)
                            break;
                        case 'DELETE':
                            const notification =  await Notification.findByIdAndDelete(payload.notification._id)
                            break;
                    }
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