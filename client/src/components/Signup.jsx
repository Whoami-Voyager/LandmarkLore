import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Singup({ setUserId }) {
    const [userName, setUserName] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [checkPassword, setCheckPassword] = useState("")
    const [incorrectPassword, setIncorrectPassword] = useState(true)

    const navigate = useNavigate()

    function singup(e) {
        e.preventDefault()
        if (userPassword === checkPassword && userPassword.length >= 8) {
            setIncorrectPassword(true)
            fetch('/api/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    {
                        username: userName,
                        email: userEmail,
                        password: userPassword,
                        icon: "something"
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
                    setUserId(data.id)
                    setUserName("")
                    setUserEmail("")
                    setUserPassword("")
                    setCheckPassword("")
                    navigate(`/`)
                })
                .catch(error => {
                    alert("Something went wrong. Please try again.")
                    console.error('Login failed:', error)
                })
        }
        else {
            setIncorrectPassword(false)
        }
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="font-FallingSky justify-center text-center border-2 mx-32 w-2/5 p-12 rounded-3xl shadow-lg bg-white">
                    <div className='flex justify-center items-center'>
                        <h1 className="m-5 text-4xl">LandmarkLore</h1>
                        <img src='/land.png' className='w-16' />
                    </div>
                    <div>
                        <h2 className="m-8 text-xl">Please type in information to create account:</h2>
                        <form onSubmit={(e) => singup(e)}>
                            <div>
                                <h3 className="text-xl">Username:</h3>
                                <input id="username" className="input" autoComplete="off" onChange={(e) => setUserName(e.target.value)} />
                            </div>
                            <div>
                                <h3 className="text-xl">Email:</h3>
                                <input id="email" className="input" autoComplete="email" onChange={(e) => setUserEmail(e.target.value)} />
                            </div>
                            {incorrectPassword
                                ?
                                <>
                                    <div>
                                        <h3 className="text-xl">Password:</h3>
                                        <input type="password" className="input" id="password" autoComplete="new-password" onChange={(e) => setUserPassword(e.target.value)} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl">Verify Password:</h3>
                                        <input type="password" className="input" id="check-password" autoComplete="new-password" onChange={(e) => setCheckPassword(e.target.value)} />
                                    </div>
                                    <button className="bg-grass hover:bg-bush shadow-xl text-white font-bold py-2 px-4 m-6 rounded">Sign Up</button>
                                </>
                                :
                                <>
                                    <h3 className="text-xl">Password:</h3>
                                    <input type="password" className="input-incorrect" id="incorrect-password" autoComplete="new-password" onChange={(e) => setUserPassword(e.target.value)} />
                                    <h4 className="mb-8">Passwords are not the same or must be at least 8 characters in length. Please re-enter password</h4>
                                    <h3 className="text-xl">Verify Password:</h3>
                                    <input type="password" className="input-incorrect" id="check-incorrect-password" autoComplete="new-password" onChange={(e) => setCheckPassword(e.target.value)} />
                                    <h4 className="mb-8">Passwords are not the same or must be at least 8 characters in length. Please re-enter password</h4>
                                    <button className="bg-grass hover:bg-bush shadow-xl text-white font-bold py-2 px-4 m-6 rounded">Sign Up</button>
                                </>
                            }
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Singup