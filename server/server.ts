import { app } from "./app";
import { connectDB } from "./utils/db";
require("dotenv").config();

// creating server
const PORT = 8000;
app.listen(PORT, () => {
  console.log(`server is connected successfully ${PORT}`);
  connectDB();
});
