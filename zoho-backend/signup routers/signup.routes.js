import express from "express";
import { createUser, findUser, getDetails, updateUserDetails } from "../signup controllers/signup.controller.js";

let signupRouter = express.Router();

signupRouter.get("/", (req, res)=>{
    res.send("hello");
})
signupRouter.post("/signup", createUser);
signupRouter.post("/login", findUser);
signupRouter.post("/update-details", updateUserDetails);
signupRouter.get("/get-details/:userId", getDetails);


export default signupRouter;