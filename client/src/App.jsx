import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Signup from './components/Signup'
import Map from './components/Map'
import Profile from './components/Profile'
import Error from './components/Error'

function App() {
  const [userId, setUserId] = useState(0)
  const [userData, setUserData] = useState([])
  const [address, setAddress] = useState(null)

  useEffect(() => {
    fetch('/api/session')
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          console.log('please log in')
        }
      })
      .then(data => {
        if (data !== undefined) {
          setUserId(data['id']);
        }
      })
      .catch(error => {
        console.error('Session check failed:', error);
      });
    fetch('https://api.ipify.org?format=json')
      .then(r => r.json())
      .then(data => {
        setAddress(data.ip)
      })
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {userId === 0
          ? (
            <>
              <Route path='/login' element={<Login setUserId={setUserId} />} />
              <Route path='/signup' element={<Signup setUserId={setUserId} />} />
              <Route path='*' element={<Login setUserId={setUserId} />} />
            </>
          ) : (
            <>
              <Route path='/' element={<Map userId={userId} setUserData={setUserData} userData={userData} setUserId={setUserId} address={address} />} />
              <Route path='/profile' element={<Profile userId={userId} userData={userData} setUserData={setUserData} setUserId={setUserId} />} />
              <Route path='*' element={<Error />} />
            </>
          )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
