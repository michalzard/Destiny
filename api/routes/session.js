const express = require("express");
const router=express.Router();


router.get("/session",(req,res)=>{
    const token=req.session;
    if(token){
        res.send(token.user);
    }else{
        res.send("user not found in session");
    }
});

module.exports=router;