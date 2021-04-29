const express = require("express");
const router=express.Router();
const mongoose=require("mongoose");
const Post=require("../schemas/postSchema");
//const User=require("../schemas/userSchema");


// POST new  
// POST :id/like 
// POST :id/dislike 
// GET :id fetch 
// GET :id/comments

router.post("/new",(req,res)=>{
const {authorId,title,content} =req.body;
if(req.body){
const authorObjectID=mongoose.Types.ObjectId(authorId);
const createdPost=new Post({title,author:authorObjectID,content});
createdPost.save();
res.send(`Post created by ${authorObjectID}`);
}else res.send("Post cannot be created");
});

router.post("/:id/like",async(req,res)=>{
    const {id}=req.params;
    const {likedBy}=req.body;
    const likedByID=mongoose.Types.ObjectId(likedBy);
    const foundPost=await Post.findById(id);
    //if user already liked,remove like method is called instead
    foundPost.handleLike(likedByID);
    
})
router.post("/:id/dislike",async(req,res)=>{
    const {id}=req.params;
    const {dislikedBy}=req.body;
    const dislikedByID=mongoose.Types.ObjectId(dislikedBy);
    const foundPost=await Post.findById(id);
    //if user already liked,remove like method is called instead
    foundPost.handleDislike(dislikedByID);
    
})

//display all posts
router.get("/latest",async (req,res)=>{
const allPosts=await Post.find().populate("author",{password:0});
if(allPosts){
res.send({posts:allPosts})
}else res.send("unable to fetch posts");
})

//TODO:display only posts from people that user that requested is following
//TODO:way to fetch comment data to display under the post

module.exports=router;