import mongoose from "mongoose";


const chatReactionSchema = new mongoose.Schema({
    reactor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    reaction:{
        type:String,
        enum:[':)' , ':(' , ':|' , ':/' , ';)' , ':()' ],
        //add some more from google later on
        required:true
    }
})

const chatSchema = new mongoose.Schema(
    {
        roomId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Room',
            required:true
        },
        message:{
            type:String
        },
        attachment:{
            type:String
        },
        timeSent : {
            type:String,
            required:true
        },
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        username:{
            type:String,
            required:true
        },
        reactions:[chatReactionSchema]

    },{
        timestamps:true
    }
)

export const Chat = mongoose.model("Chat" , chatSchema);