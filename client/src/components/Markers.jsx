import { Marker, Popup } from "react-leaflet";

function Markers({ marker, newIcon, favorite, setFavorite }) {

    function changeFavorite(e) {
        e.preventDefault()
        setFavorite(!favorite)
    }

    return (
        <Marker icon={newIcon} position={[marker?.latitude, marker?.longitude]}>
            <Popup>
                <div className="font-FallingSky">
                    <div className='flex flex-row'>
                        {marker?.user?.username && (
                            <h1 className='text-xl'>{marker.user.username}</h1>
                        )}
                        {favorite
                            ? <img src='Star1.png' className='w-4 m-2' onClick={(e) => changeFavorite(e)} />
                            : <img src='Star2.png' className='w-4 m-2' onClick={(e) => changeFavorite(e)} />
                        }
                    </div>
                    <h2 className='text-center my-2'>{marker?.caption}</h2>
                    {marker?.image_url ? (
                        <img className='w-36 mx-auto' src={marker.image_url} alt="Marker" />
                    ) : <></>}
                </div>
            </Popup>
        </Marker>
    );
}

export default Markers;
