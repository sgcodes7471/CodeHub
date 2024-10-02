import { RedisGet, RedisSet } from '../config/redis_config.js'
import { Bookmark } from '../models/bookmarkModel.js'
import { Comment } from '../models/commentModel.js'
import {Question} from '../models/questionModel.js'
import { Upvote } from '../models/upvoteModel.js'

const getQuestions = async (req, res)=>{
    try {
        let questions = await RedisGet({key:'Questions'})
        if(!questions){ 
            questions = await Question.find().sort({createdAt:-1}).exec()
            RedisSet({key:'Questions' , value:questions , ex:60})
        }
        const page = req.params.page
        questions = questions.slice((page-1)*20 , page*20+1);
        return res.status(200).json({error:false,message:'Success',questions:questions})
    } catch (error) {
        return res.status(500).json({error:true,message:'Server Error occured'})
    }
}
const getQuestionById = async (req, res)=>{
    try{
        const userId = req.user._id
        const questionId = req.params.qid
        const question = await Question.findById(questionId)
        if(!question) return res.status(404).json({error:true,message:'Question not found'})

        const upvoteCheck = await Upvote.findOne({userId:userId , entityId:questionId})
        const isUpvoted = (!upvoteCheck)?false:true

        const bookmarkCheck = await Bookmark.findOne({userId:userId,questionId:questionId})
        const isBookmark = !bookmarkCheck?false:true

        let comments = await Comment.find({questionId:questionId}).sort({createdAt : -1}).exec()
        comments.map(async (comment) => {
            const commentUpvoteCheck = await Upvote.findOne({userId:userId, entityid:comment._id})
            comment={...comment , isUpvotedByUser:!commentUpvoteCheck?false:true}
        });

        return res.status(201).json({error:false,message:'Success',question:question,comments:comments,isUpvoted:isUpvoted,isBookmark:isBookmark})
    }catch(error){
        return res.status(500).json({error:true,message:'Some Error Occured'})
    }
}
const addQuestion = async (req, res)=>{
    try{
        const userId = req.user._id
        const {headline , statement , code , language , tags  }=req.body

        const tagsArray = (!tags)?[]:tags.trim().split(" ");

        if(!title || !description ) return res.status(400).json({error:true,message:"All details are not filled"})
           
        const date = new Date()
        const day = String(date.getDate())
        const month = String(date.getMonth()+1)
        const year = String(date.getFullYear())

        const newQuestion = await Question.create({userId:userId,username:user.username,code,language,headline,statement,date:`${day}/${month}/${year}`,upvote:0,tags:tagsArray})
        if(!newQuestion) throw new Error(501,'Question could be added')
        
        return res.status(200).json({error:false, message:'Successfully added'})
    }catch(error){
        return res.status(500).json({error:true,message:'Server Error occured'})
    }
}
const likeQuestion = async (req, res)=>{
    try{
        const userId=req.user._id
        const questionId=req.params.qid
        const UpvoteCheck = await Upvote.findOne({userId:userId , entityid:questionId})
        if(UpvoteCheck!== null){
            const DownVote = await Upvote.findByIdAndDelete(UpvoteCheck._id)
            if(!DownVote) return res.status(500).json({error:true, message:'Like Removed'})
               
            const question = await Question.findById(questionId)
            const currentUpvotes = question.upvotes - 1;
            question.upvotes = currentUpvotes
            await question.save({validateBeforeSave:false})
            return res.status(200).json({
                "error":false,
                "message":"UpVote Removed Successfully",
                "newUpvotes":currentUpvotes
            })
        }
        const newUpVote= await Upvote.create({userId:userId , entityId:questionId})
        if(!newUpVote) return res.status(200).json({error:false , message:'Question UpVote unsuccessfull'})
        
        const question = await Question.findById(questionId)
        const currentUpvotes = question.upvotes+1;
        question.upvotes = currentUpvotes
        await question.save({validateBeforeSave:false})
        return res.status(200)
        .json({error:false,message:"Question Upvoted Successfully",newUpvotes:currentUpvotes})
    }catch(error){
        return res.status(500).json({error:true,message:"Server Error Occured"})
    }
}
const bookmarkQuestion = async (req, res)=>{
    try{
        const userId=req.user._id
        const questionId=req.params.qid
        const bookmarkCheck = await Bookmark.findOne({userId:userId , questionId:questionId})
        if(bookmarkCheck!== null){
            const removeBookmark = await Upvote.findByIdAndDelete(UpvoteCheck._id)
            if(!removeBookmark) return res.status(500).json({error:true, message:'Bookmark Removed'})

            return res.status(200).json({error:false,message:"Bookmark Removed",})
        }
        const newBookmark= await Bookmark.create({userId:userId , entityId:questionId})
        if(!newBookmark) return res.status(200).json({error:false , message:'Question not Bookmark'})
        
        return res.status(200)
        .json({error:false,message:"Question Bookmarked"})
    }catch(error){
        return res.status(500).json({error:true,message:"Server Error Occured"})
    }
}
const deleteQuestion = async (req, res)=>{
    try{
        const questionId = req.params.qid
        const questionToBeDel = await Question.deleteById(questionId)
        if(!questionToBeDel || questionToBeDel.deletedCount===0) return res.status(500).json({error:true , message:'Question not deleted'})
        
        await Upvote.deleteMany({entityId:questionId})
        await Bookmark.deleteMany({questionId:questionId})
        const comments = await Comment.find({questionId:questionId}).exec()
        comments.map(async (comment)=>{
            await Upvote.deleteMany({entityId:comment._id})
        })
        await Comment.deleteMany({questionId:questionId})

        res.status(200).json({error:false,message:"Question Deleted Successfully"})
    }catch(error){
        return res.status(500).json({error:true,message:'Server error occured'})
    }
}
const editQuestion = async (req, res)=>{
    try {
        const {headline , statement , code , language ,tags} = req.body
        const questionId = req.params.qid
        const tagsArray = (!tags)?[]:tags.trim().split(" ");
    
        const question = await Question.findById(questionId)
        if(!question) return res.status(404).json({error:true, message:'Question not found'})
        
        question.headline = headline || question.headline
        question.statement = statement || question.statement
        question.language = language || question.language
        question.code = code || question.code
        question.tags = tagsArray || question.tags
        await question.save({validateBeforeSave:false})
    
        return res.status(200).json({error:true,message:'Edited Succesfully',question:question})
    } catch (error) {
        return res.status(500).json({error:true,message:'Server Error occured'})
    }
}
const searchQuestion = async (req, res)=>{
    const key = req.queryParams
    let questions = await RedisGet({key:'Questions'})
    if(!questions){ 
        questions = await Question.find().sort({createdAt:-1}).exec()
        RedisSet({key:'Questions' , value:questions , ex:60})
    }
    //learn something like elastico
}

export {getQuestions , getQuestionById , addQuestion , likeQuestion , bookmarkQuestion , deleteQuestion , editQuestion , searchQuestion }