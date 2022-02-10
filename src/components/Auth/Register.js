import React, { useState } from 'react';
import './Register.css';

import php from '../../api/php';

import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import AvatarImage from '../../images/avatar.svg';
import BgImage from '../../images/bg.svg';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import EmailIcon from '@material-ui/icons/Email';

import ReactLoading from 'react-loading';

const Register = () => {
    const [email, setEmail] = useState("");
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfiramtion, setPasswordConfiramtion] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [infoValid, setInfoValid] = useState(false);
    const [userExist, setUserExist] = useState(false);
    const history = useHistory();

    const handleSignUp = () => {
        setIsLoading(true);
        setInfoValid(false);
        setUserExist(false);
        if(password != passwordConfiramtion || email == null || firstName == null || lastName == null || passwordConfiramtion == null || password == null){
            setIsLoading(false);
            setInfoValid(true);
        } else {
            const postUserInformation = async () => {
                const response = await php.post("/register.php", 
                {
                    email: email,
                    password: password,
                    password_confirmation: passwordConfiramtion,
                    first_name: firstName,
                    last_name: lastName,
                }, 
                { withCredentials: true })
                .catch(err => {
                    // setEmail("");
                    // setfirstName("");
                    // setlastName("");
                    // setPassword("");
                    // setPasswordConfiramtion("");
                    setIsLoading(false);
                    setUserExist(true);
                })
    
                const signUpStatus = response?.data.status;
                const existed = response?.data.existed;
                console.log(response.data)

                if(existed){
                    setIsLoading(false);
                    setUserExist(true);
                }
                else if(signUpStatus){
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
                    <h1 className="welcome">SIGN UP</h1>
                    {infoValid && <h3 className="error">Information not valid</h3>}
                    {userExist && <h3 className="error">User Exist</h3>}
                    <div className="email-container">
                        <EmailIcon/>
                        <input 
                            type="email" 
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                        />
                    </div>
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
                    <div className="redirect-container">
                    <a onClick={() => history.push('/login')}><span>Already have account?</span></a>
                        <a onClick={() => history.push('/forgot')}><span>Forgot Password?</span></a>
                    </div>
                    <button className="login-button" onClick={handleSignUp}>
                        {
                            isLoading ?
                            <ReactLoading type={'spinningBubbles'} color={"black"} width={40} height={40}/> :
                            'Register'
                        }
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register;