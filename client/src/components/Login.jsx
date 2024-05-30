import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Login({ setUserId }) {
    const [loginUser, setLoginUser] = useState('')
    const [loginPassword, setLoginPassword] = useState('')

    const navigate = useNavigate()

    function logIn(e) {
        e.preventDefault()
        fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(
                {
                    username: loginUser,
                    password: loginPassword
                }
            )
        })
            .then(r => {
                if (r.ok) {
                    return r.json()
                }
                else {
                    alert("Not Valid Login")
                    return undefined
                }
            })
            .then(data => {
                if (data === undefined) {
                    alert("Something went wrong. Please try again.")
                }
                else {
                    setUserId(data.id)
                    setLoginPassword("")
                    setLoginUser("")
                    navigate(`/`)
                }
            })
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="font-FallingSky justify-center text-center border-2 mx-32 w-2/5 p-12 rounded-3xl shadow-lg bg-white">
                    <div className='flex justify-center items-center'>
                        <h1 className='m-5 text-4xl select-none'>LandmarkLore</h1>
                        <img src='/land.png' className='w-16' alt="LandmarkLore Logo" />
                    </div>
                    <form onSubmit={(e) => logIn(e)}>
                        <div>
                            <h2 className="text-xl select-none">Username:</h2>
                            <input id="username" className="input" autoComplete="username" onChange={(e) => setLoginUser(e.target.value)} />
                        </div>
                        <div>
                            <h2 className="text-xl select-none">Password:</h2>
                            <input type="password" className="input" id="password" autoComplete="current-password" onChange={(e) => setLoginPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="bg-grass hover:bg-bush shadow-xl text-white font-bold py-2 px-4 m-6 rounded">Log In</button>
                    </form>
                    <h3 className="mb-8 select-none">New to LandmarkLore? <Link to='/signup' className="border-b-2 border-grass hover:border-bush text-grass hover:text-bush">Signup</Link></h3>
                </div>
            </div>
        </>
    )
}

export default Login