//bootstrap imports for css and functionality
import 'bootstrap/dist/css/bootstrap.min.css';

import "./styles/Default.scss";

//components
import Welcome from "./components/Welcome";
import Main from './components/Main';
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import {useEffect, useState} from 'react';
//import axios from 'axios';


function App() {
  const [userId,setUserId]=useState("");

  /**
   * runs once to load session
   */
  const loadUserData=()=>{
    const savedUserId=JSON.parse(localStorage.getItem("user_data"));
    if(savedUserId)setUserId((savedUserId));
  }
  useEffect(() => {
    loadUserData();
  }, []);
  return (
    <div className="App">
      <Router>
      <Switch>

      <Route exact path="/">
      {userId ? <Main userId={userId}/> : <Welcome/>}
      </Route>
      <Route exact path="/register">
      <Register/>
      </Route>

      <Route exact path="/login">
      <Login setUser={setUserId} />
      </Route>

      </Switch>
      </Router>
    </div>
  );
}

export default App;
