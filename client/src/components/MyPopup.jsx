import { Marker, Popup } from "react-leaflet";
import { useState } from "react";
import EditPopup from "./EditPopup";

function MyPopup({ markers, marker, newIcon, setMarker, favorite, setFavorite }) {
    const [editing, setIsEditing] = useState(false)

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
            body: JSON.stringify({ caption: e.target.caption.value })
        })
            .then(r => {
                if (r.ok) {
                    return r.json();
                } else {
                    alert("Something went wrong please try again");
                }
            })
            .then(data => {
                const updatedMarkers = marker.map(m =>
                    m.id === id ? { ...m, caption: data.caption } : m
                );
                setMarker(updatedMarkers);
                setIsEditing(false)
            })
            .catch(error => {
                console.error(error);
            });
    }

    function changeFavorite(e) {
        e.preventDefault()
        setFavorite(!favorite)
    }

    return (
        <>
            <Marker icon={newIcon} position={[markers.latitude, markers.longitude]}>
                <Popup>
                    <div className="font-FallingSky p-4">
                        <div className="flex flex-row">
                            <h1 className='text-xl'>{markers.user?.username}</h1>
                            {favorite
                                ? <img src='Star1.png' className='w-4 m-2' onClick={(e) => changeFavorite(e)} />
                                : <img src='Star2.png' className='w-4 m-2' onClick={(e) => changeFavorite(e)} />
                            }
                            <button className='m-1' onClick={() => setIsEditing(true)}>Edit</button>
                            <button className='m-1 text-red-500' onClick={(e) => deleteMarker(e, markers.id)}>Delete</button>
                        </div>
                        <p className='text-center mt-4 mb-2'>{markers.caption}</p>
                        {markers.image_url && <img src={markers.image_url} alt="marker" />}
                    </div>
                </Popup>
            </Marker>
            {editing
                ? <EditPopup markers={markers} editMarker={editMarker} setIsEditing={setIsEditing} />
                : <></>
            }
        </>
    );
}

export default MyPopup;
