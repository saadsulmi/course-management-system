import mongoose from "mongoose";
require("dotenv").config();

const dbUrl: string = process.env.DB_URI || process.env.DB_LOCAL || "";
export const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then((data: any): void => {
      console.log(`database connected to ${data.connection.host}`);
    });
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};
