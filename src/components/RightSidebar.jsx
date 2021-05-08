import {OverlayTrigger,Popover} from 'react-bootstrap';
import "../styles/main/RightSidebar.scss";
import {ReactComponent as DiscordIcon} from "../assets/images/discord.svg";
import {Button, TextField} from "@material-ui/core";
import defaultPfp from "../assets/images/defaultprofilepic.png"
import PersonIcon from '@material-ui/icons/Person';
import BugReportIcon from '@material-ui/icons/BugReport';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import BlockIcon from '@material-ui/icons/Block';
import {useHistory} from "react-router-dom";

import axios from 'axios';
import { useEffect, useState } from 'react';
function RightSideBar({token}){
    return(
        <div className="rightSidebar">
        <ProfileMenu token={token} />
        <ProfileCard token={token} />
        </div>
    )
}

export default RightSideBar;

export function ProfileMenu({token}){
    const [currentUserID,setCurrentUser]=useState('');
    const fetchCurrentUser=()=>{ 
    if(token){axios.get(`http://localhost:3001/auth/session?token=${token}`).then(data=>{
    const member=data.data.user;    
    if(member && !currentUserID) setCurrentUser(member._id);
    });
    }
    }

    const logout=()=>{
    axios.post("http://localhost:3001/auth/logout");
    if(localStorage.getItem("token")) localStorage.removeItem("token");
    }
    useEffect(()=>{
    fetchCurrentUser();
    //eslint-disable-next-line
    },[])
    return(
    <div className="profileMenu">
    <OverlayTrigger trigger="click" placement="left" 
    overlay={
    <Popover>
   <Popover.Content>
   <p><a href={`http://localhost:3000/m/${currentUserID}`} className="anchor">
   <PersonIcon /> Profile </a></p>

   <p><a href="https://github.com/michalzard/Destiny/issues" target="_blank" rel="noreferrer" className="anchor">
    <BugReportIcon></BugReportIcon> Report a bug</a></p>
    <p>
    <DiscordIcon width={22} height={22} style={{fill:"#b2bdcd"}}/> <a className="anchor" href="https://discord.gg/HzXaRJcbyp">Discord</a>
    </p>

    <a href="/" onClick={()=>{logout();}} className="anchor">
    <ExitToAppIcon/> Logout</a>
   </Popover.Content>
   </Popover>}>
    <PersonIcon />
   </OverlayTrigger>
   </div>
    )
}

function ProfileCard({token}){
    const history=useHistory();
    const [displayName,setName]=useState("");
    const [description,setDesc]=useState("");
    const [photoURL,setPhoto]=useState("");
    const [followerCount,setFollowerCount]=useState(0);
    const [followingCount,setFollowingCount]=useState(0);
    //editing of description,photoURL
    const [editDesc,setEditDesc]=useState(false);
    const [editPhoto,setEditPhoto]=useState(false);
    const [currentUserID,setCurrentUser]=useState("");
    const setEditPhotoURL=()=>{
        if(editPhoto){
            const photoEditInput=document.getElementById("editPhotoField").value;
            setEditPhoto(false);
            if(currentUserID && photoEditInput){
            axios.patch(`http://localhost:3001/m/${currentUserID}/photoURL`,{url:photoURL});
        }
        }else setEditPhoto(true);
    }
    const setDefaultPhoto=()=>{
        axios.patch(`http://localhost:3001/m/${currentUserID}/photoURL`,{url:""});
        setPhoto("");
        setEditPhoto(false);
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
    const updateEditPhotoURL=(e)=>{
        const checkForLink=(e.target.value.startsWith("http://") || e.target.value.startsWith("https://")) 
        if(checkForLink) setPhoto(e.target.value);
    }
    const fetchUserData=()=>{  
    if(token){axios.get(`http://localhost:3001/auth/session?token=${token}`).then(data=>{
    const member=data.data.user;    
    if(member){
    axios.get(`http://localhost:3001/m/${member._id}`).then(data=>{ 
    const {member}=data.data;
    setDesc(member.description);
    setPhoto(member.photoURL);
    setFollowerCount(member.followers.followedCount);
    setFollowingCount(member.followers.followingCount);
    setName(member.username);
    setCurrentUser(member._id);
    })
    
    }else{
        if(!token)localStorage.removeItem("token");
        history.push("/login");
    }
    });
    }
    }
    useEffect(()=>{
        fetchUserData();
        // eslint-disable-next-line
    },[]);
    return(
    <div className="profileCard">
    {
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
    <div className="card_header">
    <img src={photoURL? photoURL : defaultPfp } className="card_photo" alt="" onClick={()=>{setEditPhotoURL();}}/>
    <div className="card_info"><a href={`http://localhost:3000/m/${currentUserID}`} style={{textDecoration:"none",color:"white"}}>{displayName}</a>
    <div className="info_tag">@{currentUserID}</div>   
    </div>
    </div>
    }
    <div className="card_followers"><span className="followers"><span>{followingCount}</span> following</span>
    <span className="followers"><span>{followerCount}</span> followers</span><span></span>
    </div>
    <div className="card_description">
    {editDesc ? <TextField className="editTextField" id="editTextField" placeholder={description} onChange={(e)=>{updateEditDescription(e);}}
    inputProps={{style:{color:"white"}}} fullWidth/>
    : description}
    <span className="edit">
    <EditIcon onClick={()=>{setEditDescription();}}/>
    </span> 
    
    </div>
    </div>
    )
}
