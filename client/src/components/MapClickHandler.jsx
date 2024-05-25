import { useState } from 'react';
import { Popup, useMapEvents } from 'react-leaflet';
import Axios from 'axios'

function MapClickHandler({ userId, marker, setMarker }) {
    const [location, setLocation] = useState(null);
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState('');
    const [showMarker, setShowMarker] = useState(false);

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
                setImage(r.data.url)
            });
    }

    function handleSubmit(e) {
        e.preventDefault()
        addNewMarker(e, caption, location, image)
        setShowMarker(false)
        setLocation(null)
        setCaption('')
        setImage('')
    }

    function addNewMarker(e, caption, location, image) {
        e.preventDefault();
        const newMarker = {
            caption: caption,
            image_url: image,
            latitude: location.lat,
            longitude: location.lng,
            user_id: userId
        };
        fetch('/api/markers', {
            method: "POST",
            headers: {
                "Content-type": "Application/JSON"
            },
            body: JSON.stringify(newMarker)
        })
            .then(r => {
                if (r.ok) {
                    return r.json();
                } else {
                    alert("Something went wrong please try again");
                    throw new Error("Failed to edit marker");
                }
            })
            .then(data => {
                setMarker([...marker, data]);
            })
            .catch(error => {
                console.error(error)
            });
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
