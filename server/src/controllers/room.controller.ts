import {Room,Chats} from '../models'
import { Request, Response } from "express";
import { RedisGet, RedisSet } from "../config/redis.config";

export const getMyRooms=async(req:Request,res:Response):Promise<void>=>{
    try {
        const userId = req.user?._id;
        let cache = await RedisGet({key:`rooms:${userId}`});
        let rooms;
        if(!cache){
            rooms=await Room.find({participants:userId}).populate('participants requests').exec();
            await RedisSet({key:`rooms:${userId}`,value:JSON.stringify(rooms),ex:15});
        }else rooms = JSON.parse(cache);
        res.status(201).json({message:'Success',data:rooms});
    } catch (error) {
        res.status(500).json({message:'Some Error Occured'});
    }
}
export const getChats=async(req:Request,res:Response):Promise<void>=>{
    try {
        const {rid} = req.params;
        const cache = await RedisGet({key:`room:${rid}`});
        let room;
        if(!cache){
            room=await Room.findById(rid).populate('chats').exec();
            if(!room || !room.participants?.includes(req.user?._id)) throw new Error('Not a Participants');
            await RedisSet({key:`room:${rid}`,value:JSON.stringify(room),ex:5});
        }else{
            room=JSON.parse(cache);
            if(!room.participants?.includes(req.user._id)) throw new Error('Not a Participants');
        }
        res.status(200).json({message:'Success',data:room.chats});
    } catch (error) {
        res.status(500).json({message:'Server Error Occured'});
    }
}
export const searchRoom=async(req:Request,res:Response):Promise<void>=>{
    try {
        const name = req.query.key;
        if(!name ||(typeof name==='string' && name.trim().length===0)) throw new Error('No query made');
        const rooms = await Room.find({name:{$regex:name,$options:'i'}});
        res.status(200).json({message:'Success',data:rooms});
    } catch (error) {
        res.status(200).json({message:"Server Error Occured"});
    }
}
export const deleteRoom=async(req:Request,res:Response):Promise<void>=>{
    try {
        const {rid} = req.params;
        const cache = await RedisGet({key:`room:${rid}`});
        let room;
        if(!cache){
            room=await Room.findById(rid).populate('chats').exec();
            if(!room || room.adminId!=req.user._id) throw new Error('Not a Participants');
            await RedisSet({key:`room:${rid}`,value:JSON.stringify(room),ex:5});
        }else{
            room=JSON.parse(cache);
            if(room.adminId!=req.user._id) throw new Error('Not a Participants');
        }
        await Chats.deleteMany({roomId:rid});
        await Room.findByIdandDelete(rid);
        res.status(200).json({message:'Success'});
    } catch (error) {
        res.status(500).json({message:'Server Error Occured'});
    }
}