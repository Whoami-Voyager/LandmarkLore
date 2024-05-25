import { Icon } from "leaflet";
import Markers from "./Markers";
import MyPopup from "./MyPopup";

function Popups({ marker, userId, setMarker }) {

    const newIcon = new Icon({
        iconUrl: "/location.png",
        iconSize: [40, 40]
    });

    const popups = marker.map(markers => {
        if (markers.user_id === userId) {
            return <MyPopup key={markers.id} markers={markers} marker={marker} newIcon={newIcon} setMarker={setMarker} />
        } else {
            return <Markers key={markers.id} marker={markers} newIcon={newIcon} />
        }
    });

    console.log(popups)

    return (
        <>
            {popups}
            {/* <Popup position={[editingMarker.latitude, editingMarker.longitude]}>
                    <button onClick={() => setEditingMarker(null)}>⬅ Back</button>
                    <form onSubmit={(e) => editMarker(e, editingMarker.id)}>
                        <input placeholder="Type new caption" value={newCaption} onChange={(e) => setNewCaption(e.target.value)} />
                        <button type="submit">Save</button>
                    </form>
                </Popup> */}
        </>
    );
}

export default Popups;
