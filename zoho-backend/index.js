import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { dataBase } from "./dbConnection/db.js";
import signupRouter from "./signup routers/signup.routes.js";
dotenv.config();

let app = express();
app.use(cors())
app.use(express.json());

app.use("/", signupRouter)

let port = process.env.port;

app.listen(port, ()=>{
    console.log("server connected");
})