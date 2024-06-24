import mongoose from "mongoose";
import express from "express";
import { getBalance, transferBalance } from "../controllers/accountController.js";
import { authMiddleware } from "../middleware.js";

const accountRouter = express.Router();
accountRouter.get("/balance",authMiddleware,getBalance)
accountRouter.post("/transfer",authMiddleware,transferBalance)

export {accountRouter}