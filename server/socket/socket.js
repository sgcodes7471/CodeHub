import {Server} from 'socket.io' 
import { RedisGet, RedisPush, RedisSet , RedisPull } from '../config/redis_config.js'
import { Chat } from '../models/chatModel.js'
import { Room } from '../models/roomModel.js'

class SocketService{
    constructor(){
        this._io = new Server()
    }

    initListener(){
        const io = this._io
        io.on('connect' , (socket)=>{
            socket.on('join' , (roomId)=>{
                socket.join(roomId)
                console.log(`${socket.id} joined`)
            })
            socket.on('message' , async ({roomId , msg , userId  , username})=>{
                const chatMessage = {
                    roomId:roomId , senderId:userId , username:username , message:msg , timeSent:new Date().toISOString
                }
                io.to(roomId).emit('message', chatMessage)
                const newChat = await Chat.create(chatMessage)
                const room = await Room.findById(roomId)
                room.chats.push(newChat._id)
                await room.save({validateBeforeSave:true})
            })
        })
    }
    
    get io(){
        return this._io
    }
}

export default SocketService
