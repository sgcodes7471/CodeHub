import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        adminId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        subAdminId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            default:null
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

export const Room = mongoose.model("Room" , roomSchema);