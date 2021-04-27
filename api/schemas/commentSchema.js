const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
author:{
    type:Schema.Types.ObjectId,
    ref:"User",
    required:[true,"Cannot create post without its author"],
},
content:{
    type:String,
    required:[true,"Cannot create comment without its content"],
}
},{timestamps:true});

/**
 * author
 * timestamp
 * content
 * 
 */

module.exports=mongoose.model("Post",commentSchema);