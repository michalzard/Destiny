import "../styles/main/LeftSidebar.scss";
import {Button} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import Destiny from '../assets/images/destinyLogo.png';
import NewReleasesIcon from '@material-ui/icons/NewReleasesSharp';
import {useHistory} from "react-router-dom";

function LeftSideBar(){    
    return(
        <div className="leftsidebar">
        <div className="logo"><img src={Destiny} alt="Destiny logo"/></div>
        
        <div className="links">
        <LinkButton icon={<HomeIcon/>} redirect="/" text="Home" />
        <LinkButton icon={<NewReleasesIcon/>} redirect="/latest" text="Latest" />
        </div>

        </div>
    )
}

function LinkButton({icon,redirect,text}){
const location=useHistory().location.pathname;
return(
    <Button href={redirect} color="secondary" variant="text"
    //selected uses rgba version of #f50057 
    style={{backgroundColor: location===redirect ? "rgba(245,0,87,1) " : null }}
    className="linkButton">{icon}<span className="text">{text}</span></Button>
)
}

export default LeftSideBar;