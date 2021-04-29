import React from 'react'
import "../styles/auth/Login.scss";
import {Button} from "react-bootstrap";
import {ReactComponent as GithubIcon} from "../assets/images/github.svg";
import  {ReactComponent as DiscordIcon} from "../assets/images/discord.svg";
import Destiny from '../assets/images/destinyLogo.png';


function WelcomeScreen() {
    return (       
        <div className="login">
            
            <div className="login_div">
            <div className="login_panel">
            <h3>Welcome</h3>
            <div className="panel_info">
            By logging in you accept our <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be">Terms of Services</a> and <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be">Privacy Policy</a>.
            </div>
            <Button variant="danger" href="/login">Login</Button> 
            </div>
            </div>

            <div className="login_footer">
            <div className="logo"><img src={Destiny} alt="Destiny logo"/></div>
            <div className="footer_info">
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be">Privacy Policy</a>
            <a href="https://github.com/MichalPlatko/Destiny/issues" >Report a bug</a>
            <div className="footer_icons">
            <a href="https://github.com/MichalPlatko/Destiny">
            <GithubIcon className="footer_icon" width={25} height={25}style={{fill:"#5d7290"}}/></a>
            <a href="https://discord.gg/HzXaRJcbyp">
            <DiscordIcon className="footer_icon"  width={25} height={25}style={{fill:"#5d7290"}}/></a>
            </div>
            </div>
            </div>
        </div>
    )
}

export default WelcomeScreen;
