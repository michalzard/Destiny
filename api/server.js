const express=require("express");
const path = require("path");
const app=express();
require("dotenv").config();
const port=process.env.BACKEND_PORT || 8080;
const mongoose=require("mongoose");
const User=require("./schemas/userSchema");
const bcrypt=require("bcrypt");
const session=require("express-session");

mongoose.connect(process.env.DATABASE_URL,
{useNewUrlParser:true,useUnifiedTopology:true,
},()=>{console.log("mongoose connected")});


app.use(express.json());
app.use(session({secret:process.env.SESSION_SECRET,
cookie:{
httpOnly:false,
maxAge:1000 * 60 * 60 * 8 //8 hours
}}))


app.post("/register",async (req,res)=>{
    const {username,password} = req.body;
    const hashedPassword=await bcrypt.hash(password,12);
    const registeredUser=new User({username:username,password:hashedPassword});
    registeredUser.save();
    res.send({message:"Registered"})
})

app.post("/login",async (req,res)=>{
    const {username,password} = req.body;
    const user=await User.findOne({username:username});
    let valid=null;
    if(user)valid=await bcrypt.compare(password,user.password);
    if(valid){
    res.send({message:"Valid"});
    } 
    else res.send({message:"Incorrect username or password!"});
})

// app.post("/logout",async (req,res)=>{
//     //req.session.destroy();
//     req.session.user=await User.find();
//     res.send(`request user : ${req.session.user}`);
// })

app.listen(port,()=>console.log(`listening to : ${port}`))
