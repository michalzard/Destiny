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

//todo methods upvote,downvote,addComment,removeComment

module.exports=mongoose.model("Post",postSchema);
