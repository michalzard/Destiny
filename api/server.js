const express = require("express");
const app = express();
require("dotenv").config();
const port = 3001;
const mongoose = require("mongoose");
const cors=require("cors");
const AuthRoute = require("./routes/auth");
const MemberRoute = require("./routes/members");
const PostRoute = require("./routes/post");


mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}, () => {
  console.log("database connected")
});


app.use(cors());
app.use(express.json());
app.use("/auth", AuthRoute);
app.use("/m", MemberRoute);
app.use("/post", PostRoute);

app.listen(port, () => console.log(`listening to : ${port}`))

//TODO:separate specific routes to its folders
