const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "username cannot be blank"],
  },
  password: {
    type: String,
    required: [true, "password cannot be blank"],
  },
  followers: {
    followedCount: {
      type: Number,
      default: 0,
    },
    followedBy: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }],
    followingCount: {
      type: Number,
      default: 0,
    },
    following: [{
      type: Schema.Types.ObjectId,
      ref: "User",
    }]
  },
  photoURL: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "Default Description",
  }
},{timestamps:true});

//TODO: check if userId is already there

userSchema.methods.addFollowedBy = function (userObjectId) {
  if (mongoose.Types.ObjectId.isValid(userObjectId) && !this.followers.followedBy.includes(userObjectId)) {
    this.followers.followedBy.push(userObjectId);
    this.followers.followedCount++;
  }
  this.save();
}
userSchema.methods.removeFollowed = function(userObjectId){
  if(mongoose.Types.ObjectId.isValid(userObjectId)){
    const removeIndex=this.followers.followedBy.indexOf(userObjectId);
    console.log(removeIndex);
    this.followers.followedBy.splice(removeIndex,1);
    this.followers.followedCount--;
  }
  this.save();
}
userSchema.methods.addFollowing = function (userObjectId) {
  if (mongoose.Types.ObjectId.isValid(userObjectId) && !this.followers.following.includes(userObjectId)) {
    this.followers.following.push(userObjectId);
    this.followers.followingCount++;
  }
  this.save();
}
userSchema.methods.removeFollowing= function(userObjectId){
  if(mongoose.Types.ObjectId.isValid(userObjectId)){
    const removeIndex=this.followers.following.indexOf(userObjectId);
    console.log(removeIndex);
    this.followers.following.splice(removeIndex,1);
    this.followers.followingCount--;
  }
  this.save();
}

module.exports = mongoose.model("User", userSchema);
