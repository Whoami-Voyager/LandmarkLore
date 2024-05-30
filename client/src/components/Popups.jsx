import { useState } from "react";
import { Icon } from "leaflet";
import Markers from "./Markers";
import MyPopup from "./MyPopup";

function Popups({ marker, userId, setMarker }) {
    const [favorite, setFavorite] = useState(false)

    const newIcon = new Icon({
        iconUrl: "/location.png",
        iconSize: [40, 40]
    });

    const popups = marker.map(markers => {
        if (markers.user_id === userId) {
            return <MyPopup key={markers.id} markers={markers} marker={marker} newIcon={newIcon} setMarker={setMarker} favorite={favorite} setFavorite={setFavorite} />
        } else {
            return <Markers key={markers.id} marker={markers} newIcon={newIcon} favorite={favorite} setFavorite={setFavorite} />
        }
    });

    return popups
}

export default Popups;
