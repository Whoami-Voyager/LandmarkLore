import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import { divIcon } from 'leaflet';
import MapClickHandler from './MapClickHandler';
import Popups from './Popups';
import "leaflet/dist/leaflet.css";

function Map({ userId, setUserId }) {
    const [marker, setMarker] = useState([]);
    const [userData, setUserData] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetch('/api/markers')
            .then(r => r.json())
            .then(data => {
                setMarker(data);
            });
        fetch(`/api/user/${userId}`)
            .then(r => r.json())
            .then(data => {
                setUserData(data)
            })
    }, [userId]);

    console.log(userData)

    const clusterIcon = (cluster) => new divIcon({
        html: `<div class='h-12 w-12 rounded-2xl flex justify-center items-center'>${cluster.getChildCount()}</div>`,
        className: "custom-marker-icon",
        iconSize: [33, 33]
    });

    function handleLogout() {
        fetch('/api/login', {
            method: "DELETE"
        })
        navigate('/login')
        setUserId(0)
    }

    return (
        <>
            <div className='flex flex-row'>
                <h1>LandmarkLore</h1>
                <img src='/land.png' className='w-12' />
                <button className='content-end' onClick={() => handleLogout()}>Log Out</button>
            </div>
            <MapContainer center={[39.8283, -98.5795]} zoom={5}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                />
                <MarkerClusterGroup
                    chunkedLoading
                    iconCreateFunction={clusterIcon}
                >
                    <Popups marker={marker} userId={userId} setMarker={setMarker} />
                </MarkerClusterGroup>
                <MapClickHandler userId={userId} marker={marker} setMarker={setMarker} />
            </MapContainer>
        </>
    );
}

export default Map;
