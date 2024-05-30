import { useState, useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom"
import { MapContainer, TileLayer } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import { divIcon } from 'leaflet';
import MapClickHandler from './MapClickHandler';
import Popups from './Popups';
import "leaflet/dist/leaflet.css";

function Map({ userId, setUserId, userData, setUserData, address }) {
    const [marker, setMarker] = useState([])
    const [favorite, setFavorite] = useState([])
    const [friends, setFriends] = useState([])
    const [all, setAll] = useState([])
    const [location, setLocation] = useState([39.8283, -98.5795])

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
        fetch(`http://ip-api.com/json/${address}`)
            .then(r => r.json())
            .then(data => {
                const geo = [data.lat, data.lon]
                setLocation(geo)
            })
    }, [address]);

    function filter(target) {
        if (target === "All") {
            setMarker(all);
        } else if (target === "Friends") {
            if (friends === undefined) {
                alert("You have no friends. Please get some")
            } else {
                setMarker(friends);
            }
        } else if (target === "Favorites") {
            if (favorite.length === 0) {
                alert("No Favorited Markers yet.")
            } else {
                setMarker(favorite);
            }
        } else {
            setMarker(all);
        }
    }

    const clusterIcon = (cluster) => {
        return new divIcon({
            html: `<div class='bg-grass text-white h-10 w-10 rounded-full flex justify-center items-center'>${cluster.getChildCount()}</div>`,
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
                    <h1 className='m-5 text-3xl select-none'>LandmarkLore</h1>
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
                    <h2 className='select-none'>Select which markers you would like to see:</h2>
                    <select id='filter' className='m-4 border-2 rounded-lg focus:outline-none' onChange={(e) => filter(e.target.value)}>
                        <option>All</option>
                        <option>Friends</option>
                        <option>Favorites</option>
                    </select>
                </div>
            </div>
            <MapContainer center={location} zoom={5} maxBoundsVisible={[[90, -180], [-90, 180]]}>
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
