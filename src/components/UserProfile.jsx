import "../styles/main/UserProfile.scss";
import defaultPfp from "../assets/images/defaultprofilepic.png";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button,TextField } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import BlockIcon from '@material-ui/icons/Block';

import DateRangeIcon from '@material-ui/icons/DateRange';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {PostOverview,LikesNotFound} from "../components//Post";

function UserProfile({id}) {
    const [userInfo,setUserInfo]=useState({});
    const [userPosts,setUserPosts]=useState([]);
    const [userLikedPosts,setUserLikedPosts]=useState([]);
    const [selected,setSelected]=useState("Posts");
    const [show,setShow]=useState("");
    //description
    const [editDesc,setEditDesc]=useState(false);
    const [description,setDesc]=useState("");
    //photo
    const [photoURL,setPhoto]=useState("");
    const [editPhoto,setEditPhoto]=useState(false);

    const changeSelected=(select)=>{
        setSelected(select);
    }
    const [currentUserID,setCurrentUser]=useState('');
    const token=localStorage.getItem("token");

    const fetchCurrentUser=()=>{ 
    if(token){axios.get(`http://localhost:3001/auth/session?token=${token}`).then(data=>{
    const member=data.data.user;    
    if(member && !currentUserID){
    setCurrentUser(member._id);
    }
    });
    }
    }
    const fetchUserData=()=>{
        axios.get(`http://localhost:3001/m/${id}`).then(data=>{
            const {member,posts,likes}=data.data;
            if(member && posts && likes){
            setUserLikedPosts(likes);
            setUserInfo(member);
            setPhoto(member.photoURL);
            setUserPosts(posts);
            setShow("profile")
            }else{
            setShow("not-found");
            }
        })
    }
    useEffect(() => {
        fetchCurrentUser();
        fetchUserData();
        // eslint-disable-next-line
    }, []);
    const followUser=()=>{
    if(currentUserID && userInfo){
    if(!userInfo.followers.followedBy.includes(currentUserID))
    axios.post(`http://localhost:3001/m/${userInfo._id}/follow`,{followedBy:currentUserID});
    else axios.post(`http://localhost:3001/m/${userInfo._id}/unfollow`,{unfollowedBy:currentUserID});
    }
    }

    const setEditDescription=()=>{
        if(editDesc){
        const textEditInput=document.getElementById("editTextField").value;
        setEditDesc(false);
        if(currentUserID && textEditInput){
        axios.patch(`http://localhost:3001/m/${currentUserID}/descEdit`,{description:description});
        }
    }else setEditDesc(true);
    }
    const updateEditDescription=(e)=>{
        setDesc(e.target.value);
    }
    const setEditPhotoURL=()=>{
        if(editPhoto){
            const photoEditInput=document.getElementById("editPhotoField").value;
            setEditPhoto(false);
            if(currentUserID && photoEditInput){
            axios.patch(`http://localhost:3001/m/${currentUserID}/photoURL`,{url:photoURL});
        }
        }else setEditPhoto(true);
    }
    const updateEditPhotoURL=(e)=>{
        const checkForLink=(e.target.value.startsWith("http://") || e.target.value.startsWith("https://")) 
        if(checkForLink) setPhoto(e.target.value);
    }
    const setDefaultPhoto=()=>{
        axios.patch(`http://localhost:3001/m/${currentUserID}/photoURL`,{url:""});
        setPhoto("");
        setEditPhoto(false);
    }
    return (
        <div className="user_profile">
        
        {show==="profile" ?
        editPhoto ?
        <div className="card_photoEdit">
        <TextField id="editPhotoField" fullWidth placeholder="Change your photo" onChange={(e)=>{updateEditPhotoURL(e)}}
        inputProps={{style:{color:"white"}}}/> 
        <div className="photoEdit_controls">
        <Button color="secondary" variant="contained" onClick={()=>{setEditPhotoURL();}}>Submit</Button>
        <BlockIcon className="setDefaultPhoto" onClick={()=>{setDefaultPhoto();}}/>
        </div>
        </div>
         : 
        <div className="header_info">
        <div className="header">
        <img src={photoURL? photoURL : defaultPfp } className="card_photo" alt="" onClick={()=>{setEditPhotoURL();}}/>
      
        { 
        //if looking at your own profile,remove option to follow
        userInfo._id!==currentUserID ? 
        <Button variant="outlined" color="secondary" href={`http://localhost:3000/m/${userInfo._id}`}
        onClick={followUser}>{
        userInfo.followers ?
        userInfo.followers.followedBy.includes(currentUserID) ? "Unfollow" : "Follow"
        : null}</Button>
        : null}
        </div>
        <span className="name"><h5>{userInfo.username}</h5></span>
        <span className="tag">@{id}</span>
        <span className="description">
        {editDesc ? <TextField className="editTextField" id="editTextField" placeholder={userInfo.description} onChange={(e)=>{updateEditDescription(e);}}
        inputProps={{style:{color:"white"}}}/>
        : userInfo.description}
        <span className="edit">
        <EditIcon onClick={()=>{setEditDescription();}}/>
        </span> 
        <span className="date">{userInfo.createdAt ? <><DateRangeIcon/>{<span className="timestamp">Joined {userInfo.createdAt.substring(0,19).replace("T","-")}</span>}</>: "cannot load userInfo createdAt"}</span>
        </span>
        <span className="followers">
        {userInfo.followers ?<>
        {userInfo.followers.followingCount}<span> following</span> 
        {userInfo.followers.followedCount}<span> followers</span>
        </>
        : <span>cannot load userInfo followers in time</span>
        }
        </span>
        
        <div className="sort_by">
        <div  style={{borderBottom:selected==="Posts" ? "1px solid red" : null}}>
        <Button variant="text" className="btnSelect" onClick={()=>{changeSelected("Posts")}}>Posts</Button>
        </div>
        <div  style={{borderBottom:selected==="Likes" ? "1px solid red" : null}}>
        <Button variant="text" className="btnSelect" onClick={()=>{changeSelected("Likes")}}>Likes</Button>
        </div>      
        </div>
        {
            selected==="Posts" ?
            userPosts.map((post,i)=>{
            return post ?<PostOverview key={i} _id={post._id} author={post.author} title={post.title} content={post.content}
            votes={post.votes} timestamp={post.createdAt} /> : "NO POSTS AVAIL"
            })
            :  selected==="Likes" ?  
            userLikedPosts.length>0 ?
            userLikedPosts.map((post,i)=>{
            return post ? <PostOverview key={i} _id={post._id} author={post.author} title={post.title} content={post.content}
            votes={post.votes} timestamp={post.createdAt} /> : "NO POSTS AVAIL"
            })
            :<LikesNotFound/>

            : "WIP"
            
           
        }
        </div>
        
        : <ProfileNotFound/>
        }
        
        </div>
    )
}

function ProfileNotFound(){
return(
    <div className="comment_notfound">
    <span><AccountCircleIcon style={{marginRight:"10px"}}/>Profile not found</span>
    </div>   
)
}

export default UserProfile;


//TODO: UserData not found(when m/incorrectId) is entered