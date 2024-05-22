import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon } from 'leaflet';
import MapClickHandler from './MapClickHandler';
import "leaflet/dist/leaflet.css";

function Map({ userId }) {
    const [marker, setMarker] = useState([]);

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
                console.log(data)
            })
    }, [userId]);

    const newIcon = new Icon({
        iconUrl: "/location.png",
        iconSize: [40, 40]
    });

    const popups = marker.map(markers => {
        if (markers.user_id === userId) {
            return <Marker icon={newIcon} key={markers.id} position={[markers.latitude, markers.longitude]}>
                <Popup key={markers.id}>
                    <h1 className='m-4 text-center'>{markers.user.username}</h1>
                    <div className='flex-row'>
                        <button className='m-1'>Edit</button>
                        <button className='text-red-500 m-1' onClick={(e) => deleteMarker(e)}>Delete</button>
                    </div>
                    <h2 className='m-2'>{markers.caption}</h2>
                    {markers.image_url ? <img className='w-36 mx-auto' src={markers.image_url} /> : <></>}
                </Popup>
            </Marker>
        } else {
            return <Marker icon={newIcon} key={markers.id} position={[markers.latitude, markers.longitude]}>
                <Popup key={markers.id}>
                    <h1 className='m-4 text-center'>{markers.user.username}</h1>
                    <h2 className='m-2'>{markers.caption}</h2>
                    {markers.image_url ? <img className='w-36 mx-auto' src={markers.image_url} /> : <></>}
                </Popup>
            </Marker>
        }
    });

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
    }

    function addNewMarker(e, caption, location, image) {
        e.preventDefault();
        const newMarker = {
            caption: caption,
            image_url: image,
            latitude: location.lat,
            longitude: location.lng,
            user_id: userId
        };
        fetch('/api/markers', {
            method: "POST",
            headers: {
                "Content-type": "Application/JSON"
            },
            body: JSON.stringify(newMarker)
        })
            .then(r => r.json())
            .then(data => {
                setMarker([...marker, data]);
            })
            .catch(() => {
                alert("Something went wrong");
            });
    }

    return (
        <>
            <div className='flex flex-row'>
                <h1>LandmarkLore</h1>
                <img src='/land.png' className='w-12' />
                <button className='justify-self-end' onClick={() => handleLogout()}>Log Out</button>
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
                    {popups}
                </MarkerClusterGroup>
                <MapClickHandler addNewMarker={addNewMarker} />
            </MapContainer>
        </>
    );
}

export default Map;
