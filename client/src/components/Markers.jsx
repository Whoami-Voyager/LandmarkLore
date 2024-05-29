import { Marker, Popup } from "react-leaflet";

function Markers({ marker, newIcon }) {
    return (
        <Marker icon={newIcon} position={[marker?.latitude, marker?.longitude]}>
            <Popup>
                <div className="font-FallingSky">
                    {marker?.user?.username && (
                        <h1 className='m-4 text-center'>{marker.user.username}</h1>
                    )}
                    <h2 className='m-2'>{marker?.caption}</h2>
                    {marker?.image_url ? (
                        <img className='w-36 mx-auto' src={marker.image_url} alt="Marker" />
                    ) : <></>}
                </div>
            </Popup>
        </Marker>
    );
}

export default Markers;
