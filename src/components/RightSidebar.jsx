import {OverlayTrigger,Popover} from 'react-bootstrap';
import "../styles/main/RightSidebar.scss";
import {ReactComponent as DiscordIcon} from "../assets/images/discord.svg";
import PersonIcon from '@material-ui/icons/Person';
import BugReportIcon from '@material-ui/icons/BugReport';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
function RightSideBar(){
    return(
        <div className="rightSidebar">
        <ProfileMenu/>
        <ProfileCard/>
        </div>
    )
}

export default RightSideBar;

function ProfileMenu(){
     
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

    <a href="/login" className="anchor">
    <ExitToAppIcon/> Logout</a>
   </Popover.Content>
   </Popover>}>
    <PersonIcon />
   </OverlayTrigger>
   </div>
    )
}

function ProfileCard(){
    return(
    <div className="profileCard">
    <div className="card_header">
    <img src="" className="card_photo" alt=""></img>
    <div className="card_info">userName <div className="info_tag">@userTag</div></div>
    </div>
    <div className="card_followers"><span className="followers"><span>0</span> followers</span>
    <span className="followers"><span>0</span> following</span><span></span>
    </div>
    <div className="card_description">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s
    </div>
    </div>
    )
}