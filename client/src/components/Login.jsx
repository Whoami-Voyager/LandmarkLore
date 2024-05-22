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
            <div className='flex flex-row'>
                <h1>LandmarkLore</h1>
                <img src='/land.png' className='w-12' />
            </div>
            <div>
                <h2>Welcome to LandmarkLore</h2>
                <form onSubmit={(e) => logIn(e)}>
                    <div>
                        <h3>Username:</h3>
                        <input id="username"  className="input" autoComplete="username" onChange={(e) => setLoginUser(e.target.value)} />
                    </div>
                    <div>
                        <h3>Password:</h3>
                        <input type="password" className="input" id="password" autoComplete="current-password" onChange={(e) => setLoginPassword(e.target.value)} />
                    </div>
                    <button>Log In</button>
                </form>
                <h3>New to LandmarkLore? <Link to='/singup'>Singup</Link></h3>
            </div>
        </>
    )
}

export default Login