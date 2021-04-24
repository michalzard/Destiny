import React, {useState } from 'react'
import "../../styles/auth/Login.scss";
import {Button} from "react-bootstrap";
import {ReactComponent as GithubIcon} from "../../assets/images/github.svg";
import  {ReactComponent as DiscordIcon} from "../../assets/images/discord.svg";
import {TextField} from "@material-ui/core";
import axios from "axios";
import { Redirect } from 'react-router-dom';



function Login() {
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [errorMessage,setErrorMessage]=useState("");
    const getUsername=(e)=>{
        setUserName(e.target.value);
    }
    const getPassword=(e)=>{
        setPassword(e.target.value);
    }

    const submitLoginData=()=>{
        axios.post("http://localhost:3000/login",{username:username,password:password})
        .then(res=>{setErrorMessage(res.data.message)});
        setUserName(""); 
        setPassword("");
    }
    return (    

        <div className="login">
            <div className="login_div">
            <div className="login_panel">
            <h3>Login </h3>
            <div className="panel_input">
            <TextField fullWidth inputProps={{style:{color:"white"}}} onChange={(e)=>{getUsername(e)}} value={username}
            InputLabelProps={{style:{color:"white"}}} placeholder="Nickname" label="Username"/>
            <TextField fullWidth inputProps={{style:{color:"white"}}} onChange={(e)=>{getPassword(e)}} value={password}
            InputLabelProps={{style:{color:"white"}}} placeholder="Password" label="Password" type="password"/>
            </div>
            <div style={{color:"red"}}>{errorMessage}</div>
            
            {errorMessage==="Valid" ? <Redirect to="/"/> : null}

            <Button variant="danger" onClick={()=>{submitLoginData()}}
            disabled={(username.length>0 && password.length>0) ? false : true}>Login</Button> 

            <a href="/register" style={{color:"purple"}}>Register on Destiny</a>
            </div>
            </div>

            <div className="login_footer">
            LOGO GONNA BE HERE
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

export default Login;