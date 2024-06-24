import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true,
        minLength:0
    }
})

export const Account =  mongoose.model("Account",AccountSchema)