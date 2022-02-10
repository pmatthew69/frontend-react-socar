import React, { useEffect, useState } from 'react';
import './Landing.css';

// Import Image
import Logo from "../../images/logo.png";
import Menu from "../../images/menu.png";
import FB from "../../images/fb.png";
import IG from "../../images/ig.png";
import TW from "../../images/tw.png";
import Share from "../../images/share.png";
import Info from "../../images/info.png";
import Bubble from "../../images/bubble.png";

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import php from '../../api/php';
import { login, logout } from '../../redux/user/userAction';

import PersonIcon from '@mui/icons-material/Person';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';

const Landing = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const [loggedin, setloggedin] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const response = await php.get('/me.php', {withCredentials: true})
                .catch(err => console.log(err));
            const user = response?.data.user;

            console.log(response.data)
            if(response?.data.loggedin){
                dispatch(login({ user }));
                setloggedin(true);
            }
        }
        checkAuth();
    }, [])

    const handleLogout = () => {
        const logoutFromServer = async () => {
            const response = await php.get('/logout.php', {withCredentials: true})
                .catch(err => console.log(err));
            const status = response?.data.loggedin;
            console.log(response.data);
            if(!status){
                dispatch(logout());
                setloggedin(false);
            }
        }
        logoutFromServer();
    }



    return(
        <div className="hero">
            <div className="navbar">
                <img src={Logo} class="logo"/>
                {loggedin ? (
                    <UncontrolledDropdown style={{outline: 'none'}}>
                        <DropdownToggle style={{background: 'transparent'}} caret>
                            <PersonIcon/>
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem >Edit Profile</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown> ) : (
                        <button class="button" onClick={() => history.push('/register')}>Sign Up</button>
                    )
                }
            </div>
            <div className="content">
                <small>Welcome to </small>
            <h1>SoCar</h1>
            <button class="button">Take a tour</button>
            </div>
            <div className="side-bar">
                <img src={Menu} class="menu"/>
                <div className="social-links">
                    <img src={FB}/>
                    <img src={IG}/>
                    <img src={TW}/>
                </div>
        
                <div className="useful-links">
                    <img src={Share}/>
                    <img src={Info}/>
                </div>
            </div>
    
            <div className="bubbles">
                <img src={Bubble}/>
                <img src={Bubble}/>
                <img src={Bubble}/>
                <img src={Bubble}/>
                <img src={Bubble}/>
                <img src={Bubble}/>
                <img src={Bubble}/>
            </div>
        </div>
    )
}

export default Landing;