import React from 'react'
import {useMsal} from 'msal-react-lite'

const App = () => {
  const {login,logout,getAuthToken,getAuthResult,isLoggedIn} = useMsal()
  
  return (
    <div>
      MSAL Example:<br/>
      <br/>Login Status: {isLoggedIn?<span>Logged In</span> :<span>Logged Out</span>} <br/>
      <button onClick={() => login()}>LogIn</button>
      <button onClick={() => logout()}>LogOut</button>
      <button onClick={async () => await getAuthToken()}>Get Token</button>
      <button onClick={async () => console.log('AuthResult:',await getAuthResult())}>Get msal.AuthResult</button>
    </div>
  )
}

export default App