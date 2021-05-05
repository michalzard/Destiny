import React, { useEffect, useState } from 'react'
import "../styles/Main.scss";
import "../styles/main/popover.scss";
import ImageIcon from '@material-ui/icons/Image';
import GifIcon from '@material-ui/icons/Gif';
import EmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MenuIcon from '@material-ui/icons/Menu';
import {Button,TextField,SwipeableDrawer ,Grid,Hidden,useMediaQuery,useTheme} from "@material-ui/core";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSidebar";
import {PostOverview,FullPost,PostNotFound,FavoritesNotFound} from "./Post";
import axios from 'axios';
import {useHistory} from "react-router-dom";
import UserProfile from "./UserProfile";

//ADD SETTINGS BUTTON ON BOTTOM LEFT SIDEBAR WHEN ON SMALL SCREENS TO ACESS ALL THE STUFF FROM PROFILE


function Main({token}) {
    const theme=useTheme();
    const isSmallScreen=useMediaQuery(theme.breakpoints.down("xs"));
    const isMediumScreen=useMediaQuery(theme.breakpoints.down("md"));

    const [swipeDrawer,setSwipeDrawer]=useState(false);
    return (
        <Grid className="main">
        
        <Grid item md={3} className="left">
        <Hidden xsDown>
        <LeftSideBar token={token} settings={isMediumScreen}/>
        </Hidden>
        <SwipeableDrawer  anchor="left" open={swipeDrawer} 
        onOpen={()=>{setSwipeDrawer(true)}} onClose={()=>{setSwipeDrawer(false)}}
        BackdropProps={{color:"black"}}>
        <LeftSideBar token={token} hidden={isSmallScreen} settings={isMediumScreen}/>
        </SwipeableDrawer>
        </Grid>

        <Grid item xs={12} md={9} className="middle"><Content token={token} handleDrawer={setSwipeDrawer} 
        createButtonSize={isSmallScreen} /></Grid>
        <Hidden mdDown>
        <Grid item md={3} className="right"><RightSideBar token={token}/></Grid>       
        </Hidden>
        </Grid>
    )
}

export default Main




function Content({token,createButtonSize,handleDrawer}){
    const [allOverviews,setOverviews]=useState([]);
    const [favOverviews,setFavOverviews]=useState([]);
    const [currentPostById,setCurrentPostById]=useState({});
    let commentID="";
    const history=useHistory();

    const [currentUserView,setUserView]=useState(""); 
    //holds current id from m/id so correct userProfile is displayed
    const fetchUserData=()=>{  
    if(token){axios.get(`http://localhost:3001/auth/session?token=${token}`).then(data=>{
    const member=data.data.user;    
    if(member){
    axios.get(`http://localhost:3001/m/${member._id}/followers`).then(data=>{ 
    const {followerPosts}=data.data;
    setFavOverviews(followerPosts);
    })}})}}

    const getAllPosts=()=>{
    axios.get("http://localhost:3001/post/latest").then(data=>{
    if(data){
    const postsArray=data.data.posts.reverse();
    //reversed array so new posts are shown on top (descending)
    for(let i=0;i<postsArray.length;i++){
        setOverviews(prev=>[...prev,postsArray[i]]); 
    }
    }
    });
    }
    const getCurrentPostComments=()=>{
    axios.get(`http://localhost:3001/post/${commentID}/comments`).then(data=>{
    const {post} = data.data;
    if(post) {
    setCurrentPostById(post);
    }
    })  
    }
    const setLinkID=()=>{
        const linkId=history.location.pathname.split("/")[2];
        commentID=linkId;
    }
    const checkProfile=()=>{
        const {pathname}=history.location;
        setUserView(pathname.split("/")[2]);
    }
    useEffect(()=>{
    fetchUserData();
    setLinkID();
    if(history.location.pathname===`/post/${commentID}/comments`){ getCurrentPostComments();
    return setCurrentPostById({});
    }
    if(history.location.pathname==="/") {getAllPosts();
    return setOverviews([]);
    }
    checkProfile();
    // eslint-disable-next-line
    },[history.location.pathname]);
    
    return(
        <div className="content">
            {history.location.pathname==="/submit" ?  <CreatePostContainer token={token}/> :
            <>
            <CreatePostRedirect createButtonSize={createButtonSize} handleDrawer={handleDrawer} />
            <div className="content_posts">
            {
                history.location.pathname==="/latest" ? 
                favOverviews.length>0 ?
                favOverviews.map((post,i)=>{
                return post ? <PostOverview key={i} _id={post._id} author={post.author} title={post.title} content={post.content}
                votes={post.votes} timestamp={post.createdAt} /> : null
                })
                : <FavoritesNotFound/>
                : null 
            }
            {
                history.location.pathname===`/m/${currentUserView}` ? <UserProfile id={currentUserView}/> : null //instead of null display F 
            }
            {
                Object.keys(currentPostById).length > 0 ?  <FullPost _id={currentPostById._id} author={currentPostById.author} title={currentPostById.title} content={currentPostById.content}
                votes={currentPostById.votes} timestamp={currentPostById.createdAt} comments={currentPostById.comments}/>
                : history.location.pathname===`/post/${commentID}/comments`? <PostNotFound/>
                : null
            }
            {
                allOverviews.map((post,i)=>{
                return post ?<PostOverview key={i} _id={post._id} author={post.author} title={post.title} content={post.content}
                votes={post.votes} timestamp={post.createdAt} /> : null
                })
            }
            </div>
            </>
            }           
        </div>
    )
}


function CreatePostRedirect({handleDrawer,createButtonSize}){
    return(
        <div className="content_postHeader">
        <Button variant="text" style={{color:"#5d7290"}} onClick={()=>{handleDrawer(true)}}><MenuIcon/></Button>
        <h4>Your Feed</h4>
        <Button href="/submit" variant="contained" color="secondary" size={createButtonSize ? "small" : "medium"} >Create Post</Button>
        </div>
    )
}


function CreatePostContainer({token}){
const [postTitle,setTitle]=useState("");
const [postText,setText]=useState("");
const [userId,setUserId]=useState("");
const createPost=()=>{
if(userId){
axios.post("http://localhost:3001/post/new",{authorId:userId,title:postTitle,content:postText});
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
useEffect(()=>{
if(token){axios.get(`http://localhost:3001/auth/session?token=${token}`).then(data=>{
const {_id}=data.data.user;
setUserId(_id);
})}
},[token]);
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

/**
 * TODO
 * panel v lavo nech sa da zasunut do boku and u gucci
 */