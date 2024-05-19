import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from "react-leaflet-cluster";
import { Icon, divIcon } from 'leaflet';
import "leaflet/dist/leaflet.css";

function Map() {
    const newIcon = new Icon({
        iconUrl: "/location.png",
        iconSize: [40, 40]
    });

    const clusterIcon = (cluster) => {
        return new divIcon({
            html: `<div class='h-12 w-12 rounded-2xl flex justify-center items-center'>${cluster.getChildCount()}</div>`,
            className: "custom-marker-icon",
            iconSize: [33, 33]
        });
    };

    function MapClickHandler() {
        const [popup, setPopup] = useState(null);

        useMapEvents({
            click(e) {
                setPopup(
                    <Popup position={e.latlng}>
                        <div>You clicked the map at {e.latlng.toString()}</div>
                    </Popup>
                );
            }
        });

        return popup;
    }

    return (
        <div className='flex flex-col'>
            <div className='flex flex-row'>
                <h1>LandmarkLore</h1>
                <img src='/land.png' className='w-12' />
            </div>
            <div className='justify-end'>
                <MapContainer center={[39.8283, -98.5795]} zoom={5}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <MarkerClusterGroup
                        chunkedLoading
                        iconCreateFunction={clusterIcon}
                    >
                        <Marker position={[39.7392, -104.9903]} icon={newIcon}>
                            <Popup>
                                <h2>Hello World</h2>
                            </Popup>
                        </Marker>
                    </MarkerClusterGroup>
                    <MapClickHandler />
                </MapContainer>
            </div>
        </div>
    );
}

export default Map;
