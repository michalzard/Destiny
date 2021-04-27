const express = require("express");
const router=express.Router();
const mongoose=require("mongoose");
const User=require("../schemas/userSchema");

// GET :id  

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
    const {tokenId,description}=req.body;
    if(id===tokenId && description){
    await User.findByIdAndUpdate(id,{description:description});
    res.send("User description updated"); 
    }else res.send("Cannot update user description");
    
});

module.exports=router;

//TODO protect description edit
//TODO: shows members sorted by some factor