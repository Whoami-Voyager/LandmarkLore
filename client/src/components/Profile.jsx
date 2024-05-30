import { useEffect } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { MapContainer, TileLayer } from 'react-leaflet';
import { Icon, divIcon } from "leaflet";
import MarkerClusterGroup from 'react-leaflet-cluster';
import Markers from './Markers';

function Profile({ userId, userData, setUserData, setUserId }) {
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`/api/user/${userId}`)
            .then(r => r.json())
            .then(data => {
                setUserData(data);
            });
    }, [userId, setUserData]);

    function handleLogout() {
        fetch('/api/login', {
            method: "DELETE"
        }).then(() => {
            setUserId(0);
            navigate('/login');
        });
    }

    const newIcon = new Icon({
        iconUrl: "/location.png",
        iconSize: [40, 40]
    });

    const clusterIcon = (cluster) => new divIcon({
        html: `<div class='h-12 w-12 rounded-2xl flex justify-center items-center bg-red-600 text-white'>${cluster.getChildCount()}</div>`,
        className: "custom-marker-icon",
        iconSize: [33, 33]
    });

    const userPopup = userData.markers?.map((marker) => (
        <Markers key={marker.id} marker={marker} newIcon={newIcon} />
    ));

    function deleteUsr(e) {
        e.preventDefault()
        handleLogout()
        fetch(`/api/user/${userId}`, {
            method: "DELETE"
        })
    }

    return (
        <>
            <div className='flex flex-row items-center font-FallingSky'>
                <Link to='/' className='m-6 text-2xl'>⬅ Back</Link>
                <div className="flex-grow"></div>
                <button onClick={handleLogout} className="bg-green-800 text-white font-bold py-2 px-4 rounded transform transition-all duration-300 hover:bg-green-600 hover:scale-105 hover:shadow-lg m-8">
                    Logout
                </button>
            </div>
            <div className="bg-white shadow rounded-lg p-6 font-FallingSky">
                <div className="flex flex-col items-center">
                    <div className="flex items-center">
                        <img src='/Profile.webp' className='h-32 rounded-full m-4' alt="Profile" />
                        <div className='flex flex-col m-6'>
                            <h1 className="text-3xl mb-4 font-semibold">{userData.username}</h1>
                            <h2 className="text-gray-600 m-1">Amount of Markers posted: {userData.markers?.length}</h2>
                            <h2 className="text-gray-600 m-1">This user has {userData.friends?.length} friends</h2>
                            <h2 className="text-gray-600 m-1">This user has favorited {userData.favorites?.length} markers</h2>
                        </div>
                    </div>
                    <div className="flex justify-center w-full">
                        <button className='mt-4 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={(e) => deleteUsr(e)}>
                            ⚠️ Delete User ⚠️
                        </button>
                    </div>
                </div>
            </div>
            <h1 className="mt-8 text-2xl font-semibold text-center font-FallingSky">Markers {userData.username} has posted:</h1>
            <div className='m-12 rounded-lg'>
                <MapContainer center={[39.8283, -98.5795]} zoom={5}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <MarkerClusterGroup chunkedLoading iconCreateFunction={clusterIcon}>
                        {userPopup}
                    </MarkerClusterGroup>
                </MapContainer>
            </div>
        </>
    );
}

export default Profile;
