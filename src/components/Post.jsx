import "../styles/main/Post.scss";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ShareIcon from '@material-ui/icons/Share';
import BlockIcon from '@material-ui/icons/Block';
//import FlagIcon from '@material-ui/icons/Flag';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import TimeAgo from 'javascript-time-ago'
// English.
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en);
function Post({author,title,content,votes,timestamp}){
    const timeAgo=new TimeAgo("en-US");  
    const timestampFormatted=new Date(timestamp).getTime();
    const diff=Date.now() - timestampFormatted;
    return(
    /**content_post adds extra padding between singular posts */
    <div className="content_post">
    <div className="post_container">
    <div className="votes">
    <div><ThumbUpIcon/></div>
    <div>{votes.like - votes.dislike}</div>
    <div><ThumbDownIcon/></div>
    </div>
    
    <div className="post_content">
    <div className="post_info"><span className="post_by">Posted by</span>
    <span className="post_author"><a href="/u/author">m/{author}</a></span>
    <span className="post_timestamp">{timeAgo.format(Date.now() - diff)}</span>
    </div>
    <div className="post_title"><h4>{title}</h4><div className="post_flairs"></div></div>
    <div className="post_text">
    {content}    
    </div>
    <div className="post_controls">
    <ChatBubbleIcon/>
    <ShareIcon/>
    <BlockIcon/>
    <MoreHorizIcon/>
    </div>
    </div>
    </div>
    </div>
    )
}

export default Post;