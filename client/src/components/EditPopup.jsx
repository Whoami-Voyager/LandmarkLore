import { useState } from "react";
import { Popup } from "react-leaflet";

function EditPopup({ markers, setIsEditing, handleCaptionChange, editMarker }) {
    const [newCaption, setNewCaption] = useState('')
    console.log("E")

    return (
        <Popup position={[markers.latitude, markers.longitude]}>
            {/* <button onClick={() => setIsEditing(false)}>⬅ Back</button> */}
            <form onSubmit={(e) => console.log(e)}>
                <input 
                    placeholder="Type new caption"
                    onChange={(e) => console.log(e.target.value)}
                />
                <button type="submit">Save</button>
            </form>
        </Popup>
    );
}

export default EditPopup;
