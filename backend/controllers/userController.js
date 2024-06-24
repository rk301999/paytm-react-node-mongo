import {z} from "zod"
import { User } from "../models/user.js"
import { Account } from "../models/account.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const signupSchema = z.object({
    username:z.string().email(),
    firstname:z.string(),
    lastname:z.string(),
    password:z.string()
})

const signinSchema = z.object({
    username:z.string().email(),
    password:z.string()
})

const updateSchema = z.object({
    password:z.string().optional(),
    firstname:z.string().optional(),
    lastname:z.string().optional(),
})

export const signup=async(req,res)=>{
    const {success} = signupSchema.safeParse(req.body);

    if(!success){
        res.status(411).json({message:"Email already taken / Incorrect inputs"})
    }

    const existingUser = await User.findOne({
        username: req.body.username
    })

    if(existingUser){
        res.status(411).json({message:"Email already taken / Incorrect inputs"})
    }

    //hashing password
    const hashpassword = await bcrypt.hash(req.body.password, 10)

    const user = await User.create({
        username:req.body.username,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        password:hashpassword,
    })

    await Account.create({
        userId:user._id,
        balance:1+Math.random()*10000
    })

    res.status(200).json({
        message: "User created successfully",
    })

}

export const signin=async(req,res)=>{
    try {
        const {success} = signinSchema.safeParse(req.body)

    if(!success){
        res.status(411).json({
            message: "Error while logging in"
        })
    }

    const user = await User.findOne({
        username:req.body.username
    })

    if(!user){
        res.status(411).json({
            message: "user not found"
        })
    }

    const ispasswordCorrect = await bcrypt.compare(req.body.password,user.password)

    if(!ispasswordCorrect){
        res.status(411).json({
            message: "Wrong password"
        })
    }
    console.log(user);
    const {password,...others} = user._doc
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
    
    // res.cookie("access_token",token).status(200).json("loggedin")
    res.status(200).json({
        message:"loggedin",
        token:token,
    })
    } catch (error) {
        console.log(error);
    }

}

export const update=async(req,res)=>{
    const {success}=updateSchema.safeParse(req.body)

    if(!success){
        res.send(411).json({
            message: "Error while updating information"
        })
    }
    const{password,firstname,lastname} = req.body
    

    const updateduser = await User.updateOne({
        firstname:req.body?.firstname ,
        lastname:req.body?.lastname,
    },{ _id: req.userId})

    if(password){
        password=await bcrypt.hash(password,10)
    }
    else{
        res.json({
            message: "Updated successfully",
            updateduser,
        }) 
    }
    updateduser = await User.updateOne({
        password:password ,
    },{ _id: req.userId})

    res.json({
        message: "Updated successfully",
        updateduser,
    })
}

export const bulkGetUser =async(req,res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or:[{firstname:{"$regex":filter}},{lastname:{"$regex":filter}}]
    })
    res.status(200).json({
        user:users.map(user=>({
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user._id
        }))
    })
}