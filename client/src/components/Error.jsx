import { Link } from "react-router-dom"

function Error() {
    return (
        <>
            <div className="my-6">
                <Link to="/" className="border-2 text-center border-gray-400 rounded-lg p-2 m-9 font-Inter hover:border-gray-900">⬅ Back to Landmark</Link>
            </div>
            <h1 className="text-center m-8 text-3xl">Oops, looks like you got to the error page. Anyway, here's a cool video:</h1>
            <iframe
                width="966"
                height="543"
                className="mx-auto"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Rick Astley - Never Gonna Give You Up (Official Music Video)"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            />
        </>
    )
}

export default Error