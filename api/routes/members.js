const express = require("express");
const router=express.Router();
const mongoose=require("mongoose");
const User=require("../schemas/userSchema");
const Post=require("../schemas/postSchema");

router.get("/:id",async(req,res)=>{
    const {id} = req.params;
    if(mongoose.Types.ObjectId.isValid(id)){
    const user=await User.findById(id,{password:0});
    if(user){
    const postsByUser=await Post.find({author:user._id}).populate("author",{password:0});
    const postsLikedByUser=await Post.find({"votes.likedBy":id}).populate("author",{password:0});
    res.send({message:"Member found",member:user,posts:postsByUser,likes:postsLikedByUser});
    }else res.send({message:"Member not found"});
    }else{
        res.send({message:"Member not found"});
    }   
});

router.get("/:id/followers",async(req,res)=>{
    const {id} = req.params;
    if(mongoose.Types.ObjectId.isValid(id)){
    const user=await User.findById(id,{password:0});
    const postsByWhoUserFollows=await Post.find({author:user.followers.following}).populate("author",{password:0});
    //returns found user with password excluded 
    if(postsByWhoUserFollows)res.send({message:"Follower posts found",followerPosts:postsByWhoUserFollows});
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

router.post("/:id/follow",async(req,res)=>{
    const {id} = req.params;
    const {followedBy} =req.body;
    if(mongoose.Types.ObjectId.isValid(id)){
     //user that made follow request
    const followingUser=await User.findById(followedBy);
    //user that receives follow 
    const followedUser=await User.findById(id);
    followedUser.addFollowedBy(followedBy);
    followingUser.addFollowing(id);
    res.send({message:"User followed",_id:id});
    }
});

router.post("/:id/unfollow",async(req,res)=>{
    const {id} = req.params;
    const {unfollowedBy} =req.body;
    if(mongoose.Types.ObjectId.isValid(id)){
     //user that made follow request
    const followingUser=await User.findById(unfollowedBy);
    //user that receives unfollow 
    const followedUser=await User.findById(id);
    followedUser.removeFollowed(unfollowedBy);
    followingUser.removeFollowing(id);
    res.send({message:"User followed",_id:id});
    }
});
module.exports=router;

//TODO protect description edit
//TODO: shows members sorted by some factor