const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const userSchema=new Schema({
    username:{
        type:String,
        required:[true,"username cannot be blank"],
    },
    password:{
        type:String,
        required:[true,"password cannot be blank"],
    },
    followers:{
        followedCount:{
            type:Number,
            default:0,
        },
        followedBy:[
        {
            type:Schema.Types.ObjectId,
            ref:"User", 
        }
        ],
        followingCount:{
            type:Number,
            default:0,
        },
        following:[
            {
            type:Schema.Types.ObjectId,
            ref:"User",
            }   
        ]
    }
})

//TODO: check if userId is already there

userSchema.methods.addFollowedBy=function(userObjectId){
    if(mongoose.Types.ObjectId.isValid(userObjectId)){
    this.followers.followedBy.push(userObjectId);
    this.followers.followedCount++;
    this.save();
    }
}
userSchema.methods.addFollowing=function(userObjectId){
    if(mongoose.Types.ObjectId.isValid(userObjectId)
    && !this.followers.following.equals(userObjectId)){
    this.followers.following.push(userObjectId);
    this.save();
    }
}

module.exports=mongoose.model("User",userSchema);