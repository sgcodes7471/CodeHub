import Comment from '../models'
import { Request, Response } from "express";
import { RedisGet, RedisSet } from "../config/redis.config";

export const getComments=async (req:Request,res:Response):Promise<void>=>{
    try {
        const {qid}=req.params;
        let comments;
        const cache = await RedisGet({key:`comments:${qid}`});
        if(!cache){
            comments=await Comment.find({questionId:qid});
            await RedisSet({key:`comments-${qid}`,value:JSON.stringify(cache),ex:15})
        }else comments=JSON.parse(cache);
        res.status(200).json({message:'Success',data:comments});
    } catch (error) {
        res.status(200).json({messaage:'Success'});
    }
}
export const deleteComment = async (req:Request,res:Response):Promise<void>=>{
   try {
     const {commentId} = req.params;
     await Comment.deleteById(commentId);
     res.status(200).json({message:'Success'})
   } catch (error) {
    res.status(200).json({messaage:'Success'});
   }
}