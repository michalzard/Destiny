const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: [true, "Cannot leave title blank"],
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required:[true,"Cannot leave author blank"],
  },
  content:{
      type:String,
      default:"",
  },
  comments:[
      {
          type:Schema.Types.ObjectId,
          ref:"Comment",
      },
  ],
  votes: {
    likedBy:[
    {
      type:Schema.Types.ObjectId,
      ref:"User",
    }],
    dislikedBy:[
      {
        type:Schema.Types.ObjectId,
        ref:"User",
    }],
    like: {
      type: Number,
      default: 0,
    },
    dislike: {
      type: Number,
      default: 0,
    },
  }, 
},{timestamps:true});

// check if id liked the post if they did alredy then remove like if not add 1 and add them to list

postSchema.methods.handleLike=function(userObjectId){
  if(mongoose.Types.ObjectId.isValid(userObjectId) && !this.votes.likedBy.includes(userObjectId)){
    this.votes.likedBy.push(userObjectId);
    this.votes.like++;
  }else{
    this.removeLike(userObjectId);
  }
  this.save();
}
postSchema.methods.removeLike=function(userObjectId){
  if(mongoose.Types.ObjectId.isValid(userObjectId)){
    const removeIndex=this.votes.likedBy.indexOf(userObjectId)
    this.votes.likedBy.splice(removeIndex,1);
    this.votes.like--;
  }
}
postSchema.methods.handleDislike=function(userObjectId){
  if(mongoose.Types.ObjectId.isValid(userObjectId) && !this.votes.dislikedBy.includes(userObjectId)){
    this.votes.dislikedBy.push(userObjectId);
    this.votes.dislike++;
  }else{
    this.removeDislike(userObjectId);
  }
  this.save();
}
postSchema.methods.removeDislike=function(userObjectId){
  if(mongoose.Types.ObjectId.isValid(userObjectId)){
    const removeIndex=this.votes.dislikedBy.indexOf(userObjectId)
    this.votes.dislikedBy.splice(removeIndex,1);
    this.votes.dislike--;
  }
}
//TODO: handle if somebody dislikes and they were previously liked,remove like,addon dislike and vice verse

module.exports=mongoose.model("Post",postSchema);
