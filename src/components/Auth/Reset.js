import React, { useState } from 'react';
import './Reset.css';

import php from '../../api/php';

import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import AvatarImage from '../../images/avatar.svg';
import BgImage from '../../images/bg.svg';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';

import ReactLoading from 'react-loading';

const Reset = () => {
    const [password, setPassword] = useState("");
    const [passwordConfiramtion, setPasswordConfiramtion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [infoValid, setInfoValid] = useState(false);
    const history = useHistory();

    const handleSignUp = () => {
        setIsLoading(true);
        setInfoValid(false);
        if(password != passwordConfiramtion || passwordConfiramtion == null || password == null){
            setIsLoading(false);
            setInfoValid(true);
        } else {
            const postUserInformation = async () => {
                const response = await php.post("/reset", {
                    password,
                    password_confirmation: passwordConfiramtion
                }).catch(err => {
                    setPassword("");
                    setPasswordConfiramtion("");
                    setIsLoading(false);
                })
    
                const signUpStatus = response?.data.status;
                if(signUpStatus == "created"){
                    setIsLoading(false);
                    history.push('/login');
                }
            }
            postUserInformation();
        }
    }

    return (
        <div className="bg-container">
            <div className="register-container">
                <div className="wave">
                    <img className="wave-background" src={BgImage}/>
                </div>
                <div className="form-container">
                    <img className="avatar" src={AvatarImage}/>
                    <h1 className="welcome">RESET</h1>
                    {infoValid && <h3 className="error">New Password not Match</h3>}
                    <div className="password-container">
                        <LockIcon/>
                        <input 
                            type="password" 
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                        />
                    </div>
                    <div className="password-container">
                        <LockIcon/>
                        <input 
                            type="password" 
                            placeholder="Conform Password"
                            onChange={(e) => setPasswordConfiramtion(e.target.value)}
                            value={passwordConfiramtion}
                            required
                        />
                    </div>
                    <button className="login-button" onClick={handleSignUp}>
                        {
                            isLoading ?
                            <ReactLoading type={'spinningBubbles'} color={"black"} width={40} height={40}/> :
                            'Reset'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Reset;