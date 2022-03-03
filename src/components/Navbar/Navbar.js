import React, { useState, useEffect } from 'react';
import './Navbar.css';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';

import PersonIcon from '@mui/icons-material/Person';

import php from '../../api/php';
import { login, logout } from '../../redux/user/userAction';

const Navbar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);


    const [loggedin, setloggedin] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const response = await php.get('/me.php', {withCredentials: true})
                .catch(err => console.log(err));
            const user = response?.data.user;

            console.log(response.data)
            if(response?.data.loggedin){
                dispatch(login( user ));
                setloggedin(true);
            }
        }
        checkAuth();
        console.log(user)
    }, [])

    const handleLogout = () => {
        const logoutFromServer = async () => {
            const response = await php.get('/logout.php', {withCredentials: true})
                .catch(err => console.log(err));
            const status = response?.data.loggedin;

            if(!status){
                dispatch(logout());
                setloggedin(false);
            }
        }
        logoutFromServer();
    }

    return (
        <div className="navbar">
            <h1 onClick={() => history.push('/')} className="logo">Gas ‘N’ GO!</h1>
            {loggedin ? (
                <UncontrolledDropdown style={{outline: 'none'}}>
                    <DropdownToggle style={{background: 'transparent'}} caret>
                        <PersonIcon/>
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={() => history.push('/edit')}>Edit Profile</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => history.push('/history')}>Booking History</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => history.push('/transaction')}>Transaction History</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown> ) : (
                    <div> 
                        <button className="button" onClick={() => history.push('/register')}>Sign Up</button>
                        <button className="button signin" onClick={() => history.push('/login')}>Sign In</button>
                    </div>
                )
            }
        </div>
    )
}

export default Navbar;