import "../styles/main/LeftSidebar.scss";
import {Button} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home';
import Destiny from '../assets/images/destinyLogo.png';
import NewReleasesIcon from '@material-ui/icons/NewReleasesSharp';

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
return(
    <Button href={redirect} color="secondary" variant="text"
    className="linkButton">{icon}<span className="text">{text}</span></Button>
)
}

export default LeftSideBar;