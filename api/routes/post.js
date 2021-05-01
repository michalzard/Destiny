const express = require("express");
const router=express.Router();
const mongoose=require("mongoose");
const Post=require("../schemas/postSchema");
const Comment=require("../schemas/commentSchema");
//const User=require("../schemas/userSchema");


// POST new  
// POST :id/like 
// POST :id/dislike 
// GET :id fetch 
// GET :id/comments
router.get("/:id/comments",async (req,res)=>{
    const {id}=req.params;
    if(mongoose.Types.ObjectId.isValid(id)){
    const foundPost=await Post.findById(id).populate("author",{password:0,description:0,followers:0})
    .populate({path:"comments",populate:{path:"author"}})
    if(foundPost){
    res.send({message:"Post found",post:foundPost});
    }}else res.send({message:"Post was not found"});
})

router.post("/new",(req,res)=>{
const {authorId,title,content} =req.body;
if(mongoose.Types.ObjectId.isValid(authorId)){
const authorObjectID=mongoose.Types.ObjectId(authorId);
const createdPost=new Post({title,author:authorObjectID,content});
createdPost.save();
res.send(`Post created by ${authorObjectID}`);
}else res.send("Post cannot be created");
});

router.post("/:id/newComment",async(req,res)=>{
    const {author,content}=req.body;
    const {id}=req.params;
    if(mongoose.Types.ObjectId.isValid(author)){
    const authorID=mongoose.Types.ObjectId(author);
    const postID=mongoose.Types.ObjectId(id);
    const associatedPost=await Post.findOne({_id:postID});
    const commentToSave=new Comment({author:authorID,content:content,post:postID});
    associatedPost.comments.push(commentToSave._id);
    commentToSave.save();
    associatedPost.save();
    res.send({message:"Comment successfully posted"});
    }else res.send({message:"Comment cannot be posted"});
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