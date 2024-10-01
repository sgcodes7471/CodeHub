import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        },
        questionId:{
            type:String,
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
            required:true
        }
    },{
        timestamps:true
    }
)

export const Comment = mongoose.model("Comment" , commentSchema);