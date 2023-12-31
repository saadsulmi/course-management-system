import { Response } from "express";
import userModel from "../models/userModel"
import { redis } from "../utils/redis";



// get user by id
export const getUserById = async (id:string,res:Response)=>{
    const userJSON =  await redis.get(id);
    if(userJSON){
        const user = JSON.parse(userJSON)
        res.status(201).json({
            success:true,
            user
        })
    }
}