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
import {useState,useEffect} from 'react';


function App() {
  const [user,setUser]=useState("");
  /**
   * runs once to load session
   */
  useEffect(() => {
    const loadSession =async()=>{
      const session=await window.cookieStore.get("connect.sid");
      if(session)setUser(session.value);
    }
    loadSession();
  }, [])
  return (
    <div className="App">
      <Router>
      <Switch>

      <Route exact path="/">
      {user ? <Main/> : <Welcome/>}
      </Route>
      <Route exact path="/register">
      <Register/>
      </Route>

      <Route exact path="/login">
      <Login/>
      </Route>

      </Switch>
      </Router>
    </div>
  );
}

export default App;
