import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        username:{
            type:String,
            required:true
        },
        questionId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Question',
            required:true
        },
        text:{
            type:String,
            required:true
        },
        code:{
            type:String
        },
        upvote:{
            type:Number,
            default:0
        }
    },{
        timestamps:true
    }
)

export const Comment = mongoose.model("Comment" , commentSchema);