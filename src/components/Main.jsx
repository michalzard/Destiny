import React, { useEffect, useState } from 'react'
import "../styles/Main.scss";
import "../styles/main/popover.scss";
import ImageIcon from '@material-ui/icons/Image';
import GifIcon from '@material-ui/icons/Gif';
import EmoticonIcon from '@material-ui/icons/InsertEmoticon';
import {Button,TextField} from "@material-ui/core";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSidebar";
import Post from "./Post";
import axios from 'axios';
import {useLocation} from "react-router-dom";

function Main({userId}) {
    return (
        <div className="main">
        <div className="left"><LeftSideBar userId={userId}/></div>
        <div className="middle"><Content/></div>
        <div className="right"><RightSideBar userId={userId}/></div>       
        </div>
    )
}

export default Main




function Content(){
    const [allPosts,setPosts]=useState([]);
    const location=useLocation();
    //cost 
    const getAllPosts=()=>{
    axios.get("http://localhost:3000/post/latest").then(data=>{
    if(data){
    const postsArray=data.data.posts;
    for(let i=0;i<postsArray.length;i++){
        setPosts(prev=>[...prev,postsArray[i]]);  
    }
    }
    });

    }
    useEffect(()=>{
    if(location.pathname==="/latest") {getAllPosts();
    return setPosts([]);
    }
    },[location.pathname]);
    return(
        <div className="content">
            {location.pathname==="/submit" ?  <CreatePostContainer/> :
            <>
           <CreatePostRedirect/>
           <div className="content_posts">
            {
                allPosts.map((post,i)=>{
                console.log(post);
                return <Post key={i} _id={post._id} author={post.author} title={post.title} content={post.content} 
                votes={post.votes} timestamp={post.createdAt} />
                })
            }
            </div>
            </>
            }
        </div>
    )
}


function CreatePostRedirect(){
    return(
        <div className="content_postHeader">
        <h4>Your Feed</h4>
        <Button href="/submit" variant="contained" color="secondary">Create Post</Button>
        </div>
    )
}


function CreatePostContainer(){
const [postTitle,setTitle]=useState("");
const [postText,setText]=useState("");
const createPost=()=>{
const userId=localStorage.getItem("user_data");
if(userId){
axios.post("http://localhost:3000/post/new",{authorId:userId,title:postTitle,content:postText});
setTitle("");
setText("");
}
}
const updateTitle=(e)=>{
    setTitle(e.target.value);
}
const updateText=(e)=>{
    setText(e.target.value);
}
return(
    <div className="createPostContainer">
    <h5>Create a post</h5>
    <div className="postInputs">
    <TextField variant="filled" fullWidth className="titleInput"
    inputProps={{style:{color:"white"}}} onChange={(e)=>{updateTitle(e);}}
    InputLabelProps={{style:{color:"gray"}}} placeholder="Title"></TextField>
    <TextField variant="filled" fullWidth className="textInput"
    inputProps={{style:{color:"white"}}} onChange={(e)=>{updateText(e);}}
    InputLabelProps={{style:{color:"gray"}}} placeholder="Text(optional)"></TextField>
    </div>
    <div className="postControls">
    <div className="postIcons">
    <input accept="image/*" id="icon-button-file" type="file" style={{display:"none"}}/>
    <label htmlFor="icon-button-file">
    <ImageIcon className="postIcon"/>
    </label>
    <input accept="image/gif" id="icon-button-file" type="file" style={{display:"none"}}/>
    <label htmlFor="icon-button-file">
    <GifIcon className="postIcon"/>
    </label>
    <EmoticonIcon className="postIcon"/>
    </div>
    <div className="postButton">
    <Button  disabled={(postTitle.length>0) ? false : true} href="/"
    variant="contained" color="secondary" onClick={()=>{createPost();}}>Post</Button>
    </div>
    </div>
    </div>
)
}