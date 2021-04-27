import {OverlayTrigger,Popover} from 'react-bootstrap';
import "../styles/main/RightSidebar.scss";
import {ReactComponent as DiscordIcon} from "../assets/images/discord.svg";
import PersonIcon from '@material-ui/icons/Person';
import BugReportIcon from '@material-ui/icons/BugReport';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import axios from 'axios';
import { useEffect, useState } from 'react';
function RightSideBar({userId}){
    return(
        <div className="rightSidebar">
        <ProfileMenu userId={userId} />
        <ProfileCard userId={userId} />
        </div>
    )
}

export default RightSideBar;

function ProfileMenu({userId}){
     const logout=()=>{
         axios.post("http://localhost:3000/logout");
         if(localStorage.getItem("user_data")) localStorage.removeItem("user_data");
     }
    return(
    <div className="profileMenu">
    <OverlayTrigger trigger="click" placement="left" 
    overlay={
    <Popover>
   <Popover.Content>
   <p><a href="/u/userTag" className="anchor">
   <PersonIcon /> Profile </a></p>

   <p><a href="https://github.com/MichalPlatko/Destiny/issues" target="_blank" rel="noreferrer" className="anchor">
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

function ProfileCard({userId}){
    const [displayName,setName]=useState("");
    const [description,setDesc]=useState("");
    const [followerCount,setFollowerCount]=useState(0);
    const [followingCount,setFollowingCount]=useState(0);
    const fetchUserData=()=>{
    if(userId) axios.get(`http://localhost:3000/m/${userId}`).then(data=>{    
    const member=data.data.member;    
    console.log(member);
    setDesc(member.description);
    setFollowerCount(member.followers.followedCount);
    setFollowingCount(member.followers.followingCount);
    setName(member.username)
    });
    }
    useEffect(()=>{
        fetchUserData();
        // eslint-disable-next-line
    },[]);

    return(
    <div className="profileCard">
    <div className="card_header">
    <img src="" className="card_photo" alt=""></img>
    <div className="card_info">{displayName} <div className="info_tag">@{userId}</div></div>
    </div>
    <div className="card_followers"><span className="followers"><span>{followingCount}</span> following</span>
    <span className="followers"><span>{followerCount}</span> followers</span><span></span>
    </div>
    <div className="card_description">
    {description}
    </div>
    </div>
    )
}