import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";

function Popups({ marker, userId, deleteMarker }) {
    const [newCaption, setNewCaption] = useState('')
    const [editing, isEditing] = useState(false)

    const newIcon = new Icon({
        iconUrl: "/location.png",
        iconSize: [40, 40]
    });

    const popups = marker.map(markers => {
        if (markers.user_id === userId) {
            return (
                <Marker icon={newIcon} key={markers.id} position={[markers.latitude, markers.longitude]}>
                    <Popup key={markers.id}>
                        {editing
                            ?
                            <>
                                <button onClick={() => isEditing(false)}>⬅ Back</button>
                                <form onSubmit={(e) => editMarker(e, markers.id)}>
                                    <input placeholder='type in new caption...' value={newCaption} onChange={(e) => setNewCaption(e.target.value)} />
                                    <button type='submit'>Save</button>
                                </form>
                            </>
                            :
                            <>
                                <h1 className='m-4 text-center'>{markers.user.username}</h1>
                                <div className='flex-row'>
                                    <button className='m-1' onClick={() => isEditing(true)}>Edit</button>
                                    <button className='text-red-500 m-1' onClick={(e) => deleteMarker(e, markers.id)}>Delete</button>
                                </div>
                                <h2 className='m-2'>{markers.caption}</h2>
                                {markers.image_url ? <img className='w-36 mx-auto' src={markers.image_url} /> : <></>}
                            </>
                        }
                    </Popup>
                </Marker>
            )
        } else {
            return (
                <Marker icon={newIcon} key={markers.id} position={[markers.latitude, markers.longitude]} >
                    <Popup key={markers.id}>
                        <h1 className='m-4 text-center'>{markers.user.username}</h1>
                        <h2 className='m-2'>{markers.caption}</h2>
                        {markers.image_url ? <img className='w-36 mx-auto' src={markers.image_url} /> : <></>}
                    </Popup>
                </Marker>
            );
        }
    });

    return popups
}

export default Popups