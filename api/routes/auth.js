const express = require("express");
const router=express.Router();
const bcrypt=require("bcrypt");
const session=require("express-session");
const User=require("../schemas/userSchema");

// POST register
// POST login
// POST logout


router.use(session({
secret:process.env.SESSION_SECRET,
resave:true,
saveUninitialized:true,
cookie:{
httpOnly:true,
maxAge:1000 * 60 * 60 * 8, //8 hours
}}));
    
router.post("/register",async (req,res)=>{
const {username,password} = req.body;
if(username && password){
const hashedPassword=await bcrypt.hash(password,12);
const registeredUser=new User({username,password:hashedPassword});
await registeredUser.save();
req.session.user={displayName:registeredUser.username,id:registeredUser._id};
res.send({message:"Registered",user:req.session.user.id});
}else res.send("username or password cannot be blank");
});

router.post("/login",async (req,res)=>{
const {username,password} = req.body;
const user=await User.findOne({username});
let validPassword=null;
if(user)validPassword=await bcrypt.compare(password,user.password);    
if(validPassword){
req.session.user={displayName:user.username,id:user._id};
res.send({message:"Valid Login",user:req.session.user.id});
} 
else res.send({message:"Incorrect username or password!"});
});

router.post("/logout",async (req,res)=>{
if(req.session){
console.log("session destroyed for "+req.session.user)
req.session.destroy();
}
});


module.exports=router;