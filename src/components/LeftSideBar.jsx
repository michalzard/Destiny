import "../styles/main/LeftSidebar.scss";
import {Button} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import Destiny from '../assets/images/destinyLogo.png';
//import DestinyXS from '../assets/images/destinyLogoXS.png';
import SettingsIcon from '@material-ui/icons/Settings';
import NewReleasesIcon from '@material-ui/icons/NewReleasesSharp';
import {useHistory} from "react-router-dom";
import {OverlayTrigger,Popover} from 'react-bootstrap';
import PersonIcon from '@material-ui/icons/Person';
import BugReportIcon from '@material-ui/icons/BugReport';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {ReactComponent as DiscordIcon} from "../assets/images/discord.svg";

import axios from 'axios';

/**
 * <OverlayTrigger trigger="click" placement="left" 
    overlay={
    <Popover>
   <Popover.Content>
     </Popover.Content>
   </Popover>}>
   //icon
   </OverlayTrigger>
 */

function LeftSideBar({settings}){    
    return(
        <div className="leftsidebar">
        <div className="logo"><img src={Destiny} alt="Destiny logo"/></div>
        <div className="links">
        <LinkButton icon={<HomeIcon/>} redirect="/" text={"Home"} />
        <LinkButton icon={<NewReleasesIcon/>} redirect="/latest" text="Latest" />
        {
        settings ?
        <SettingsButton/>
        : null
        }
        </div>
        </div>
    )
}

function SettingsButton(){
const logout=()=>{
axios.post("http://localhost:3001/auth/logout");
if(localStorage.getItem("token")) localStorage.removeItem("token");
}
return (
    <OverlayTrigger trigger="click" overlay={
        <Popover id="popover-menu">
        <Popover.Content>
        <p><a href="http://localhost:3000/m/your_id" className="anchor">
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
        <Button color="secondary" className="linkButton" variant="text"><SettingsIcon/><span className="text">Settings</span></Button>
        </OverlayTrigger>
        )
}
function LinkButton({icon,redirect,text}){
const location=useHistory().location.pathname;
return(
    <Button href={redirect} color="secondary" variant="text"
    //selected uses rgba version of #f50057 
    style={{backgroundColor: location===redirect ? "rgba(245,0,87,1) " : null }}
    className="linkButton">{icon} {text ? <span className="text">{text}</span> : null}</Button>
)
}

export default LeftSideBar;