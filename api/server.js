const express=require("express");
const app=express();
require("dotenv").config();
const port=process.env.BACKEND_PORT || 8080;
const mongoose=require("mongoose");
const User=require("./schemas/userSchema");

const AuthRoute=require("./routes/auth");
const MemberRoute=require("./routes/members");
const PostRoute=require("./routes/post");
const SessionRoute=require("./routes/auth");


mongoose.connect(process.env.DATABASE_URL,
{useNewUrlParser:true,useUnifiedTopology:true,
},()=>{console.log("database connected")});


app.use(express.json());
app.use("/auth",AuthRoute);
app.use("/m",MemberRoute);
app.use("/validate",SessionRoute);
app.use("/post",PostRoute);

app.listen(port,()=>console.log(`listening to : ${port}`))

//TODO:separate specific routes to its folders

