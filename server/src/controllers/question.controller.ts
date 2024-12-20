import Question from '../models'
import { RedisGet, RedisSet } from '../config/redis.config';
import { Request, Response } from "express";

export async function getQuestions(req:Request , res:Response):Promise<void> {
    try {
        const {page} = req.params
        let cache = await RedisGet({key:`feed:${page}`});
        let feed;
        if(cache && cache?.length === 0){ 
            feed = await Question.find().sort({createdAt:-1}).limit(20);
            RedisSet({key:`feed:${page}`,value:JSON.stringify(feed),ex:15});
        }else feed=JSON.parse(cache||'');
        res.status(200).json({message:'Success',data:feed});
    } catch (error) {
        res.status(200).json({messaage:'Success'});
    }
}
export async function getQuestionById(req:Request , res:Response):Promise<void> {
    try {
        const {qid} = req.params;
        let i = req.query.i;
        let index = typeof i==='number'?parseInt(i,10):-1;
        const page = Math.floor(index/10);
        const cache:string|null = await RedisGet({key:`feed:${page}`});
        let question;
        if(!cache) question = await Question.findById(qid);
        else question = JSON.parse(cache)[index%10];
        res.status(201).json({message:'Success',data:question});
    } catch (error) {
        res.status(200).json({messaage:'Success'});
    }
}
export async function deleteQuestion(req:Request , res:Response):Promise<void> {
    try {
        const {qid} = req.params;
        await Question.findByIdandDelete(qid);
        res.status(200).json({message:'Success'});
    } catch (error) {
        res.status(500).json({message:'Server Error Occured'})
    }
}
export async function searchQuestion(req:Request , res:Response):Promise<void> {
    
}