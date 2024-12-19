import Notification from '../models'
import { Request,Response } from "express"
import { RedisGet, RedisSet } from '../config/redis.config';

export const getNotifications=async(req:Request,res:Response):Promise<void>=>{
    try {
        const userId = req.user?._id
        let notifications;
        const cache = await RedisGet({key:`notification:${userId}`});
        if(!cache){
            notifications = await Notification.find({userId:userId}).sort({createdAt:-1}).exec();
            await RedisSet({key:`notification:${userId}`,value:JSON.stringify(notifications),ex:5});
        }else notifications = JSON.parse(cache);
        res.status(200).json({message:'Success',data:notifications});
    } catch (error) {
        res.status(500).json({message:'Some Error Occured'})
    }
}
