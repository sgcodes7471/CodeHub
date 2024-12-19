import mongoose from "mongoose";

const courseNotesSchema = new mongoose.Schema(
    {
        courseId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course',
            required:true
        },
        notes:{
            type:String,
            required:true
        },
        title:{
            type:String,
            required:true
        }
    },{
        timestamps:true
    }
)

export const Upvote = mongoose.model("CourseNotes" , courseNotesSchema);