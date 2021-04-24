import "../styles/main/Post.scss";
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ShareIcon from '@material-ui/icons/Share';
import BlockIcon from '@material-ui/icons/Block';
//import FlagIcon from '@material-ui/icons/Flag';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function Post(){
    //Idea: type props that will change how post is renderered(text,img/gif,link)
    return(
    /**content_post adds extra padding between singular posts */
    <div className="content_post">
    <div className="post_container">
    <div className="votes">
    <div><ThumbUpIcon/></div>
    <div>77</div>
    <div><ThumbDownIcon/></div>
    </div>
    
    <div className="post_content">
    <div className="post_info"><span className="post_by">Posted by</span>
    <span className="post_author"><a href="/u/author">u/Author</a></span>
    <span className="post_timestamp">4hours ago</span>
    </div>
    <div className="post_title"><h4>Title</h4><div className="post_flairs"></div></div>
    <div className="post_text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
    It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</div>
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