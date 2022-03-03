import React, { useState, useEffect } from 'react';
import './History.css';

import Navbar from '../Navbar/Navbar';

import php from '../../api/php';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Axia from '../../images/axia.jpeg';
import HondaCity from '../../images/hondacity.jpeg';
import HondaHRV from '../../images/hondahrv.jpeg';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const getImage = (carname) => {
    switch (carname) {
        case "AXIA":
            return Axia;
        case "HONDA CITY":
            return HondaCity;
        case "HONDA HR-V":
            return HondaHRV;
        default:
            return null;
    }
}


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

const DescriptionComponent = ({ option, value }) => {
    return (
        <div className="border-bottom-light option-row">
            <text>{option}</text>
            <text>{value}</text>
        </div>
    )
}


const History = () => {
    const user = useSelector((state) => state.user);
    const [bookinglist, setbookinglist] = useState([]);
    const [viewingdetails, setviewingdetails] = useState(false);
    const [details, setdetails] = useState({});
    const history = useHistory();

    useEffect(() => {
        const fetchUserBookingList = async () => {
            const response = await php.post('/bookinglist.php', {
                userid: user.id,
            }).catch(err => console.log(err));
            console.log(response.data.list)
            setbookinglist(response?.data.list);
        }
        fetchUserBookingList();
    }, [])
    
    return (
        <div className="hero-history">
            <Navbar/>
            <div className="list-box">
                <h1 style={{marginBottom: '30px'}}>Booking History</h1>
               {!viewingdetails &&
                    bookinglist.map(data => (
                        <div className="booking-box">
                            <img src={getImage(data.carname)} alt={data.carname}/>
                            <div className="booking-desc">
                                <h3>{data.carname}</h3>
                                <text>{data.carplate}</text>
                                <text>{`${data.seat}-seater`}</text>
                                <text>{`${data.distance}km`}</text>
                                <div 
                                    className="view-details-btn" 
                                    onClick={() => {
                                        setdetails(data);
                                        setviewingdetails(true);
                                    }}
                                >
                                    <text>View Details</text>
                                </div>
                            </div>
                            <h4>{data.returned == 1 ? 'RETURNED' : 'HOLDING'}</h4>
                        </div>
                    ))
                }
                {viewingdetails && 
                    <div className="details">
                        <img src={getImage(details.carname)} alt={details.carname}/>
                        <DescriptionComponent option="Booking ID" value={details.id}/>
                        <DescriptionComponent option="Vehicle Name" value={details.carname}/>
                        <DescriptionComponent option="Vehicle Number" value={details.carplate}/>
                        <DescriptionComponent option="Number of Seat" value={details.seat}/>
                        <DescriptionComponent option="Petrol left" value={`${details.petrol}%`}/>
                        <DescriptionComponent option="Distance" value={`${details.distance}km`}/>
                        <DescriptionComponent option="Booking durations" value={`${details.bookinghour} hours`}/>
                        <DescriptionComponent option="Total price" value={`RM${details.totalprice}`}/>
                        <DescriptionComponent option="PICKUP TIME" value={getTime(details.pickuptime)}/>
                        <DescriptionComponent option="RETURN TIME" value={getTime(details.returntime)}/>
                        <DescriptionComponent option="Status" value={details.returned == 1 ? "RETURNED": "HOLDING"}/>
                        <ArrowBackIcon onClick={() => setviewingdetails(false)} style={{cursor: 'pointer'}}/>
                    </div>
                }
            </div>
        </div>
    )
}

export default History;