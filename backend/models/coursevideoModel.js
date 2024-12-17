import mongoose from "mongoose";

const courseVideoSchema = new mongoose.Schema(
    {
        courseId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course',
            required:true
        },
        video:{
            type:String,
            required:true
        },
        thumbnail:{
            type:String,
            required:true
        },
        duration:{
            type:Number,
            required:true
        },
        description:{
            type:String,
        },
        title:{
            type:String,
            required:true
        }
    },{
        timestamps:true
    }
)

export const Upvote = mongoose.model("CourseVideo" , courseVideoSchema);