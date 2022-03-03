import React, { useEffect, useState } from 'react';
import './Landing.css';

import { useSelector } from 'react-redux';

import Navbar from '../Navbar/Navbar';

// Import Image
import Menu from "../../images/menu.png";
import FB from "../../images/fb.png";
import IG from "../../images/ig.png";
import TW from "../../images/tw.png";
import Share from "../../images/share.png";
import Info from "../../images/info.png";
import Bubble from "../../images/bubble.png";

import { useHistory } from 'react-router-dom';

const Landing = () => {
    const history = useHistory();
    const user = useSelector((state) => state.user);

    const bookCar = () => {
        if(user.loggedin) {
            history.push('/location');
        }
        else {
            alert('Please log in first');
        }
    }
    return(
        <div className="hero">
            <Navbar/>
            <div className="content">
                <small>Welcome to </small>
            <h1>Gas ‘N’ GO!</h1>
            <button class="button" onClick={bookCar}>Book a car</button>
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