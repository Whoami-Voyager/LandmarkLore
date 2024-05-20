import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon } from 'leaflet';
import "leaflet/dist/leaflet.css";

function Map() {
    const [marker, setMarker] = useState([])

    useEffect(() => {
        fetch('/api/markers')
            .then(r => r.json())
            .then(data => {
                setMarker(data)
            })
    }, [])

    const newIcon = new Icon({
        iconUrl: "/location.png",
        iconSize: [40, 40]
    });

    const popups = marker.map(markers => {
        return <Marker icon={newIcon} key={markers.id} position={[markers.latitude, markers.longitude]}>
            <Popup key={markers.id}>
                <h1>{markers.user.username}</h1>
                <h2>{markers.caption}</h2>
            </Popup>
        </Marker>
    })

    const clusterIcon = (cluster) => {
        return new divIcon({
            html: `<div class='h-12 w-12 rounded-2xl flex justify-center items-center'>${cluster.getChildCount()}</div>`,
            className: "custom-marker-icon",
            iconSize: [33, 33]
        });
    };

    const addNewMarker = (event, caption) => {
        event.preventDefault()
        const newMarker = {
            caption: caption,
            image_url: "something",
            // latitude: latitude,
            // longitude: longitude,
            user_id: 2
        }
        console.log(newMarker)
    }
    
    function MapClickHandler() {
        const [popup, setPopup] = useState(null);
        const [caption, setCaption] = useState('')
        console.log(caption)

        useMapEvents({
            click(e) {
                console.log(e)
                setPopup(
                    <Popup position={e.latlng}>
                        <div>You clicked the map at {e.latlng.toString()}</div>
                        <h1>Create New Post:</h1>
                        <form onSubmit={(e) => addNewMarker(e, caption)}>
                            <input onChange={(e) => setCaption(e.target.value)} placeholder='caption' id='caption' />
                            <input type='file' accept='image/jpeg, image/png, image/bmp, image/tiff, image/webp' />
                            <button type='submit'>Add Post</button>
                        </form>
                    </Popup>
                );
            }
        });

        return popup;
    }

    return (
        <>
            <div className='flex flex-row'>
                <h1>LandmarkLore</h1>
                <img src='/land.png' className='w-12' />
            </div>
            <MapContainer center={[39.8283, -98.5795]} zoom={5} >
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
                <MapClickHandler />
            </MapContainer>
        </>
    );
}

export default Map;
