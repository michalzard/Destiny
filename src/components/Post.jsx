import "../styles/main/Post.scss";
import TimeAgo from 'javascript-time-ago'
// English.
import en from 'javascript-time-ago/locale/en'

import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ShareIcon from '@material-ui/icons/Share';
import BlockIcon from '@material-ui/icons/Block';
import {Tooltip,Button,Popover} from "@material-ui/core";

//import FlagIcon from '@material-ui/icons/Flag';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDownSharp';
import ForumIcon from '@material-ui/icons/Forum';

import { useEffect, useState } from "react";
import axios from "axios";

TimeAgo.addDefaultLocale(en);


function PostOverview({_id,author,title,content,votes,timestamp,borderless=false,borderbottom=false}){
    const [voteDiff,setVoteDiff]=useState(0);
    const [alreadyLiked,setAlreadyLiked]=useState(false);
    const [alreadyDisliked,setAlreadyDisliked]=useState(false);
    const [shareTtp,setShareTooltip]=useState("Share");
    const timeAgo=new TimeAgo("en-US");  
    const timestampFormatted=new Date(timestamp).getTime();
    const diff=Date.now() - timestampFormatted;
    const token=localStorage.getItem("token");
    const [currentUserID,setCurrentUser]=useState('');
    const fetchUserData=()=>{ 
    if(token){axios.get(`http://localhost:3001/auth/session?token=${token}`).then(data=>{
    const member=data.data.user;    
    if(member){
    setCurrentUser(member._id);
    }
    });
    }
    }
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
    //creates post link that will get copied into user's clipboard
    const createSharedLink=()=>{
        if(navigator.clipboard){
        navigator.clipboard.writeText(`http://localhost:3000/post/${_id}`);
        setShareTooltip("Copied to clipboard");
        setTimeout(()=>{setShareTooltip("Share")},3000);
        }
    }
    
    //on post load
    useEffect(()=>{
    fetchUserData();
    loadVotes();
    alreadyVoted();
    // eslint-disable-next-line
    },[currentUserID]);
    return(
    /**content_post adds extra padding between singular posts */
    <div className="content_post">
    <div className="post_container" 
    style={{border: borderless ? "none" : "1px solid #5d7290",
    borderRadius:borderbottom ? "10px 10px 0px 0px" :"10px"}}>
    <div className="votes">
    <div><ThumbUpIcon onClick={()=>{addLike()}} style={{color: alreadyLiked ? "greenyellow" : "white"}}/></div>
    <div>{voteDiff}</div>
    <div><ThumbDownIcon onClick={()=>{addDislike()}} style={{color: alreadyDisliked ? "red" : "white"}} /></div>
    </div>
    
    <div className="post_content">
    <div className="post_info"><span className="post_by">Posted by</span>
    <span className="post_author"><a href={`http://localhost:3000/m/${author._id}`}>m/{author.username}</a></span>
    <span className="post_timestamp">{timeAgo.format(Date.now() - diff)}</span>
    </div>
    <div className="post_title"><h4>{title}</h4><div className="post_flairs"></div></div>
    <div className="post_text">
    {content}    
    </div>
    <div className="post_controls">
    <Tooltip title="Comments" placement="top">
    <a href={`http://localhost:3000/post/${_id}/comments`}><ChatBubbleIcon/></a>
    </Tooltip>
    <Tooltip title={shareTtp} placement="top">
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

/**
 * Display full post even with comments
 */
function FullPost({_id,author,title,content,votes,timestamp}){
const [sort,setSort]=useState("New");
const [anchorEl, setAnchorEl] = useState(null);
const [open,setOpen]=useState(false);
const [id,setId]=useState("");
const [comment,setComment]=useState("");
const token=localStorage.getItem("token");
const [currentUserID,setCurrentUser]=useState('');
const [currentUserName,setCurrentUsername]=useState('');

const [allComments,setComments]=useState([]);
const fetchCommentsData=()=>{
    axios.get(`http://localhost:3001/post/${_id}/comments`).then(data=>{
    const {comments} =data.data.post;
    comments.reverse();
    if(comments) setComments(comments);
    })  
    
}

const fetchUserData=()=>{ 
if(token){axios.get(`http://localhost:3001/auth/session?token=${token}`).then(data=>{
const member=data.data.user;    
if(member){
setCurrentUser(member._id);
setCurrentUsername(member.username);
}
});
}
}
const handlePopOpen=(e)=>{
 setAnchorEl(e.currentTarget);
 setOpen(true);
 setId("simple-popover");
}
const handlePopClose=()=>{
setAnchorEl(null);
setOpen(false);
setId(null);
}
const handleSortSelect=(e)=>{
    setSort(e.target.innerHTML);
    handlePopClose();
}
useEffect(()=>{
fetchUserData();
// eslint-disable-next-line
},[]);

useEffect(()=>{
fetchCommentsData();
return setComments([]);
// eslint-disable-next-line
},[]);

const commentOnChange=(e)=>{
    setComment(e.target.value);
}

const submitComment=()=>{
  if(currentUserID){
    axios.post(`http://localhost:3001/post/${_id}/newComment`,{author:currentUserID,content:comment})
    }  
  document.getElementById("area").value="";
}

return(
     <>
    <PostOverview _id={_id} borderless={true} borderbottom={true}
    author={author} title={title} content={content} votes={votes} timestamp={timestamp} />
    <div className="post_comments">
    <h6>Comment as <a href={`http://localhost:3000/m/${currentUserID}`} style={{color:"lightskyblue"}}>{currentUserName}</a></h6>
    <div className="add_comment">
    <textarea className="area" id="area" placeholder="What are your thoughts?" onChange={commentOnChange}></textarea>
    <Button aria-describedby={id} variant="contained" color="secondary"  href={`http://localhost:3000/post/${_id}/comments`}
    disabled={comment.length>0 ? false : true} onClick={()=>{submitComment();}}>Comment</Button>
    </div>
    <div className="sort_by">Sort by 
    <div className="sort_info">
    <span onClick={(e)=>{handlePopOpen(e)}}>
    <Button variant="text" size="small">{sort}<ArrowDropDownIcon style={{color:"white"}}/></Button> 
    </span>
    <Popover id={id} open={open} anchorEl={anchorEl} onClose={handlePopClose} anchorOrigin={{vertical: "bottom",horizontal:"left"}}>
    <div className="sort_selection">
    <Button variant="text" onClick={(e)=>{handleSortSelect(e);}}>New</Button>
    <Button variant="text" onClick={(e)=>{handleSortSelect(e);}}>Best</Button>
    </div>
    </Popover>
    </div>
    </div>
    <div className="all_comments">
    {
        allComments.length>0 ? allComments.map((comment,i)=>{
            return <Comment key={i} author={comment.author} content={comment.content} timestamp={comment.createdAt}/>
        })
        : <CommentNotFound/>
    }

    </div> 
    </div>
    </>
 )
}

function Comment({author,content,timestamp}){
const timeAgo=new TimeAgo("en-US");  
const timestampFormatted=new Date(timestamp).getTime();
const diff=Date.now() - timestampFormatted;
return(
    <div className="comment">
    <div className="info"><span className="post_by">Posted by</span>
    <span className="author"><a href={`http://localhost:3000/m/${author._id}`}>m/{author.username}</a></span>
    <span className="timestamp">{timeAgo.format(Date.now() - diff)}</span>
    <div className="content">{content}</div>
    </div>
    </div>
)
}


function CommentNotFound(){
    return(
        <div className="comment_notfound">
        <ForumIcon/>
        <span>No Comments yet.</span>
        <span>Be the first to share what you think!</span>
        </div>
)
}
function PostNotFound(){
    return(
        <div className="comment_notfound">
        <ForumIcon/>
        <span>No Posts yet.</span>
        <span>Be the first to share what you think!</span>
        </div>
    )
}
function LikesNotFound(){
    return(
        <div className="comment_notfound">
        <ThumbUpIcon/>
        <span>This User didn't liked any posts yet.</span>
        </div>
    )
}
function FavoritesNotFound(){
return(
    <div className="comment_notfound">
    <span><ForumIcon style={{marginRight:"10px"}}/>No Posts yet?</span>
    <span>Start following people and you'll see Posts show up here</span>
    </div>
)
}
export {PostOverview,FullPost,PostNotFound,FavoritesNotFound,LikesNotFound};

