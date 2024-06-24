
import mongoose from "mongoose"
import { Account } from "../models/account.js"

export const getBalance = async(req,res)=>{

    const account = await Account.findOne({
        userId:req.userId
    })

    res.status(200).json({
        "balance":account.balance,
    })
}

export const transferBalance = async(req,res)=>{

    const session = await mongoose.startSession();
    session.startTransaction();

    const {to,amount} = req.body;

    const account = Account.findOne({
        userId:req.userId
    }).session(session)
    
    if(account.balance < amount){
        await session.abortTransaction();
        res.status(400).json("insufficient balance")
    }

    const toAccount = Account.findOne({
        userId:to
    }).session(session)

    if(!toAccount){
        await session.abortTransaction();
        res.status(400).json("Invalid Account")
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance: -amount}})
    await Account.updateOne({userId:to},{$inc:{balance: amount}})


    await session.commitTransaction()

    res.status(200).json("transfer successful")
}