import React, { useState } from 'react'
import './AddCar.css';

import Navbar from '../Navbar/Navbar';

import php from '../../api/php';

import { useHistory } from 'react-router-dom';

const AddCar = () => {
    const [name, setname] = useState("");
    const [plate, setplate] = useState("");
    const [imgUrl, setimgUrl] = useState("");
    const [petrol, setpetrol] = useState((""));
    const [rate, setrate] = useState("");
    const [distance, setdistance] = useState("");
    const [seat, setseat] = useState("");
    const [error, seterror] = useState(false);
    const history = useHistory();
    
    const addCar = () => {
        const postCar = async () => {
            const response = await php.post('/addcar.php', {
                name: name,
                plate: plate,
                petrol: petrol,
                rate: rate,
                seat: seat,
            }).catch(err => console.log(err))

            console.log(response?.data);
            if(!response?.data.error){
                history.push('/admin');
            }
            else{
                seterror(true);
            }
        }
        postCar();
    }
    return (
        <div className="hero-addcar">
            <Navbar/>
            <div className="list-input">
                <input type="text" placeholder="Car Name" required value={name} onChange={(e) => setname(e.target.value)}/>
                <input type="text" placeholder="Car Plate" required value={plate} onChange={(e) => setplate(e.target.value)}/>
                <input type="text" placeholder="Car Rate" required value={rate} onChange={(e) => setrate(e.target.value)}/>
                <input type="text" placeholder="Number of seats" required value={seat} onChange={(e) => setseat(e.target.value)}/>
                <input type="text" placeholder="Petrol" required value={petrol} onChange={(e) => setpetrol(e.target.value)}/>
                <div className="btn" onClick={addCar}>
                    Add Car
                </div>
                {error && <text>Car not add successfully</text>}
            </div>
        </div>
    )
}

export default AddCar;
