import {Server} from 'socket.io' 
import { pubClient , subClient } from '../config/redis_config.js'
import { LOCALHOST_URL , DEPLOYED_URL } from '../constants.js'
import { produceChat } from '../config/kafka_config.js'

class SocketService{
    constructor(){
        this._io = new Server({
            cors: {
              origin: [LOCALHOST_URL, DEPLOYED_URL],
              methods: ["GET", "POST"]
            }
          })
    }

    initListener(){
        const io = this._io

        io.on('connect' , (socket)=>{
            socket.on('join' , (roomId)=>{
                socket.join(roomId)
                subClient.subscribe(`chats:${roomId}`)
                console.log(`${socket.id} joined`)
            })
            socket.on('message' , async ({roomId , msg , userId  , username})=>{
                const chatMessage = {
                    roomId:roomId , senderId:userId , username:username , message:msg , timeSent:new Date().toISOString()
                }
                // io.to(roomId).emit('message', chatMessage)
                await pubClient.publish(`chats:${roomId}` , JSON.stringify(chatMessage))
                // const newChat = await Chat.create(chatMessage)
                // const room = await Room.findById(roomId)
                // room.chats.push(newChat._id)
                // await room.save({validateBeforeSave:true})
                await produceChat({chatMessage,roomId})
                console.log(`Chat produced`)
            })
            socket.on('disconnect',()=>{
                subClient.unsubscribe(`chats:${roomId}`)
                console.log(`${socket.id} left`)
            })
        })

        subClient.on(`message` , (channel , message)=>{
            const roomId = channel.split(':')[1]
            if(roomId) io.to(roomId).emit('message' , JSON.parse(message))
        })
    }
    
    get io(){
        return this._io
    }
}

export default SocketService
