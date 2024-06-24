import express from "express";
import { signup,signin ,update,bulkGetUser} from "../controllers/userController.js";
import { authMiddleware } from "../middleware.js";

const userRouter = express.Router();

userRouter.post("/signup",signup)
userRouter.post("/signin",signin)
userRouter.put("/",authMiddleware,update)
userRouter.get("/bulk",authMiddleware,bulkGetUser)

export {userRouter}
