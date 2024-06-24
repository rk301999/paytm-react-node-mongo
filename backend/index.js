import express from "express"
import mongoose from "mongoose"
import 'dotenv/config'
import cors from "cors"
import cookie from "cookie-parser"
import { router } from "./routes/index.js"

const app = express()
const port = process.env.PORT || 8000

//middlewares
app.use(cors({
    origin:'http://localhost:5173',
    credentials: true,
}))
 
app.use(cookie())

app.use(express.json())
app.use("/api/v1",router)

const connect = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}`,{dbName:"paytm"})
    } catch (error) {
        throw error
    }
}

app.listen(port,(req,res)=>{
    try {
         connect().then(()=>console.log("connected to db")).catch((error)=>console.log("Db not connected",error))
        console.log("connected to backend ");
    } catch (error) {
        console.log("backend connetion failed ");
    }
    
})


