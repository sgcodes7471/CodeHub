import mongoose from "mongoose";

const upvoteSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        entityid:{
            type:String,
            required:true
        }
    },{
        timestamps:true
    }
)

export const Upvote = mongoose.model("Upvote" , upvoteSchema);