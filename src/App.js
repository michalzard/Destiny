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


function App() {
  const [token,setUserToken]=useState("");
  
  /**
   * runs once to load session
   */
  const loadUserData=()=>{
    const userToken=localStorage.getItem("token");
    if(userToken)setUserToken((userToken));
  }
  useEffect(() => {
    loadUserData();
  }, []);
  return (
    <div className="App">
      <Router>
      <Switch>
      <Route path="/register"> <Register/> </Route>
      <Route path="/login"> <Login setUserToken={setUserToken}/> </Route>

      <Route path="/">
       {token ? <Main token={token}/> : <Welcome/>}
      </Route>
      

      </Switch>
      </Router>
    </div>
  );
}

export default App;
