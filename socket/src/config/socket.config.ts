import {Server} from 'socket.io' 
import { pubClient , RedisGet, RedisSet, subClient } from '../config/redis.config'
import { LOCALHOST_URL , DEPLOYED_URL } from './constants'
import KafkaService from './kafka.config';
import { chats } from '../types';

class SocketService{
    private _io: Server;
    constructor(){
        this._io = new Server({
            cors: {
              origin: [LOCALHOST_URL, DEPLOYED_URL],
              methods: ["GET", "POST"]
            }
          })
    }

    init(){
        const io = this._io
        const kafkaService = new KafkaService();
        kafkaService.init();
        kafkaService.consumeChat();
        io.on('connect' , (socket)=>{
            socket.on('join' , (roomId)=>{
                socket.join(roomId)
                subClient.subscribe(`chats:${roomId}`,(message,channel)=>{
                    const roomId = channel.split(':')[1]
                    if(roomId) io.to(roomId).emit('message' , message)
                })
                console.log(`${socket.id} joined`)
            })
            socket.on('message' , async ({roomId , message , senderId  , username})=>{
                const chatMessage:chats = {
                    roomId:roomId , senderId:senderId , username:username , message:message , timeSent:new Date().toISOString()
                }
                await pubClient.publish(`chats:${roomId}` , JSON.stringify(chatMessage));
                const cache = await RedisGet({key:`room:${roomId}`});
                if(cache){
                    const room = JSON.parse(cache);
                    room.chats.push(chatMessage);
                    await RedisSet({key:`room:${roomId}`,value:JSON.stringify(room),ex:5});
                }
                await kafkaService.produceChat(JSON.stringify(chatMessage));
                console.log(`Chat produced`)
            })
        })

        // subClient.on(`message` , (channel , message)=>{
        //     const roomId = channel.split(':')[1]
        //     if(roomId) io.to(roomId).emit('message' , JSON.parse(message))
        // })
    }
    
    get io(){
        return this._io
    }
}

export default SocketService
