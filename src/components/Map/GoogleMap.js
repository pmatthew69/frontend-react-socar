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

import Axia from '../../images/axia.jpeg';
import HondaCity from '../../images/hondacity.jpeg';
import HondaHRV from '../../images/hondahrv.jpeg';


const generateRandomPlat = () => {
    let plat = "";
    var characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;

    for(var i=0; i<3; i++) {
        plat += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    for(var i=0; i<4; i++) {
        plat += Math.floor((Math.random() * 9) + 1).toString();
    }
    return plat;
}

const carData = [
    {
        name: "AXIA",
        plate: generateRandomPlat(),
        img: Axia,
        rate: 8,
        seat: 4,
        petrol: 99,
        distance: 0.0,
        origin: "",
    },
    {
        name: "HONDA CITY",
        plate: generateRandomPlat(),
        img: HondaCity,
        rate: 14.9,
        seat: 4,
        petrol: 97,
        distance: 0.0,
        origin: "",
    },
    {
        name: "HONDA HR-V",
        plate: generateRandomPlat(),
        img: HondaHRV,
        rate: 17,
        seat: 4,
        petrol: 89,
        distance: 0.0,
        origin: "",
    },
    {
        name: "BMW 330e HYBRID",
        plate: generateRandomPlat(),
        img: HondaHRV,
        rate: 42,
        seat: 4,
        petrol: 86,
        distance: 0.0,
        origin: "",
    },
    {
        name: "Volkswagen Passat",
        plate: generateRandomPlat(),
        img: HondaHRV,
        rate: 21.9,
        seat: 4,
        petrol: 89,
        distance: 0.0,
        origin: "",
    },
    {
        name: "Perodua Bezza",
        plate: generateRandomPlat(),
        img: HondaHRV,
        rate: 10,
        seat: 4,
        petrol: 96,
        distance: 0.0,
        origin: "",
    },
    {
        name: "Toyota NEW VIOS",
        plate: generateRandomPlat(),
        img: HondaHRV,
        rate: 13.9,
        seat: 4,
        petrol: 94,
        distance: 0.0,
        origin: "",
    },
]

const CurrentLocationComponent = () => <img src={MeMarker} width="60px" height="60px"/>;
const AnyReactComponent = () => <img src={CarMarker} width="50px" height="50px"/>;

const GoogleMap = () => {
    const currentLocation = useSelector((state) => state.location);
    const [location, setlocation] = useState(currentLocation);
    const [marker1, setmarker1] = useState({});
    const [marker2, setmarker2] = useState({});
    const [marker3, setmarker3] = useState({});
    const [marker4, setmarker4] = useState({});
    const [marker5, setmarker5] = useState({});
    const [marker6, setmarker6] = useState({});
    const [marker7, setmarker7] = useState({});

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
        const mark1 = getRandomLocation(location.lat, location.lng);
        const mark2 = getRandomLocation(location.lat, location.lng);
        const mark3 = getRandomLocation(location.lat, location.lng);
        const mark4 = getRandomLocation(location.lat, location.lng);
        const mark5 = getRandomLocation(location.lat, location.lng);
        const mark6 = getRandomLocation(location.lat, location.lng);
        const mark7 = getRandomLocation(location.lat, location.lng);

        setmarker1({
            lat: mark1[0],
            lng: mark1[1],
        });
        setmarker2({
            lat: mark2[0],
            lng: mark2[1],
        });
        setmarker3({
            lat: mark3[0],
            lng: mark3[1],
        });
        setmarker4({
            lat: mark4[0],
            lng: mark4[1],
        });
        setmarker5({
            lat: mark5[0],
            lng: mark5[1],
        });
        setmarker6({
            lat: mark6[0],
            lng: mark6[1],
        });
        setmarker7({
            lat: mark7[0],
            lng: mark7[1],
        });

        const distanceToMark1 = getDistance(
            { latitude: location.lat, longitude: location.lng },
            { latitude: mark1[0], longitude: mark1[1] }
        ) / 1000;
        const distanceToMark2 = getDistance(
            { latitude: location.lat, longitude: location.lng },
            { latitude: mark2[0], longitude: mark2[1] }
        ) / 1000;
        const distanceToMark3 = getDistance(
            { latitude: location.lat, longitude: location.lng },
            { latitude: mark3[0], longitude: mark3[1] }
        ) / 1000;
        const distanceToMark4 = getDistance(
            { latitude: location.lat, longitude: location.lng },
            { latitude: mark4[0], longitude: mark4[1] }
        ) / 1000;
        const distanceToMark5 = getDistance(
            { latitude: location.lat, longitude: location.lng },
            { latitude: mark5[0], longitude: mark5[1] }
        ) / 1000;
        const distanceToMark6 = getDistance(
            { latitude: location.lat, longitude: location.lng },
            { latitude: mark6[0], longitude: mark6[1] }
        ) / 1000;
        const distanceToMark7 = getDistance(
            { latitude: location.lat, longitude: location.lng },
            { latitude: mark7[0], longitude: mark7[1] }
        ) / 1000;
        
        let d1 = distanceToMark1.toFixed(2);
        let d2 = distanceToMark2.toFixed(2);
        let d3 = distanceToMark3.toFixed(2);
        let d4 = distanceToMark4.toFixed(2);
        let d5 = distanceToMark5.toFixed(2);
        let d6 = distanceToMark6.toFixed(2);
        let d7 = distanceToMark7.toFixed(2);

        carData[0].distance = d1;
        carData[1].distance = d2;
        carData[2].distance = d3;
        carData[3].distance = d4;
        carData[4].distance = d5;
        carData[5].distance = d6;
        carData[6].distance = d7;
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
                    <AnyReactComponent
                        lat={marker1.lat}
                        lng={marker1.lng}
                    />
                    <AnyReactComponent
                        lat={marker2.lat}
                        lng={marker2.lng}
                    />
                    <AnyReactComponent
                        lat={marker3.lat}
                        lng={marker3.lng}
                    />
                    <AnyReactComponent
                        lat={marker4.lat}
                        lng={marker4.lng}
                    />
                    <AnyReactComponent
                        lat={marker5.lat}
                        lng={marker5.lng}
                    />
                    <AnyReactComponent
                        lat={marker6.lat}
                        lng={marker6.lng}
                    />
                    <AnyReactComponent
                        lat={marker7.lat}
                        lng={marker7.lng}
                    />
                </GoogleMapReact>
            </div>
            <div className="option">
                {carData.map((data) => (
                    <CarOption data={data} onClick={() => handleCarClick(data)} />
                ))}
            </div>
        </div>
        </>
    )
}

export default GoogleMap;