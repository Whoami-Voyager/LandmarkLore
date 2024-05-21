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

    function addNewMarker(e, caption, location) {
        e.preventDefault()
        const newMarker = {
            caption: caption,
            image_url: "something",
            latitude: location.lat,
            longitude: location.lng,
            user_id: 2
        }
        console.log(newMarker)
        fetch('/api/markers', {
            method: "POST",
            headers: {
                "Content-type": "Application/JSON"
            },
            body: JSON.stringify(newMarker)
        })
            .then(r => r.json())
            .then(data => {
                const newMarkers = [...marker, data]
                setMarker(newMarkers)
            })
            .catch(() => {
                alert("Something went wrong")
            })
    }

    function MapClickHandler() {
        const [location, setLocation] = useState(null)
        const [caption, setCaption] = useState('')
        const [image, setImage] = useState(null)
        const [showMarker, setShowMarker] = useState(false)

        useMapEvents({
            click(e) {
                setLocation(e.latlng)
                setShowMarker((showMarker) => !showMarker)
            }
        })

        return (
            <>
                {
                    showMarker
                        ?
                        <Popup position={location} >
                            <h1>Create New Post:</h1>
                            <form onSubmit={(e) => addNewMarker(e, caption, location)}>
                                <input onChange={(e) => setCaption(e.target.value)} placeholder='caption' autoComplete='off' id='caption' />
                                <input type='file' accept='image/jpeg, image/png, image/bmp, image/tiff, image/webp' onChange={(e) => setImage(e.target.files)} />
                                <button type='submit'>Add Post</button>
                            </form>
                        </Popup>
                        :
                        <></>
                }
            </>
        )
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
