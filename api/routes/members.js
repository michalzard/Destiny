const express = require("express");
const router=express.Router();
const mongoose=require("mongoose");
const User=require("../schemas/userSchema");


router.get("/:id",async(req,res)=>{
    const {id} = req.params;
    if(mongoose.Types.ObjectId.isValid(id)){
    const user=await User.findById(id,{password:0});
    //returns found user with password excluded 
    res.send({message:"Member found",member:user});
    }else{
        res.send({message:"Member not found"});
    }   
});


router.patch("/:id/descEdit",async(req,res)=>{
    const {id}=req.params;
    const {description}=req.body;
    if(description){
    await User.findByIdAndUpdate(id,{description:description});
    res.send({message:"Description sucessfully updated",desc:description}); 
    }else res.send({message:"Description cannot be updated"});
    
});

router.patch("/:id/photoURL",async(req,res)=>{
    const {id}=req.params;
    const {url}=req.body;
    if(url!==undefined){
    await User.findByIdAndUpdate(id,{photoURL:url});
    res.send({message:"photoURL sucessfully updated",url:url}); 
    }else res.send({message:"photoURL cannot be updated"});
    
});

module.exports=router;

//TODO protect description edit
//TODO: shows members sorted by some factor