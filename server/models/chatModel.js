import mongoose from "mongoose";

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
            type:Date,
            required:true
        },
        senderId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        },
        reactions:[chatReactionSchema]

    },{
        timestamps:true
    }
)

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

export const Upvote = mongoose.model("Chat" , chatSchema);