import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        ownerId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        participants:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }],
        chats:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Chat'
        }],
        name:{
            type:String,
            required:true
        },
        requests:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }]
    },{
        timestamps:true
    }
)

export const Upvote = mongoose.model("Room" , roomSchema);