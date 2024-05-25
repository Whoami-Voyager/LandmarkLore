import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import EditPopup from "./EditPopup";

function MyPopup({ markers, marker, newIcon, setMarker }) {
    const [newCaption, setNewCaption] = useState('');
    const [isEditing, setIsEditing] = useState(false);

    function deleteMarker(e, id) {
        e.preventDefault();
        const updatedMarkers = marker.filter(marker => marker.id !== id);
        setMarker(updatedMarkers);
        fetch(`/api/marker/${id}`, {
            method: "DELETE"
        });
    }

    function editMarker(e, id) {
        e.preventDefault();
        fetch(`/api/marker/${id}`, {
            method: "PATCH",
            headers: {
                "Content-type": "Application/JSON"
            },
            body: JSON.stringify({ caption: newCaption })
        })
            .then(r => {
                if (r.ok) {
                    return r.json();
                } else {
                    alert("Something went wrong please try again");
                }
            })
            .then(data => {
                console.log(data);
                setIsEditing(false);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <Marker icon={newIcon} position={[markers.latitude, markers.longitude]}>
            <Popup>
                <h1 className='m-4 text-center'>{markers.user.username}</h1>
                <div className='flex-row'>
                    <button className='m-1' onClick={() => setIsEditing(true)}>Edit</button>
                    <button className='text-red-500 m-1' onClick={(e) => deleteMarker(e, markers.id)}>Delete</button>
                </div>
                <h2 className='m-2'>{markers.caption}</h2>
                {markers.image_url ? <img className='w-36 mx-auto' src={markers.image_url} alt="marker" /> : null}

                {isEditing && (
                    <EditPopup
                        newIcon={newIcon}
                        markers={markers}
                        newCaption={newCaption}
                        setNewCaption={setNewCaption}
                        editMarker={editMarker}
                        setIsEditing={setIsEditing}
                    />
                )}
            </Popup>
        </Marker>
    );
}

export default MyPopup;
