import { Comment } from "../models/commentModel.js"
import { User } from "../models/userModel.js"
import { Upvote } from "../models/upvoteModel.js"

const getComments = async()=>{
    const questionId = req.params.qid
    const userId = req.user._id
    let comments = await RedisGet({key:`${userId}/Comments:${questionId}`});
    if(!comments){ 
        comments = await await Comment.findMany({questionId:questionId}).sort({upvotes:-1 , createdAt:-1}).exec()
        RedisSet({key:`${userId}/Comments:${questionId}` , value:JSON.stringify(comments) , ex:60})
    }else comments=JSON.parse(comments)
    const page = req.params.page
    comments = comments.slice((page-1)*20 , page*20+1);
    return res.status(200).json({error:false,message:'Success',comments:comments})
}
const addComment = async()=>{
    try{
        const userId = req.user._id
        const questionId= req.params.qid
        const comment = req.body.comment
        if(!comment) return res.status(400).json({error:true, message:'Inadequete Information'})

        const date = new Date()
        const day = String(date.getDate())
        const month = String(date.getMonth()+1)
        const year = String(date.getFullYear())

        const user = await User.findById(userId)

        const newComment = await Comment.create({userId:userId,questionId:questionId,username:user.username,comment:comment,date:`${day}/${month}/${year}`})
        //implement kafka for GEN
        if(!newComment) return res.status(200).json({error:true, message:'Server Error Occured'})
    
        return res.status(200).json({error:false,message:"Success",newComment:newComment})
    }catch(error){
        return res.status(500).json({error:true,message:"Server Error Occured"})
    }
}
const likeComment = async()=>{
    try{
        const userId=req.user._id
        const commentId =  req.params.cid
        const UpvoteCheck = await Upvote.findOne({userId:userId , entityId:commentId})
        if(UpvoteCheck!== null){
            const DownVote = await Upvote.findByIdAndDelete(UpvoteCheck._id)
            if(!DownVote) return res.status(400).json({error:true, message:'UpVote not removed due to technical error'})
               
            const comment = await Comment.findById(commentId)
            const currentUpvotes = comment.upvotes - 1;
            comment.upvotes = currentUpvotes
            const newUpvoteCount = await comment.save({validateBeforeSave:false})
            await Upvote.findOneAndDelete({userId:userId , entityId:commentId})
            return res.status(400).json({ error:false,message:"UpVote Removed Successfully", newUpvotes:newUpvoteCount.upvotes})
        }
        const newUpVote= await Upvote.create({userId:userId , entityId:commentId})
        if(!newUpVote) return res.status(200).json({error:true, message:'UpVote not removed due to technical error'})
               
        const comment = await Comment.findById(commentId)
        const currentUpvotes = comment.upvotes +1;
        comment.upvotes = currentUpvotes
        const newUpvoteCount = await comment.save({validateBeforeSave:false})
        //Kafka for GEN
        return res.status(200).json({error:false,message:"Answer Upvoted Successfully",newUpvotes:newUpvoteCount.upvote})
    }catch(error){
        return res.status(500).json({error:true,message:'server error occured'})
    }
}
const deleteComment = async()=>{
    try{
        const commentId = req.params.cid
        const user = req.user;
        const commentToBeDel = await Comment.deleteOne({userid:user._id  , _id:commentId})
        if(!commentToBeDel || commentToBeDel.deletedCount===0) 
            return res.status(400).json({error:true, message:'Server error OCcured'})

        await Upvote.deleteMany({entityId:commentId})
        res.status(200).json({error:false,message:"Answer Deleted Successfully"})
    }catch(error){
        return res.status(500).json({error:true,message:"Server error occured"})
    }
}
const editComment = async()=>{
    try {
        const commentId = req.params.cid
        const userId = req.user._id
        const comment = await Comment.findById(commentId)
        if(!comment) return res.status(404).json({error:true, message:'Comment not found'})
        if(comment.userId !== userId) return res.status(401).json({error:true,message:'Unauthorized to Edit'})
        const {text , code }=req.body
        comment.text = text || comment.text
        comment.code = code || comment.code
        await comment.save({validateBeforeSave:false})
        return res.status(200).json({error:true , message:'Edited'})
    } catch (error) {
        return res.status(500).json({error:true, message:'Server Error Occured'})
    }
}


export {getComments , addComment , likeComment , deleteComment , editComment}