import React from 'react'
import {useLocation} from "react-router-dom";

import "../styles/Main.scss";
import "../styles/main/popover.scss";

import ImageIcon from '@material-ui/icons/Image';
import GifIcon from '@material-ui/icons/Gif';
import EmoticonIcon from '@material-ui/icons/InsertEmoticon';


import {Button,TextField} from "@material-ui/core";




import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSidebar";
import Post from "./Post";


function Main() {
    return (
        <div className="main">
        <div className="left"><LeftSideBar/></div>
        <div className="middle"><Content/></div>
        <div className="right"><RightSideBar/></div>       
        </div>
    )
}

export default Main




function Content(){
    let location=useLocation();
    
    return(
        <div className="content">
            <div>
            {location.pathname==="/submit" ?  <CreatePostContainer/> :
            <>
           <CreatePostRedirect/>
           <div className="content_posts">
            <Post/><Post/><Post/><Post/>
            <Post/><Post/><Post/><Post/>
            <Post/><Post/><Post/><Post/>
            <Post/><Post/><Post/><Post/>
            </div>
            </>
            }
            </div>
        </div>
    )
}


function CreatePostRedirect(){
    return(
        <div className="content_postHeader">
        <h4>Your Feed</h4>
        <a href="/submit" style={{textDecoration:"none"}}><Button variant="contained" color="secondary">Create Post</Button></a>
        </div>
    )
}


function CreatePostContainer(){
const createPost=()=>{
console.log("post created");
}
return(
    
    <div className="createPostContainer">
    <h5>Create a post</h5>
    <div className="postInputs">
    <TextField variant="filled" fullWidth className="titleInput"
    inputProps={{style:{color:"white"}}} 
    InputLabelProps={{style:{color:"gray"}}} placeholder="Title"></TextField>
    <TextField variant="filled" fullWidth className="textInput"
    inputProps={{style:{color:"white"}}} 
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
    <div className="postButton"><Button  variant="contained" color="secondary" onClick={()=>{createPost()}}>Post</Button></div>
    </div>
    </div>
)
}

