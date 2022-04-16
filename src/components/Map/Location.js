import React, { useState, useEffect } from 'react';
import './Location.css';

import Navbar from '../Navbar/Navbar';

import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { storeLocation } from '../../redux/location/locationAction';

import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const Location = () => {
    const [address, setaddress] = useState(""); 
    const history = useHistory();
    const dispatch = useDispatch();
    
    const handleSearchableChange = async () => {
        await geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(({ lat, lng }) => {
                const location = {lat, lng, address};
                dispatch(storeLocation(location));
                history.push('/map');
            }
        );
    }
    
    useEffect(() => {
        handleSearchableChange();
    }, [address])

    return(
        <div className="hero-location">
            <Navbar/>
            <div className="search-container">
                <h1>
                    My Location
                </h1>
                <div style={{width: '50%', height: '30%'}}>
                    <GooglePlacesAutocomplete
                        apiKey={process.env.REACT_APP_GOOGLE_MAPS_APIKEY}
                        selectProps={{
                            isClearable: true,
                            value: address,
                            placeholder: 'Your location...',
                            onChange: (val) => {
                                setaddress(val.value.description);
                            }
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Location;