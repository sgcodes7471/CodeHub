import mongoose from "mongoose";

const educatorSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true
        },
        courses:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Course'
        }],
        dateJoined:[{
            type:Date,
            required:true
        }]
    },{
        timestamps:true
    }
)

export const Upvote = mongoose.model("Educator" , educatorSchema);