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

    return popups
}

export default Popups;
