import React, {useState} from 'react'
import "../../styles/auth/Login.scss";
import {Button} from "react-bootstrap";
import {ReactComponent as GithubIcon} from "../../assets/images/github.svg";
import  {ReactComponent as DiscordIcon} from "../../assets/images/discord.svg";
import Destiny from '../../assets/images/destinyLogo.png';
import {TextField,Hidden} from "@material-ui/core";
import axios from "axios";
import { Redirect } from 'react-router-dom';



function Login({setUserToken}) {
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [errorMessage,setErrorMessage]=useState("");
    //const history=useHistory();
    const getUsername=(e)=>{
        setUserName(e.target.value);
    }
    const getPassword=(e)=>{
        setPassword(e.target.value);
    }
  
    const submitLoginData=()=>{
        console.log("fired once");
        axios.post("http://localhost:3001/auth/login",{username:username,password:password})
        .then(res=>{setErrorMessage(res.data.message);
        //save user session
        if(res.data.id){
        localStorage.setItem("token",res.data.id);
        setUserToken(res.data.id);  
        };    
        });
        setUserName(""); 
        setPassword("");
    }
    return (    

        <div className="login">
            {errorMessage.startsWith("Valid") ? <Redirect to="/"/>: null}
            <div className="login_div">
            <div className="login_panel">
            <h3>Login </h3>
            <div className="panel_input">
            <TextField fullWidth inputProps={{style:{color:"white"}}} onChange={(e)=>{getUsername(e)}} value={username}
            error={username.length<5 && username.length>=1} helperText={username.length<5 && username.length>=1 ? "Username needs to be atleast 5 characters long" : null}
            InputLabelProps={{style:{color:"white"}}} placeholder="Nickname" label="Username"/>
            <TextField fullWidth inputProps={{style:{color:"white"}}} onChange={(e)=>{getPassword(e)}} value={password}
            error={password.length<8 && password.length>=1} helperText={password.length<8 && password.length>=1 ? "Password needs to be atleast 8 characters long" : null}
            InputLabelProps={{style:{color:"white"}}} placeholder="Password" label="Password" type="password"/>
            </div>
            <div style={{color:"red"}}>{errorMessage}</div>
            

            <Button variant="danger" onClick={()=>{submitLoginData()}}
            disabled={(username.length>=5 && password.length>=8) ? false : true}>Login</Button> 

            <a href="/register" style={{color:"#BFFFBC"}}>Register on Destiny</a>
            </div>
            </div>

            <div className="login_footer">
            <Hidden xsDown>
            <div className="logo"><img src={Destiny} alt="Destiny logo"/></div>
            </Hidden>
            <Hidden mdUp>
            {/**empty div to fill space when logo is hidden */}
            <div></div>
            </Hidden>

            <div className="footer_info">
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&feature=youtu.be">Privacy Policy</a>
            <a href="https://github.com/michalzard/Destiny/issues" >Report a bug</a>
            <div className="footer_icons">
            <a href="https://github.com/michalzard/Destiny">
            <GithubIcon className="footer_icon" width={25} height={25}style={{fill:"#5d7290"}}/></a>
            <a href="https://discord.gg/HzXaRJcbyp">
            <DiscordIcon className="footer_icon"  width={25} height={25}style={{fill:"#5d7290"}}/></a>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Login;