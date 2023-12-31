import { Request,Response,NextFunction } from 'express';
import { catchAsyncError } from './catchAsyncError';
import {redis} from '../utils/redis'
import jwt , {JwtPayload} from 'jsonwebtoken'
import ErrorHandler from '../utils/ErrorHandler';


//  user authentication

export const isAuthenticated = catchAsyncError(async (req:Request,res:Response,next:NextFunction)=>{
    const accessToken = req.cookies.access_token as string;

    if(!accessToken){
        return next(new ErrorHandler('Please login to access the resource',400))
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN as string) as JwtPayload;

    if(!accessToken){
        return next(new ErrorHandler('Access token is not valid',400))
    }

    const user = await redis.get(decoded.id);

    if(!user){
        return next(new ErrorHandler('User not found',400))
    }

    req.user= JSON.parse(user);

    next()
})


//  user Authorization

export const authorizerRole = (...roles : string[])=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        if(!roles.includes(req.user?.role||'')){
            return next( new ErrorHandler(`Role ${req.user?.role} is not allowed to access this route`,403))
        }
        next()
    }
}