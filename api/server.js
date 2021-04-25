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
},()=>{console.log("database connected")});


app.use(express.json());
app.use(session({
secret:process.env.SESSION_SECRET,
cookie:{
httpOnly:true,
maxAge:1000 * 60 * 60 * 8 //8 hours
}}))


app.post("/register",async (req,res)=>{
    const {username,password} = req.body;
    if(username && password){
    const hashedPassword=await bcrypt.hash(password,12);
    const registeredUser=new User({username,password:hashedPassword});
    await registeredUser.save();
    req.session.user={displayName:registeredUser.username,id:registeredUser._id};
    res.send({message:"Registered",user:req.session.user.id});
    console.log({message:"Registered",user:req.session.user});
    }else res.send("username or password cannot be blank");
})

app.post("/login",async (req,res)=>{
    const {username,password} = req.body;
    const user=await User.findOne({username});
    let validPassword=null;
    if(user)validPassword=await bcrypt.compare(password,user.password);

    if(validPassword){
    req.session.user={displayName:user.username,id:user._id};
    res.send({message:"Valid Login",user:req.session.user.id});
    
    console.log({message:"Logged In",user:req.session.user});
    } 
    else res.send({message:"Incorrect username or password!"});
})
app.post("/logout",async (req,res)=>{
    if(req.session){
    console.log("session destroyed for "+req.session.user)
    req.session.destroy();
    }
})

// app.post("/logout",async (req,res)=>{
//     //req.session.destroy();
//     req.session.user=await User.find();
//     res.send(`request user : ${req.session.user}`);
// })

app.get("/member/:id",async(req,res)=>{
    const {id} = req.params;
    if(mongoose.Types.ObjectId.isValid(id)){
    const user=await User.findById(id,{password:0});
    //returns found user with password excluded 
    res.send({message:"Member found",member:user});
    }else{
        res.send({message:"Member not found"});
    }   
})


app.get("/validateSession",(req,res)=>{
const token=req.session;
if(token){
    res.send(token.user);
}else{
    res.send("user not found in session");
}
})

//TODO:separate specific routes to its folders

app.get("/followTest",async (req,res)=>{
    const michalzard=await User.findOne({username:"MichalZard"});
    const followerTest=await User.findOne({username:"testingFollower"});
    michalzard.addFollowedBy(followerTest._id);
    res.send({message:"added Followed By",id:followerTest._id});

})
app.listen(port,()=>console.log(`listening to : ${port}`))
