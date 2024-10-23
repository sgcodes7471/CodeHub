import { RedisDel, RedisGet, RedisSet } from "../config/redis_config.js"
import { Room } from "../models/roomModel.js"
import {Chat} from '../models/chatModel.js'

const getMyRooms = async(req, res)=>{
    try {
        const userId = req.user._id
        let myRooms = await RedisGet({key:`${userId}/myRooms`})
        if(!myRooms){
            myRooms = await Room.find({adminId:userId}).exec()
            await RedisSet({key:`${userId}/myRooms` , value:JSON.parse(myRooms) , ex:60})
        }else myRooms = JSON.parse(myRooms)
        return res.status(200).json({error:false,message:'Success',rooms:myRooms})
    } catch (error) {
        return res.status(500).json({error:true, message:'Server error occured'})
    }
}

const getChats = async(req, res)=>{
    try {
        const userId = req.params.rid
        const roomId = req.params.rid 
        // let chatsLogs = await RedisGet({key:`${roomId}/chats`})
        // if(!chatsLogs){
            const room = await Room.findById(roomId).populate('chats')
            if(!room) return res.status(404).json({error:true, message:'Room Not Found'})
            if(!((room.participants).includes(userId))) 
                return res.status(401).json({error:true , message:'Not a Participant'})
            const chatsLogs = room.chats
            // await RedisSet({key:`${roomId}/chats`,value:JSON.stringify(chatsLogs),ex:60})
        // }else chatsLogs = JSON.parse(chatsLogs)
        
        return res.status(200).json({error:false , message:'Success' , chats:chatsLogs})
    } catch (error) {
        return res.status(500).json({error:true, message:'Server error occured'})
    }
}

const createRoom = async(req, res)=>{
    try{
        const adminId = req.user._id
        const name = req.body.name

        const nameCheck = await Room.findOne({name:name})
        if(!nameCheck) return res.status(400).json({error:true,message:'Room with same Name already exists'})

        const participants = []
        participants.push(adminId)
        
        const newRoom = await Room.create({adminId , name , participants})
        if(!newRoom) throw new Error(501 , 'Room not Created')
        return res.status(201).json({error:false,message:"New Room Created"})
    }catch(error){
        return res.status(error.status||500).json({error:true,message:error.message || 'Something went wrong'})
    }
}

const joinRoomRequest = async(req, res)=>{
    try {
        const userId = req.user._id
        const roomId = req.params.rid
        let room = await RedisGet({key:`${roomId}/Rooms`})
        if(!room){
            room = await Room.findById(roomId)
            if(!room) return res.status(404).json({error:true , message:'Room Not Found'})
        }else room = JSON.parse(room)
        
        if((room.participants).includes(userId) || (room.requests).includes(userId)) 
            return res.status(200).json({error:true , message:'Already a Participant'})
        (room.requests).push(userId)
        await room.save({validateBeforeSave:false})
        await RedisSet({key:`${roomId}/Rooms` , value:JSON.stringify(room) , ex:60})
        //add kafka for CHAT
        return res.status(200).json({error:false, message:'Request Made'})
    } catch (error) {
        return res.status(500).json({error:true, message:'Server error occured'})
    }
}

const cancelJoinRoomRequest = async(req, res)=>{
    const userId = req.user._id
    const roomId = req.params.rid
    let room = await RedisGet({key:`${roomId}/Rooms`})
    if(!room){
        room = await Room.findById(roomId)
        if(!room) return res.status(404).json({error:true , message:'Room Not Found'})
    }else room = JSON.parse(room)

    if(!(room.requests.includes(userId))) return res.status(400).json({error:true,message:'No request was made'})
    room.requests.pull(userId)
    await room.save({validateBeforeSave:false})
    await RedisSet({key:`${roomId}/Rooms` , value:JSON.stringify(room) , ex:60})
    return res.status(200).json({error:false,message:'Request Cancelled'})
}

const getRoomRequest = async(req, res)=>{
    const userId = req.user._id
    const roomId = req.params.rid
    let room = await RedisGet({key:`${roomId}/Rooms`})
    if(!room){
        room = await Room.findById(roomId)
        if(!room) return res.status(404).json({error:true , message:'Room Not Found'})
        await RedisSet({key:`${roomId}/Rooms` , value:JSON.stringify(room) , ex:60})
    }else room = JSON.parse(room)

    if(room.adminId !== userId) return res.status(401).json({error:true, message:'Only Admins can view the requests'})
    const requests = room.populate('requests')
    return res.status(200).json({error:false,message:'Success',requests:requests})
}

const handleRoomRequest = async(req, res)=>{
    const userId = req.user._id
    const roomId = req.params.rid
    let room = await RedisGet({key:`${roomId}/Rooms`})
    if(!room){
        room = await Room.findById(roomId)
        if(!room) return res.status(404).json({error:true , message:'Room Not Found'})
    }else room = JSON.parse(room)

    if(room.adminId !== userId) return res.status(401).json({error:true, message:'Only Admins can view and handle the requests'})
    const choice = req.body.choice  
    const requestId =  req.body.id
    if(!(room.requests.includes(requestId))) return res.status(404).json({error:true, message:'Request does not exist'})

    room.request.pull(requestId)
    if(choice) room.participants.push(requestId)
    await room.save({validateBeforeSave:false})
    await RedisSet({key:`${roomId}/Rooms` , value:JSON.stringify(room) , ex:60})
    //add kafka for CHAT
    return res.status(200).json({error:false, message:'Success'})
}

const leaveRoom = async(req, res)=>{
    const userId = req.user._id
    const roomId = req.params.rid
    let room = await RedisGet({key:`${roomId}/Rooms`})
    if(!room){
        room = await Room.findById(roomId)
        if(!room) return res.status(404).json({error:true , message:'Room Not Found'})
    }else room = JSON.parse(room)

    if(!(room.participants.includes(userId))) 
        return res.status(401).json({error:true, message:'Your are not a participate'})
    if(room.adminId === userId && !(room.subAdminId)) 
        return res.status(401).json({error:true , message:'Make someone Sub-Admin before leaving'})
    else if(room.adminId === userId && room.subAdmin){
        room.adminId = room.subAdminId
        room.subAdminId = null
    }
    room.participants.pull(userId)
    await room.save({validateBeforeSave:false})
    await RedisSet({key:`${roomId}/Rooms` , value:JSON.stringify(room) , ex:60})
    return res.status(200).json({error:false, message:'Success'})
}

const searchRoom = async(req, res)=>{
    //learn about ElaticoSearch
}

const deleteRoom = async(req, res)=>{
    const userId = req.user._id
    const roomId = req.params.rid
    let room = await RedisGet({key:`${roomId}/Rooms`})
    if(!room){
        room = await Room.findById(roomId)
        if(!room) return res.status(404).json({error:true , message:'Room Not Found'})
    }else room = JSON.parse(room)

    if(room.adminId !== userId) return res.status(401).json({error:true, message:'Only Admins can delete groups'})
    const deleteChats = await Chat.deleteMany({roomId:roomId})
    await RedisDel({key:`${roomId}/Rooms`})
    const deleteRoom = await Room.findByIdAndDelete(roomId)
    return res.status(200).json({error:false , message:'Deleted'})
}

const getParticipants = async(req, res)=>{
    const roomId = req.params.rid
    let participants = await RedisGet({key:`${roomId}/Participants`})
    if(!participants){
        const room = await Room.findById(roomId).populate('participants')
        participants = room.participants
        await RedisSet({key:`${roomId}/Participants` , value:JSON.stringify(participants) , ex:60})
    }else participants = JSON.parse(participants)

    return res.status(200).json({error:false , mesage:'Success'})

}

const removeParticipant = async(req, res)=>{
    const userId = req.user._id
    const roomId = req.params.rid
    let room = await RedisGet({key:`${roomId}/Rooms`})
    if(!room){
        room = await Room.findById(roomId)
        if(!room) return res.status(404).json({error:true , message:'Room Not Found'})
    }else room = JSON.parse(room)

    if(room.adminId !== userId) return res.status(401).json({error:true, message:'Only Admins can remove participants'})

    const removeId = req.params.id
    if(removeId === room.subAdminId) room.subAdminId = null
    if(!(room.participants.includes(removeId))) return res.status(400).json({error:true,message:'Not a Participant'})
    room.participants.pull(removeId)
    await room.save({validateBeforeSave:true})
    await RedisSet({key:`${roomId}/Rooms` , value:JSON.stringify(room) , ex:60})
    //add kafka for CHAT
    return res.status(200).json({error:false , message:'Success'})
}

export {getMyRooms , getChats , createRoom , joinRoomRequest , getRoomRequest , handleRoomRequest , leaveRoom ,
    searchRoom , deleteRoom , getParticipants , removeParticipant}