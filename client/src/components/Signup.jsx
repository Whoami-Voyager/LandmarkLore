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
            <div className='flex flex-row'>
                <h1>LandmarkLore</h1>
                <img src='/land.png' className='w-12' />
            </div>
            <div>
                <h2>Please type in information to create account</h2>
                <form onSubmit={(e) => singup(e)}>
                    <div>
                        <h3>Username:</h3>
                        <input id="username" className="input" autoComplete="off" onChange={(e) => setUserName(e.target.value)}/>
                    </div>
                    <div>
                        <h3>Email:</h3>
                        <input id="email" className="input" autoComplete="email" onChange={(e) => setUserEmail(e.target.value)}/>
                    </div>
                    {incorrectPassword
                        ?
                        <>
                            <h3>Password:</h3>
                            <input type="password" className="input" id="password" autoComplete="new-password" onChange={(e) => setUserPassword(e.target.value)}/>
                            <h3>Verify Password:</h3>
                            <input type="password" className="input" id="check-password" autoComplete="new-password" onChange={(e) => setCheckPassword(e.target.value)}/>
                            <button>Sign Up</button>
                        </>
                        :
                        <>
                            <h3>Password:</h3>
                            <input type="password" className="input-incorrect" id="incorrect-password" autoComplete="new-password" onChange={(e) => setUserPassword(e.target.value)}/>
                            <h4>Passwords are not the same or must be at least 8 characters in length. Please re-enter password</h4>
                            <h3>Verify Password:</h3>
                            <input type="password" className="input-incorrect" id="check-incorrect-password" autoComplete="new-password" onChange={(e) => setCheckPassword(e.target.value)}/>
                            <h4>Passwords are not the same or must be at least 8 characters in length. Please re-enter password</h4>
                        </>
                    }
                </form>
            </div>
        </>
    )
}

export default Singup