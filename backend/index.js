import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js"

dotenv.config();

const port = process.env.PORT || 5000;

connectDB();

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users" , userRoutes);



app.listen(port, function () {
  console.log(`Server running on Port : ${port}!`);
 });