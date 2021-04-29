import "../styles/main/Post.scss";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ShareIcon from '@material-ui/icons/Share';
import BlockIcon from '@material-ui/icons/Block';
import {Tooltip} from "@material-ui/core";

//import FlagIcon from '@material-ui/icons/Flag';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import TimeAgo from 'javascript-time-ago'
// English.
import en from 'javascript-time-ago/locale/en'
import { useEffect, useState } from "react";
import axios from "axios";

TimeAgo.addDefaultLocale(en);

function Post({_id,author,title,content,votes,timestamp}){
    const [voteDiff,setVoteDiff]=useState(0);
    const [alreadyLiked,setAlreadyLiked]=useState(false);
    const [alreadyDisliked,setAlreadyDisliked]=useState(false);
    const timeAgo=new TimeAgo("en-US");  
    const timestampFormatted=new Date(timestamp).getTime();
    const diff=Date.now() - timestampFormatted;
    const currentUserID=localStorage.getItem("user_data");
    const loadVotes=()=>{
    setVoteDiff(votes.like-votes.dislike);
    }
    const alreadyVoted=()=>{
    if(votes.likedBy.includes(currentUserID)) setAlreadyLiked(true);
    else setAlreadyLiked(false);
    if(votes.dislikedBy.includes(currentUserID)) setAlreadyDisliked(true);
    else setAlreadyDisliked(false);
    }
    //onclick increment vote,display it,post it to db
    const addLike=()=>{
    if(!alreadyLiked){
    axios.post(`http://localhost:3001/post/${_id}/like`,{likedBy:currentUserID});
    setVoteDiff(voteDiff+1);
    setAlreadyLiked(true);
    if(alreadyDisliked){setVoteDiff(voteDiff+2);setAlreadyDisliked(false);}
    }else{
    axios.post(`http://localhost:3001/post/${_id}/like`,{likedBy:currentUserID});
    setVoteDiff(voteDiff-1);
    setAlreadyLiked(false);
    }
    }
    //onclick decrement vote,display it,post it to db
    const addDislike=()=>{
    if(!alreadyDisliked){
    axios.post(`http://localhost:3001/post/${_id}/dislike`,{dislikedBy:currentUserID});
    setVoteDiff(voteDiff-1);
    setAlreadyDisliked(true);
    if(alreadyLiked){setVoteDiff(voteDiff-2);setAlreadyLiked(false);}
    }else{
    axios.post(`http://localhost:3001/post/${_id}/dislike`,{dislikedBy:currentUserID});
    setVoteDiff(voteDiff+1);
    setAlreadyDisliked(false);
    }
    }

    const createSharedLink=()=>{
        if(navigator.clipboard){
        navigator.clipboard.writeText(`http://localhost:3001/post/${_id}`);
        }
    }

    //on post load
    useEffect(()=>{
    loadVotes();
    alreadyVoted();
    // eslint-disable-next-line
    },[]);
    return(
    /**content_post adds extra padding between singular posts */
    <div className="content_post">
    <div className="post_container">
    <div className="votes">
    <div><ThumbUpIcon onClick={()=>{addLike()}} style={{color: alreadyLiked ? "greenyellow" : "white"}}/></div>
    <div>{voteDiff}</div>
    <div><ThumbDownIcon onClick={()=>{addDislike()}} style={{color: alreadyDisliked ? "red" : "white"}} /></div>
    </div>
    
    <div className="post_content">
    <div className="post_info"><span className="post_by">Posted by</span>
    <span className="post_author"><a href={`m/${author._id}`}>m/{author.username}</a></span>
    <span className="post_timestamp">{timeAgo.format(Date.now() - diff)}</span>
    </div>
    <div className="post_title"><h4>{title}</h4><div className="post_flairs"></div></div>
    <div className="post_text">
    {content}    
    </div>
    <div className="post_controls">
    <ChatBubbleIcon/>
    <Tooltip title="Share">
    <ShareIcon onClick={()=>{createSharedLink();}} />
    </Tooltip>
    <BlockIcon/>
    <MoreHorizIcon/>
    </div>
    </div>
    </div>
    </div>
    )
}

export default Post;

