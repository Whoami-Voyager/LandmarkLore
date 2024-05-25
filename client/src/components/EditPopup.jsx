import { Marker, Popup } from "react-leaflet";

function EditPopup({ markers, newCaption, setNewCaption, editMarker, setIsEditing, newIcon }) {
    return <Marker position={[markers.latitude, markers.longitude]} icon={newIcon}>
        <Popup>
            <button onClick={() => setIsEditing(false)}>⬅ Back</button>
            <form onSubmit={(e) => editMarker(e, editingMarker.id)}>
                <input placeholder="Type new caption" value={newCaption} onChange={(e) => setNewCaption(e.target.value)} />
                <button type="submit">Save</button>
            </form>
        </Popup>
    </Marker>
}

export default EditPopup