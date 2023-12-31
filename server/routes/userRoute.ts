import express from "express";
import { activateUser, getUserInfo, loginUser, logoutUser, registrationUser, socialAuth, updateAccessToken, updateUserInfo } from "../controllers/userControllers";
import { authorizerRole, isAuthenticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post("/registration", registrationUser);
userRouter.post("/activateUser",activateUser);
userRouter.post("/login",loginUser);
userRouter.get("/logout",isAuthenticated,logoutUser);
userRouter.get("/refreshToken",updateAccessToken);
userRouter.get('/me',isAuthenticated,getUserInfo)
userRouter.post('/socialAuth',socialAuth)
userRouter.put('/updateUserInfo',isAuthenticated,updateUserInfo)

export default userRouter;
