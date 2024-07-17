import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function dbConnection(){
    let dataBase = await mongoose.connect(process.env.con_str);
    console.log("database connected");
    return dataBase;
}

export let dataBase = await dbConnection();