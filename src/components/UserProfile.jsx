import "../styles/main/UserProfile.scss";
import defaultPfp from "../assets/images/defaultprofilepic.png";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button } from "@material-ui/core";
import DateRangeIcon from '@material-ui/icons/DateRange';
import {PostOverview,LikesNotFound} from "../components//Post";

function UserProfile({id}) {
    const [userInfo,setUserInfo]=useState({});
    const [userPosts,setUserPosts]=useState([]);
    const [userLikedPosts,setUserLikedPosts]=useState([]);
    const [selected,setSelected]=useState("Posts");
    const changeSelected=(select)=>{
        setSelected(select);
    }
    const [currentUserID,setCurrentUser]=useState('');
    const token=localStorage.getItem("token");

    const fetchCurrentUser=()=>{ 
    if(token){axios.get(`http://localhost:3001/auth/session?token=${token}`).then(data=>{
    const member=data.data.user;    
    if(member){
    setCurrentUser(member._id);
    }
    });
    }
    }
    const fetchUserData=()=>{
        axios.get(`http://localhost:3001/m/${id}`).then(data=>{
            const {member,posts,likes}=data.data;
            setUserLikedPosts(likes);
            setUserInfo(member);
            setUserPosts(posts);
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
    return (
        <div className="user_profile">
        <div className="header_info">
        <div className="header">
        <img src={userInfo.photoURL==="" ? defaultPfp : userInfo.photoURL} alt="User profile"></img>
        
        { //if looking at your own profile,remove option to follow
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
        <span>{userInfo.description}</span>
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
    )
}

export default UserProfile;
