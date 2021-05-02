const express = require("express");
const router=express.Router();
const bcrypt=require("bcrypt");
const session=require("express-session");
const mongoose=require("mongoose");
const User=require("../schemas/userSchema");
require("dotenv").config();
const MongoDBStore=require("connect-mongodb-session")(session);
// POST register
// POST login
// POST logout

const store=new MongoDBStore({
    uri:process.env.DATABASE_URL,
    collection:"sessions",
    expires:1000 * 60 * 60 * 8, //8 hours
})


router.use(session({
secret:process.env.SESSION_SECRET,
resave:true,
saveUninitialized: false, // dont save cookie when there's no data attached
cookie:{
httpOnly:true,
maxAge:1000 * 60 * 60 * 8, //8 hours
},
store:store,
}));
    
router.post("/register",async (req,res)=>{
const {username,password} = req.body;
if(username && password){
const uniqueNameCheck=await User.findOne({username});
if(uniqueNameCheck===null){
const hashedPassword=await bcrypt.hash(password,12);
const registeredUser=new User({username,password:hashedPassword});
await registeredUser.save();
req.session.user=registeredUser;
res.send({message:"Registered",id:req.sessionID});
}else res.send({message:"This name is already in use"});
}else res.send("username or password cannot be blank");
});

router.post("/login",async (req,res)=>{
const {username,password} = req.body;
const user=await User.findOne({username});
let validPassword=null;
if(user){validPassword=await bcrypt.compare(password,user.password);}  
if(validPassword){
req.session.user=user;
res.send({message:"Valid Login",id:req.sessionID});
} 
else res.send({message:"Incorrect username or password!"});
});

router.post("/logout",(req,res)=>{
    req.session.destroy();
});

//TODO: implement db based session for users so theft of accounts will be avoided

router.get("/session",async (req,res)=>{
    const {token} = req.query;
    const foundSession=await mongoose.connection.db.collection("sessions").findOne({_id:token});
    if(foundSession){
    const {description,followers,photoURL,username,_id}=foundSession.session.user;
    res.send({message:"Found user session",user:{
        description,followers,photoURL,username,_id
    }});
    }else res.send({message:"Cannot find user session"});
});

// const requireLogin=(req,res,next)=>{
//     if(!req.session.user){
//         //redirect login
//     }
//     next();
// }
   

module.exports=router;