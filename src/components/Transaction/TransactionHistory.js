import React, { useState, useEffect } from 'react';
import './TransactionHistory.css';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Navbar from '../Navbar/Navbar';

import php from '../../api/php';

const weekday = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
const getTime = (time) => {
    const d = new Date();
    d.setTime(time);
    let day = weekday[d.getDay()];
    let date = d.getDate();
    let month = d.getMonth() + 1;
    let hour = d.getHours();
    let minute = d.getMinutes();
    let time_string = '';
    time_string = day + " " + date + "/" + month + " " + ('0' + hour).slice(-2) + ":" + ('0' + minute).slice(-2)
    return time_string;
}

const TransactionHistory = () => {
    const user = useSelector((state) => state.user);
    const [transactionlist, settransactionlist] = useState([]);

    useEffect(() => {
        const fetchUserTransactionList = async () => {
            const response = await php.post('/transactionlist.php', {
                userid: user.id,
            }).catch(err => console.log(err));
            console.log(response.data.list)
            settransactionlist(response?.data.list);
        }
        fetchUserTransactionList();
    }, [])

    return (
        <div className="hero-transaction">
            <Navbar/>
            <div className="list-box">
                <h1 style={{marginBottom: '30px'}}>Transaction History</h1>
                {transactionlist.map(data => (
                    <div className={`transaction-box ${data.status == 1 ? 'successful-transaction' : 'failed-transaction'}`}>
                        <div className="transaction-desc">
                            <h3 style={{fontWeight: 'bold'}}>{data.payment}</h3>
                            <text>{getTime(data.transactiontime)}</text>
                        </div>
                        <div className="transaction-desc">
                            <text style={{fontSize: 'larger'}}>Booking ID: {data.id}</text>
                            <text style={{fontSize: 'large'}}>RM{data.price}</text>
                        </div>
                        <h4 style={{fontWeight: 'bold'}}>{data.status == 1 ? 'SUCCESSFUL' : 'FAILED'}</h4>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TransactionHistory

