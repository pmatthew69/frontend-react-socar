import React, { useState, useEffect } from 'react'

import './Admin.css';

import php from '../../api/php';

import { useHistory } from 'react-router-dom';

import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const d = new Date();
const month= ["January","February","March","April","May","June","July",
            "August","September","October","November","December"];

const Admin = () => {
    const [totalprofit, settotalprofit] = useState(0);
    const [totalbookinghour, settotalbookinghour] = useState(0);
    const [totalorderpermonth, settotalorderpermonth] = useState(0);
    const history = useHistory();

    useEffect(() => {
        const fetchTotalProfit = async () => {
            const response = await php.get('/totalprofit.php')
                .catch(err => console.log(err));

            let profit = response?.data.totalprofit;
            let castedProfit = parseFloat(profit).toFixed(2);
            settotalprofit(castedProfit);
        }

        const fetchTotalBookingHour = async () => {
            const response = await php.get('/totalbookinghour.php')
                .catch(err => console.log(err));

            settotalbookinghour(response?.data.totalbookinghour);
        }

        const fetchTotalOrder = async () => {
            const response = await php.post('/totalOrderPerMonth.php', {
                month: d.getMonth()+1,
            }).catch(err => console.log(err));
            console.log(response.data.totalorderpermonth)
            settotalorderpermonth(response?.data.totalorderpermonth);
        }
        fetchTotalProfit();
        fetchTotalBookingHour();
        fetchTotalOrder();
    }, [])

    const handleChangePassword = () => {
        history.push('/resetadmin')
    }

    const handleBookingList = () => {
        history.push('/allbookinglist');
    }

    const handleAddCar = () => {
        history.push('/addcar');
    }

    return (
        <div className="hero-admin">
            <div className="admin-container">
                <h1>Welcome to Admin Page</h1>
                <div className="row">
                    <h5>Total Profit</h5>
                    <h5>RM{totalprofit}</h5>
                </div>
                <div className="row">
                    <h5>Total Booking Hour</h5>
                    <h5>{totalbookinghour} hours</h5>
                </div>
                <div className="row">
                    <h5>Total Order ({month[d.getMonth()]})</h5>
                    <h5>{totalorderpermonth}</h5>
                </div>
                <div className="btn" onClick={handleChangePassword}>
                    Change Admin Password
                </div>
                <div className="btn" onClick={handleBookingList}>
                    Booking List
                </div>
                <div className="btn" onClick={handleAddCar}>
                    Add Car
                </div>
                <KeyboardArrowRightIcon onClick={() => history.push('/')}/>
            </div>
        </div>
    )
}

export default Admin;
