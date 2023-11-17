import express from "express";
import { registrationUser } from "../controllers/userControllers";
const userRouter = express.Router();

userRouter.post("/registration", registrationUser);

export default userRouter;
