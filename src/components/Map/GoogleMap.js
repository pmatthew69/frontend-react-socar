import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './GoogleMap.css';

import { storeCar } from '../../redux/car/carAction';
import { useHistory } from 'react-router-dom';

import CarOption from './CarOption';

import CarMarker from '../../images/map-car.png';
import MeMarker from '../../images/map-me.png';

import GoogleMapReact from 'google-map-react';      
import { getDistance } from 'geolib';

import php from '../../api/php';

const CurrentLocationComponent = () => <img src={MeMarker} width="60px" height="60px"/>;
const AnyReactComponent = () => <img src={CarMarker} width="50px" height="50px"/>;

const GoogleMap = () => {
    const currentLocation = useSelector((state) => state.location);
    const [location, setlocation] = useState(currentLocation);
    const [carlist, setcarlist] = useState([]);

    const history = useHistory();
    const dispatch = useDispatch();

    const defaultProps = {
        center: {
          lat: 59.95,
          lng: 30.33
        },
        zoom: 13
    };

    const getRandomDistance = ( max ) => {
        return Math.floor(Math.random() * max);
    }

    const getRandomLocation = ( lat, lng, distance = getRandomDistance(10000) ) => {
         // Convert to radians
        lat *= Math.PI / 180;
        lng *= Math.PI / 180;

        var radius;

        // Distance should be set in meters, negative for exact distance
        if (distance < 0) {
            // Exact distance
            radius = Math.abs(distance);
        } else {
            // Get uniformly-random distribution within peovided distance
            // http://stackoverflow.com/questions/5837572/generate-a-random-point-within-a-circle-uniformly
            radius = Math.random() + Math.random();
            radius = radius > 1 ? 2 - radius : radius;
            radius *= distance ? distance : 10000; // multiply by distance meters
        }

        // Convert radius from meters to degrees to radians
        // 111319.9 meters = one degree along the equator
        radius /= 111319.9;
        // Correction for the actual distance from equator is NOT needed here
        // radius *= Math.cos(lat);
        // Convert to radians
        radius *= Math.PI / 180;

        // Random angle
        var angle = Math.random() * Math.PI * 2;

        // Get a point {nLat,nLng} in a distance={radius} out on the {angle} radial from point {lat,lng}
        // From Aviation Formulary V1.46 By Ed Williams:
        // → http://williams.best.vwh.net/avform.htm#LL
        // → ftp://ftp.bartol.udel.edu/anita/amir/My_thesis/Figures4Thesis/CRC_plots/Aviation%20Formulary%20V1.46.pdf
        // → https://github.com/arildj78/AvCalc/blob/master/avform.txt
        // [section "Lat/lon given radial and distance"]
        var nLng,
            nLat = Math.asin( Math.sin(lat) * Math.cos(radius) + Math.cos(lat) * Math.sin(radius) * Math.cos(angle) );
        if (Math.cos(nLat) == 0) {
            nLng = lng;
        } else {
            nLng = (lng - Math.asin( Math.sin(angle) * Math.sin(radius) / Math.cos(nLat) ) + Math.PI) % (Math.PI * 2) - Math.PI
        }

        // Convert to degrees
        nLat *= 180 / Math.PI;
        nLng *= 180 / Math.PI;

        return [nLat, nLng];
    }

    useEffect(() => {
        const fetchAllCarList = async () => {
            const response = await php.get('/carlist.php')
                .catch(err => console.log(err));
            let data = response?.data.list;
            console.log(data)
            data.forEach(car => {
                const mark = getRandomLocation(location.lat, location.lng);
                const distance = getDistance(
                    { latitude: location.lat, longitude: location.lng },
                    { latitude: mark[0], longitude: mark[1] }
                ) / 1000;
                let d = distance.toFixed(2);
    
                car.lat = mark[0];
                car.lng = mark[1];
                car.distance = d;
            });
            setcarlist(data);
        }
        fetchAllCarList();
    }, [])

    const handleCarClick = (data) => {
        dispatch(storeCar(data));
        history.push('/checkout');
    }

    return(
        <>
        <div className="hero-map-screen">
            <div className="map-parent">
                <GoogleMapReact
                    key={new Date().getTime()}
                    bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_APIKEY }}
                    defaultCenter={location}
                    defaultZoom={defaultProps.zoom}
                >
                    <CurrentLocationComponent
                        lat={location.lat}
                        lng={location.lng}
                    />
                    {carlist.map((car) => (
                        <AnyReactComponent
                            lat={car.lat}
                            lng={car.lng}
                        />
                    ))}              
                </GoogleMapReact>
            </div>
            <div className="option">
                {carlist.map((data) => (
                    <CarOption data={data} onClick={() => handleCarClick(data)} />
                ))}
            </div>
        </div>
        </>
    )
}

export default GoogleMap;