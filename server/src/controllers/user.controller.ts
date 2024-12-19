import {User,Question} from '../models'
import { Request, Response } from "express";

export const getProfile=async(req:Request,res:Response):Promise<void>=>{
    try {
        const userId = req.user?._id
        const user = await User.findById(userId).select('-password -refreshToken')
        if(!user) throw new Error('User not found')
        res.status(201).json({message:'Success',data:user})
    } catch (error) {
        res.status(500).json({message:'Some Error Occured'})
    }   
}
export const Logout=async(req:Request,res:Response):Promise<void>=>{
    try {
        const  userId = req.user?._id;
        const user=await User.findById(userId)
        if(!user) throw new Error('User Not Found')
        user.refreshToken = ''
        await user.save({validateBeforSave:false})
        const options ={
            httpOnly:true,
            secure:process.env.DEV_STATE === 'production'
        }
        res.status(200).clearCookie('AccessToken' , options).clearCookie("RefreshToken",options)
        .json({message:"User Logged Out Successfully"})
    } catch (error) {
        res.status(500).json({message:'Some Error Occured'})
    }
}
export const getQuestions=async(req:Request,res:Response):Promise<void>=>{
    const userId = req.user?._id
    const questions = await Question.find({userId:userId}).sort({createdAt: -1}).exec()
    res.status(201).json({error:false , message:'Success' , data:questions || []})
}