import React, { useState } from 'react';
import '../Auth/Register.css';
import './EditProfile.css';

import Navbar from '../Navbar/Navbar';

import php from '../../api/php';

import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import AvatarImage from '../../images/avatar.svg';
import BgImage from '../../images/bg.svg';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';

import ReactLoading from 'react-loading';
import { Nav } from 'reactstrap';

const EditProfile = () => {
    const user = useSelector(state => state.user);
    const [firstName, setfirstName] = useState(user.firstName);
    const [lastName, setlastName] = useState(user.lastName);
    const [isLoading, setIsLoading] = useState(false);
    const [infoValid, setInfoValid] = useState(false);
    const history = useHistory();

    const handleSignUp = () => {
        setIsLoading(true);
        setInfoValid(false);
        if(firstName == null || lastName == null){
            setIsLoading(false);
            setInfoValid(true);
        } else {
            const updateUserInformation = async () => {
                const response = await php.post("/editprofile.php", 
                { 
                    userid: user.id,
                    first_name: firstName,
                    last_name: lastName,
                }, 
                { withCredentials: true })
                .catch(err => {
                    setfirstName(user.firstName);
                    setlastName(user.lastName);
                    setIsLoading(false);
                })
    
                const error = response?.data.error;
                console.log(response.data)

                if(!error){
                    setIsLoading(false);
                    history.push('/');
                }
            }
            updateUserInformation();
        }
    }
    
    return (
        <div className="editprofile-bg-container">
            <Navbar/>
            <div style={{margin: 'auto'}} className="register-container">
                <div className="wave">
                    <img className="wave-background" src={BgImage}/>
                </div>
                <div className="form-container">
                    <img className="avatar" src={AvatarImage}/>
                    <h1 className="welcome">EDIT PROFILE</h1>
                    {infoValid && <h3 className="error">Information not valid</h3>}
                    {/* <div className="email-container">
                        <EmailIcon/>
                        <input 
                            type="email" 
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div> */}
                    <div className="name-container">
                        <PersonIcon/>
                        <input 
                            placeholder="First name"
                            onChange={(e) => setfirstName(e.target.value)}
                            value={firstName}
                            required
                        />
                    </div>
                    <div className="name-container">
                        <PersonIcon/>
                        <input 
                            placeholder="Last Name"
                            onChange={(e) => setlastName(e.target.value)}
                            value={lastName}
                            required
                        />
                    </div>
                    {/* <div className="password-container">
                        <LockIcon/>
                        <input 
                            type="password" 
                            placeholder="New Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div> */}
                    <button className="login-button" onClick={handleSignUp}>
                        {
                            isLoading ?
                            <ReactLoading type={'spinningBubbles'} color={"black"} width={40} height={40}/> :
                            'Update'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditProfile;