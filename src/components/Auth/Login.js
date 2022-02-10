import React, { useState } from 'react';
import './Login.css';

import { useDispatch } from 'react-redux';
import { login } from '../../redux/user/userAction';
import php from '../../api/php';

import { useHistory } from 'react-router-dom';

import AvatarImage from '../../images/avatar.svg';
import BgImage from '../../images/bg.svg';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';

import ReactLoading from 'react-loading';



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [infoNotValid, setInfoNotValid] = useState(false);
    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogin = () => {
        const postUserInformation = async () => {
            setInfoNotValid(false);
            setIsLoading(true);
            const response = await php.post("/login.php", { email: email, password: password}, { withCredentials: true })
                .catch(err => {
                    // setEmail("");
                    // setPassword("");
                    setIsLoading(false);
                    setInfoNotValid(true);
                })

            const user = response?.data.user;
            console.log(response.data)

            if(response?.data.loggedin){
                dispatch(login({ user }));
                setIsLoading(false);
                history.push('/');
            } 
        }
        postUserInformation();
    }

    return(
        <div className="bg-container">
            <div className="login-container">
                <div className="wave">
                    <img className="wave-background" src={BgImage}/>
                </div>
                <div className="form-container">
                    <img className="avatar" src={AvatarImage}/>
                    <h1 className="welcome">WELCOME</h1>
                    {infoNotValid && <h3 className="error">User not valid</h3>}
                    <div className="email-container">
                        <PersonIcon/>
                        <input 
                            type="email" 
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
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
                    <div className="redirect-container">
                        <a onClick={() => history.push('/register')}><span>Sign Up</span></a>
                        <a onClick={() => history.push('/forgot')}><span>Forgot Password?</span></a>
                    </div>
                    <button className="login-button" onClick={handleLogin}>
                        {
                            isLoading ?
                            <ReactLoading type={'spinningBubbles'} color={"black"} width={40} height={40}/> :
                            'Login'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;