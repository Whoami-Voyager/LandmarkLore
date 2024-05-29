import { Popup } from "react-leaflet";

function EditPopup({ markers, setIsEditing, editMarker }) {

    return (
        <Popup position={[markers.latitude, markers.longitude]}>
            <div className="font-FallingSky">
                <button onClick={() => setIsEditing(false)}>⬅ Back</button>
                <form onSubmit={(e) => editMarker(e, markers.id)}>
                    <input name="caption" placeholder="Type new caption" autoComplete="off" />
                    <button type="submit">Save</button>
                </form>
            </div>
        </Popup>
    );
}

export default EditPopup;
