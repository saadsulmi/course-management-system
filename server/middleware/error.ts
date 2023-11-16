import { NextFunction, Request, Response } from "express";
import ErrorHandler from "../utils/ErrorHandler";

export const ErrorMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongodb id
  if (err.name === "CastError") {
    const message = `resourse not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // duplicate key
  if (err.name === 11000) {
    const message = `Duplicate ${Object.keys(err.value)} entered`;
    err = new ErrorHandler(message, 400);
  }
  // wrong JWT
  if (err.name === "JsonWebTokenError") {
    const message = `Json web token is invalid try again`;
    err = new ErrorHandler(message, 400);
  }
  // JWT expired Error
  if (err.name === "TokenExpiredError") {
    const message = `resourse not found. Invalid ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
