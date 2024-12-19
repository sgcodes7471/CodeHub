import mongoose from "mongoose";

const courseFeedbackSchema = new mongoose.Schema(
    {
        courseId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course',
            required:true
        },
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        username:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true,
        },
        feedback:{
            type:String,
        },
        visibility:{
            type:Boolean,
            default:true
        }
    },{
        timestamps:true
    }
)

export const Upvote = mongoose.model("CourseFeedback" , courseFeedbackSchema);