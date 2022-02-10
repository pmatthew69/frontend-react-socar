import React, { useState } from 'react';
import './Forgot.css';

import php from '../../api/php';

import { useHistory } from 'react-router-dom';

import AvatarImage from '../../images/avatar.svg';
import BgImage from '../../images/bg.svg';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';

import ReactLoading from 'react-loading';

const Forgot = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [emailValidity, setEmailValidity] = useState(true);
    const history = useHistory();

    const handleForgot = () => {
        const postToGetResetPasswordToken = async () => {
            setEmailValidity(false);
            setIsLoading(true);
            const response = await php.post("/auth/password/forgot", {
                email: email
            }).catch(err => {
                setIsLoading(false);
                setEmailValidity(false);
            })

            const success = response?.data.success;
            if(success){
                setIsLoading(false);
                history.push('/');
            }
        }
        postToGetResetPasswordToken();
    }
    return(
        <div className="bg-container">
            <div className="forgot-container">
                <div className="wave">
                    <img className="wave-background" src={BgImage}/>
                </div>
                <div className="form-container">
                    <img className="avatar" src={AvatarImage}/>
                    <h1 className="welcome">FORGOT PASSWORD</h1>
                    <div className="email-container">
                        <PersonIcon/>
                        <input 
                            type="email" 
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <button className="login-button" onClick={handleForgot}>
                        {
                            isLoading ?
                            <ReactLoading type={'spinningBubbles'} color={"black"} width={40} height={40}/> :
                            'Send Reset Token'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Forgot;