import './App.css';

// Import Components
import Landing from './components/Main/Landing';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import Reset from './components/Auth/Reset';
import ResetAdmin from './components/Auth/ResetAdmin';
import Forgot from './components/Auth/Forgot';
import GoogleMap from './components/Map/GoogleMap';
import Location from './components/Map/Location';
import EditProfile from './components/UserFunction/EditProfile';
import History from './components/UserFunction/History';
import CheckOut from './components/Transaction/CheckOut';
import TransactionHistory from './components/Transaction/TransactionHistory';
import Admin from './components/Admin/Admin';
import AllBookingList from './components/Admin/AllBookingList';
import AddCar from './components/Admin/AddCar';

import 'bootstrap/dist/css/bootstrap.css';


import { BrowserRouter as Router, Switch, Route, DefaultRoute } from "react-router-dom";


function App() {
  return (
    <Router>
      <Switch>
        <Route path='/addcar'>
          <AddCar/>
        </Route>
        <Route path='/allbookinglist'>
          <AllBookingList/>
        </Route>
        <Route path='/admin'>
          <Admin/>
        </Route>
        <Route path='/transaction'>
          <TransactionHistory/>
        </Route>
        <Route path='/checkout'>
          <CheckOut/>
        </Route>
        <Route path="/history">
          <History/>
        </Route>
        <Route path="/edit">
          <EditProfile/>
        </Route>
        <Route path="/map">
          <GoogleMap/>
        </Route>
        <Route path="/location">
          <Location/>
        </Route>
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
        <Route path="/resetadmin">
          <ResetAdmin/>
        </Route>
        <Route path="/">
          <Landing/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
