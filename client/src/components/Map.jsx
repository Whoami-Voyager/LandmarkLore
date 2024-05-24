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
    const [showMarker, setShowMarker] = useState(false);

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

    function deleteMarker(e, id) {
        e.preventDefault()
        const updatedMarkers = marker.filter(marker => marker.id !== id);
        setMarker(updatedMarkers);
        fetch(`/api/marker/${id}`, {
            method: "DELETE"
        })
    }

    function editMarker(e, id) {
        e.preventDefault()
        setShowMarker(true)
        fetch(`/api/marker/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "Application/JSON"
            },
            body: JSON.stringify(newCaption)
                .then(r => {
                    if (r.ok) {
                        isEditing(false)
                        r.json()
                    } else {
                        alert("Something went wrong please try again")
                    }
                })
                .then(data => {
                    console.log(data)
                })
        })
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
                    <Popups marker={marker} userId={userId} deleteMarker={deleteMarker} />
                </MarkerClusterGroup>
                <MapClickHandler addNewMarker={addNewMarker} showMarker={showMarker} setShowMarker={setShowMarker} editMarker={editMarker}/>
            </MapContainer>
        </>
    );
}

export default Map;
