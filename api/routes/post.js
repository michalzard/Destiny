const express = require("express");
const router=express.Router();
const mongoose=require("mongoose");
const Post=require("../schemas/postSchema");
const User=require("../schemas/userSchema");


// POST new  
// GET :id fetch 
// GET :id/comments

router.post("/new",(req,res)=>{
const {author,title,content} =req.body;
if(req.body){
const authorObjectID=mongoose.Types.ObjectId("6085fe97a8dd3435fcbb7a24");
const createdPost=new Post({title,author:authorObjectID,content});
createdPost.save();
res.send(`Post created by ${author}`);
}else res.send("Post cannot be created");
});


//display all posts
router.get("/all",async (req,res)=>{
const allPosts=await Post.find().populate("author");
if(allPosts){
res.send({posts:allPosts})
}else res.send("unable to fetch posts");
})

//TODO:display only posts from people that user that requested is following
//TODO:way to fetch comment data to display under the post

module.exports=router;