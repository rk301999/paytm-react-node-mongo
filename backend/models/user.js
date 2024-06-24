import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please enter a username"],
        unique:true,
        trim:true,
        lowercase:true,
        minLength: 3,
        maxLength: 30

    },
    firstname:{
        type:String,
        trim:true,
        maxLength: 30

    },
    lastname:{
        type:String,
        required:true,
        trim:true,
        maxLength: 30

    },
    password:{
        type:String,
        required:true,
        minLength: 6,
    },
})

export const User = mongoose.model("User",UserSchema)