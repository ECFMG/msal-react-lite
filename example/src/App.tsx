import React from 'react'
import {useMsal} from 'msal-react-lite'

const App = () => {
  const {login,logout,getAuthToken,isLoggedIn} = useMsal()
  return (
    <div>
      MSAL Example:<br/>
      <br/>Login Status: {isLoggedIn?<span>Logged In</span> :<span>Logged Out</span>} <br/>
      <button onClick={() => login()}>LogIn</button>
      <button onClick={() => logout()}>LogOut</button>
      <button onClick={() => getAuthToken()}>Get Token</button>
    </div>
  )
}

export default App