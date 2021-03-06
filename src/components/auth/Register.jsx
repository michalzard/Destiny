import React, { useState } from 'react'
import "../../styles/auth/Register.scss";
import {Button} from "react-bootstrap";
import {ReactComponent as GithubIcon} from "../../assets/images/github.svg";
import  {ReactComponent as DiscordIcon} from "../../assets/images/discord.svg";
import Destiny from '../../assets/images/destinyLogo.png';
import {Redirect} from "react-router-dom";
import {TextField,Hidden} from "@material-ui/core";
import axios from "axios";

function Register() {
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");
    const [errorMessage,setErrorMessage]=useState("");
    const getUsername=(e)=>{
        setUserName(e.target.value);
    }
    const getPassword=(e)=>{
        setPassword(e.target.value);
    }

    const submitRegisterData=()=>{
        let token="";
        axios.post("http://localhost:3001/auth/register",{username:username,password:password}).then(data=>{
            const{id,message}=data.data;
            token=id;
            setErrorMessage(message);
        })
        setUserName(""); 
        setPassword("");
        axios.get(`http://localhost:3001/auth/session?${token}`).then(data=>{
            if(data.data)localStorage.setItem("token",data.data)
        });
        
    }
    
    return (       
        <div className="register">
            {errorMessage==="Registered" ? <Redirect to="/login" /> : null}
            <div className="register_div">
            <div className="register_panel">
            <h3>Create your account</h3>
            <div className="panel_input">
            <TextField fullWidth inputProps={{style:{color:"white"}}} onChange={(e)=>{getUsername(e)}} 
             error={username.length<5 && username.length>=1} helperText={username.length<5 && username.length>=1 ? "Username needs to be atleast 5 characters long" : null}
            InputLabelProps={{style:{color:"white"}}} placeholder="Nickname" label="Username"/>
            <TextField fullWidth inputProps={{style:{color:"white"}}} onChange={(e)=>{getPassword(e)}}
            error={password.length<8 && password.length>=1} helperText={password.length<8 && password.length>=1 ? "Password needs to be atleast 8 characters long" : null}
            InputLabelProps={{style:{color:"white"}}} placeholder="Password" label="Password" type="password"/>
            </div>
            {errorMessage ? <span style={{color:"red"}}>{errorMessage}</span> : null}
            <Button variant="danger" onClick={()=>{submitRegisterData()}} disabled={(username.length>5 && password.length>=8) ? false : true}
            >Register</Button> 
            <a href="/login" style={{color:"#BFFFBC"}}>Already have an account?</a>
            </div>
            </div>
            <div className="register_footer">
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

export default Register;
