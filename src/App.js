import './App.css';

// Import Components
import Landing from './components/Main/Landing';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Reset from './components/Auth/Reset';
import Forgot from './components/Auth/Forgot';

import 'bootstrap/dist/css/bootstrap.css';


import { BrowserRouter as Router, Switch, Route, DefaultRoute } from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register/>
        </Route>    
        <Route path="/login">
          <Login/>
        </Route>    
        <Route path="/forgot">
          <Forgot/>
        </Route>
        <Route path="/reset">
          <Reset/>
        </Route>
        <Route path="/">
          <Landing/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
