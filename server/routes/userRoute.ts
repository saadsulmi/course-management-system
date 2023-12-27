import express from "express";
import { activateUser, registrationUser } from "../controllers/userControllers";
const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activate-user",activateUser)

export default userRouter;
