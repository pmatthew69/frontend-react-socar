import React, { useState, useEffect } from 'react';
import './CheckOut.css';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import php from '../../api/php';

const weekday = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
const paymentMethod = ["ShopeePay", "GrabPay", "Touch n Go", "Online banking"];
const d = new Date();

const TitleComponent = ({ title }) => {
    return (
        <div className="border-bottom-bold option-row">
            <text>{title}</text>
        </div>
    )
}

const DescriptionComponent = ({ option, value }) => {
    return (
        <div className="border-bottom-light option-row">
            <text>{option}</text>
            <text>{value}</text>
        </div>
    )
}

const CheckOut = () => {
    const history = useHistory();
    const carSelected = useSelector((state) => state.car);
    const user = useSelector((state) => state.user);

    let rate = carSelected.rate;
    const r = rate.toFixed(2); 

    const [hour, sethour] = useState(1);
    const [payment, setpayment] = useState(0);
    const [price, setprice] = useState(carSelected.rate + 5);
    const [pickuptime, setpickuptime] = useState({});
    const [returntime, setreturntime] = useState({});
    const [agree, setagree] = useState(false);

    const increaseHour = () => {
        const time = {...returntime};
        d.setTime(d.getTime() + (1*60*60*1000));
        time.returnDay = weekday[d.getDay()];
        time.returnDate = d.getDate();
        time.returnMonth = d.getMonth() + 1;
        time.returnHour = d.getHours();
        time.returnMinute = d.getMinutes();
        time.returntimestamp = d.getTime();
        setreturntime(time);
        setprice((hour + 1) * carSelected.rate + 5);
        sethour(hour + 1);
    }

    const decreaseHour = () => {
        let h = hour - 1;
        if(h < 1){
            h = h + 1;
        }
        else {
            const time = {...returntime};
            d.setTime(d.getTime() - (1*60*60*1000));
            time.returnDay = weekday[d.getDay()];
            time.returnDate = d.getDate();
            time.returnMonth = d.getMonth() + 1;
            time.returnHour = d.getHours();
            time.returnMinute = d.getMinutes();
            time.returntimestamp = d.getTime();
            setreturntime(time);
        }
        setprice((h) * carSelected.rate + 5);
        sethour(h);
    }

    useEffect(() => {
        let pickupDay = weekday[d.getDay()];
        let pickupDate = d.getDate();
        let pickupMonth = d.getMonth() + 1;
        let pickupHour = d.getHours();
        let pickupMinute = d.getMinutes();
        let pickuptimestamp = d.getTime();
        setpickuptime({
            pickupDate,
            pickupMonth,
            pickupDay,
            pickupHour,
            pickupMinute,
            pickuptimestamp,
        })

        d.setTime(d.getTime() + (1*60*60*1000));
        let returnDay = weekday[d.getDay()];
        let returnDate = d.getDate();
        let returnMonth = d.getMonth() + 1;
        let returnHour = d.getHours();
        let returnMinute = d.getMinutes();
        let returntimestamp = d.getTime();
        setreturntime({
            returnDate,
            returnMonth,
            returnDay,
            returnHour,
            returnMinute,
            returntimestamp,
        })
    }, [])

    const handleBooking = () => {
        if(agree) {
            const postCarBookingInformation = async () => {
                const response = await php.post('/booking.php',
                {
                    userid: user.id,
                    carname: carSelected.name,
                    carplate: carSelected.plate,
                    seat: carSelected.seat,
                    petrol: carSelected.petrol,
                    rate: carSelected.rate,
                    distance: carSelected.distance,
                    bookinghour: hour,
                    totalprice: price,
                    pickuptime: pickuptime.pickuptimestamp,
                    returntime: returntime.returntimestamp,
                }).catch(err => console.log(err))

                const error = response?.data.error;
                if(!error){
                    const postTransactionInformation = async () => {
                        const transactionDate = new Date();
                        const response = await php.post('/transaction.php',
                        {
                            userid: user.id,
                            payment: paymentMethod[payment],
                            price: price,
                            transactiontime: transactionDate.getTime(),
                            status: 1,
                        }).catch(err => console.log(err))

                        const error = response?.data.error;
                        if(!error){
                            alert('Transaction successful. You had successfully book a car!');
                            history.push('/history');
                        }
                        else{
                            alert('Transaction failed.')
                        }
                    }
                    postTransactionInformation();
                }
                else{
                    alert('Failed to book a car!')
                }
            }
            postCarBookingInformation();
        }
        else {
            alert('Please read the T&C before checkout');
        }
    }


    return (
        <div className="hero-checkout">
            <div className="box">
                <h1 className="title">Confirm Reservation</h1>
                <div className="desc">
                    <TitleComponent title="Description"/>
                    <DescriptionComponent option="Vehicle Name" value={carSelected.name}/>
                    <DescriptionComponent option="Vehicle Number" value={carSelected.plate}/>
                    <DescriptionComponent option="Number of Seat" value={carSelected.seat}/>
                    <DescriptionComponent option="Petrol left" value={`${carSelected.petrol}%`}/>
                </div>  
                <div className="desc">
                    <TitleComponent title="Reservation fee"/>
                    <DescriptionComponent option="Rental rate" value={`RM${r}`}/>
                    <DescriptionComponent option="Super Collision Damage Waiver" value="RM5.00"/>
                    <div className="border-bottom-light option-row">
                        <text>Hours</text>
                        <div className="icon">
                            <div className="icon-wrapper" onClick={increaseHour}>
                                <AddIcon style={{color: 'white'}}/>
                            </div>
                            <text style={{marginLeft: '10px', marginRight: '10px'}}>{hour}</text>
                            <div className="icon-wrapper" onClick={decreaseHour}>
                                <RemoveIcon style={{color: 'white'}}/>
                            </div>
                        </div>
                    </div>
                    <div className="border-bottom-light option-row">
                        <text>Payment method</text>
                        <div className="payment">
                            <div className={`payment-box ${payment == 0 ? 'shopee' : ''}`} onClick={() => setpayment(0)}>
                                <text>ShopeePay</text>
                            </div>
                            <div className={`payment-box ${payment == 1 ? 'grab' : ''}`} onClick={() => setpayment(1)}>
                                <text>GrabPay</text>
                            </div>
                            <div className={`payment-box ${payment == 2 ? 'touch' : ''}`} onClick={() => setpayment(2)}>
                                <text>Touch n Go</text>
                            </div>
                            <div className={`payment-box ${payment == 3 ? 'banking' : ''}`} onClick={() => setpayment(3)}>
                                <text>Online banking</text>
                            </div>
                        </div>
                    </div>
                    <div className="border-bottom-light option-row">
                        <text>Extra  mileage fee</text>
                        <text className="lightext">Extra mileage fee will be charged separately after the return of the car</text>
                    </div>
                </div>
                <div className="desc">
                    <TitleComponent title="Rental Information"/>
                    <div className="border-bottom-light option-row">
                        <text>Pickup</text>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <text>{pickuptime.pickupDay}</text>
                            <text style={{marginLeft: '10px', marginRight: '10px'}}>{`${pickuptime.pickupDate}/${pickuptime.pickupMonth}`}</text>
                            <text style={{fontWeight: 'bold'}}>{`${('0' + pickuptime.pickupHour).slice(-2)}:${('0' + pickuptime.pickupMinute).slice(-2)}`}</text>
                        </div>
                    </div>
                    <div className="border-bottom-light option-row">
                        <text>Return</text>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                            <text>{returntime.returnDay}</text>
                            <text style={{marginLeft: '10px', marginRight: '10px'}}>{`${returntime.returnDate}/${returntime.returnMonth}`}</text>
                            <text style={{fontWeight: 'bold'}}>{`${('0' + returntime.returnHour).slice(-2)}:${('0' + returntime.returnMinute).slice(-2)}`}</text>
                        </div>
                    </div>
                    <div className="border-bottom-light option-row">
                        <text>Zone</text>
                        <text style={{fontWeight: 'bold'}}>Pulau Gadong</text>
                    </div>
                </div>
                <div className="desc">
                    <div className="border-bottom-bold option-row">
                        <text>Total Price</text>
                        <text style={{color: 'red'}}>{`RM${price}`}</text>
                    </div>
                </div>
                <div style={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                    <div>
                        <input type="checkbox" id="tc" name="tc" value="tc" onChange={(e) => setagree(!agree)}/>
                        <label style={{marginLeft: '10px'}} for="tc">I agree to the Gas n Go Terms & Conditions and Privacy Policy. Please extend if you are ruining late if not you might incur a penalty fee.</label>
                    </div>
                    <div className="booking-btn" onClick={handleBooking}>
                        <text>Book & Pay now</text>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckOut;