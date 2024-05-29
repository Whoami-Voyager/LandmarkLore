import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom"
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import { divIcon } from 'leaflet';
import MapClickHandler from './MapClickHandler';
import Popups from './Popups';
import "leaflet/dist/leaflet.css";

function Map({ userId, setUserId, userData, setUserData }) {
    const [marker, setMarker] = useState([])
    const [favorite, setFavorite] = useState([])
    const [friends, setFriends] = useState([])
    const [all, setAll] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        fetch('/api/markers')
            .then(r => r.json())
            .then(data => {
                setMarker(data);
                setAll(data)
            });
        fetch(`/api/user/${userId}`)
            .then(r => r.json())
            .then(data => {
                setUserData(data)
                const favs = data.favorites
                const favMark = favs.map((f) => f.marker)
                setFavorite(favMark)
                const friends = data.friends
                const frenMark = friends.map((mark) => mark.markers)
                setFriends(frenMark[0])
            })
    }, []);

    function filter(target) {
        if (target === "All") {
            setMarker(all);
        } else if (target === "Friends" && friends?.length > 0) {
            setMarker(friends);
        } else if (target === "Favorites" && favorite?.length > 0) {
            setMarker(favorite);
        } else {
            setMarker(all);
        }
    }

    const clusterIcon = (cluster) => {
        return new divIcon({
            html: `<div class='bg-grass text-white h-12 w-12 rounded-full flex justify-center items-center'>${cluster.getChildCount()}</div>`,
            className: "custom-marker-icon",
            iconSize: [30, 30],
        });
    };

    function handleLogout() {
        fetch('/api/login', {
            method: "DELETE"
        })
        navigate('/login')
        setUserId(0)
    }

    return (
        <>
            <div className='flex flex-row justify-between items-center font-FallingSky'>
                <div className='flex items-center'>
                    <h1 className='m-5 text-3xl'>LandmarkLore</h1>
                    <img src='/land.png' className='w-16' alt="LandmarkLore Logo" />
                </div>
                <div className='flex items-center'>
                    <button className='content-end bg-green-800 text-white font-bold py-2 px-4 rounded transform transition-all duration-300 hover:bg-green-600 hover:scale-105 hover:shadow-lg' onClick={() => handleLogout()}>Log Out</button>
                    <Link to='/profile' className='flex items-center ml-4'>
                        <h2 className='text-xl'>{userData.username}</h2>
                        <img src='Profile.webp' className='h-12 rounded-full m-4' alt="Profile" />
                    </Link>
                </div>
            </div>
            <div className='font-FallingSky flex flex-col items-center justify-center'>
                <div className='flex flex-row items-center'>
                    <h2>Select which markers you would like to see:</h2>
                    <select className='m-4 border-2 rounded-lg focus:outline-none' onChange={(e) => filter(e.target.value)}>
                        <option>All</option>
                        <option>Friends</option>
                        <option>Favorites</option>
                    </select>
                </div>
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
