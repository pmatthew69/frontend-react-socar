import React, { useEffect } from 'react';
import './CarOption.css';

import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import LocationOnIcon from '@mui/icons-material/LocationOn';




const CarOption = ({ data, onClick }) => {
    // let rate = data.rate;
    // let r = rate.toFixed(2);

    return (
        <div className="boxes" onClick={onClick}>
            <div className="intro">
                <text className="name">{data.name}</text>
                <text className="plat">{data.plate}</text>
            </div>
            <img src="https://drive.google.com/uc?export=view&id=1dxHujTHMIsn7KqN4YdOCjttmEjmF6mY9"/>
            <div className="desc">  
                <div className="icon">
                    <LocalGasStationIcon color="primary"/>
                    <text>{data.petrol}%</text>
                    <LocationOnIcon color="primary"/>
                    <text>{data.distance}km</text>
                </div>
                <div className="cost">
                    <text className="price">RM{data.rate}</text>
                    <text>For 1 hour, 0 minute</text>
                    <text>{data.seat}-seater</text>
                </div>
            </div>
        </div>
    )
}

export default CarOption;