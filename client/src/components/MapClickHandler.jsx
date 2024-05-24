import { useState } from 'react';
import { Popup, useMapEvents } from 'react-leaflet';
import Axios from 'axios'

function MapClickHandler({ addNewMarker, showMarker, setShowMarker }) {
    const [location, setLocation] = useState(null);
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState('');

    useMapEvents({
        click(e) {
            setLocation(e.latlng);
            setShowMarker(!showMarker);
        }
    });

    function uploadImage(files) {
        const formData = new FormData();
        formData.append('file', files[0]);
        formData.append('upload_preset', 'kapaxa43');

        Axios.post('https://api.cloudinary.com/v1_1/dbbrrtr9t/image/upload', formData)
            .then(r => {
                setImage(r.data.url);
            });
    }

    function handleSubmit(e){
        e.preventDefault()
        addNewMarker(e, caption, location, image)
        setShowMarker(false)
        setLocation(null)
        setCaption('')
        setImage('')
    }

    return (
        <>
            {
                showMarker && location &&
                <Popup position={location}>
                    <h1>Create New Post:</h1>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input onChange={(e) => setCaption(e.target.value)} placeholder='caption' autoComplete='off' id='caption' />
                        <input type='file' accept='image/jpeg, image/png, image/bmp, image/tiff, image/webp' onChange={(e) => uploadImage(e.target.files)} />
                        <button type='submit'>Add Post</button>
                    </form>
                </Popup>
            }
        </>
    );
}

export default MapClickHandler
