# msal-react-lite

> A lightweight Higher Order Component to quickly add MSAL to any React Project

[![NPM](https://img.shields.io/npm/v/msal-react-lite.svg)](https://www.npmjs.com/package/msal-react-lite) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save msal-react-lite
```

## Usage

Create a file for your MSAL Configuration:

```\src\config\msal-config.tsx```

```tsx
import {MsalProviderPopupConfig, MsalProviderRedirectConfig}  from 'msal-react-lite';
import * as msal from "@azure/msal-browser";

var clientId = process.env.REACT_APP_AAD_APP_CLIENTID??"missing-client-id";
var tenantId = process.env.REACT_APP_AAD_DIRECTORY_TENANTID??"missing-tenant-id";
var redirectUri = process.env.REACT_APP_AAD_REDIRECT_URI??"missing-redirect-uri";
var scopes = process.env.REACT_APP_AAD_SCOPES??"missing-scopes";

const commonAuthority = `https://login.microsoftonline.com/common`; //allows for anyone to register not just AAD accounts

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const tenantAuthority = `https://login.microsoftonline.com/${tenantId}`; // allows ONLY for Other AAD accounts to register

const appAuthority = commonAuthority; //to allow any user to sign up must choose commonAuthority

// eslint-disable-next-line @typescript-eslint/no-unused-vars
var msalProviderPopupConfig : MsalProviderPopupConfig =  {
  type:"popup",
  msalConfig: {
    auth: {
      clientId: clientId,
      authority: appAuthority,
      redirectUri: redirectUri, 
    }
  },
  silentRequestConfig: {
    scopes:[scopes]
  },
  endSessionRequestConfig:{
  },
  loginRequestConfig:{
    scopes:[scopes]
  }
}

var msalProviderRedirectConfig : MsalProviderRedirectConfig =  {
  type:"redirect",
  msalConfig: {
    auth: {
      clientId: clientId,
      authority: tenantAuthority,
      redirectUri: redirectUri, 
    }
  },
  silentRequestConfig: {
    scopes:[scopes]
  },
  endSessionRequestConfig:{
  },
  redirectRequestConfig: {
    scopes:[scopes]
  }
}

var msalProviderConfig = msalProviderRedirectConfig; 

export default msalProviderConfig;
```


```\src\index.tsx```

Add Imports

```tsx

/* .. other import statements .. */
import msalConfig from './config/msal-config'
import MsalProvider from 'msal-react-lite'


```


Wrap the `App` component with the `MsalProvider` component
```tsx
  <MsalProvider config={msalConfig}>
    <App />
  </MsalProvider>
```

```\src\App.tsx```

```tsx
import React from 'react'

/* .. add the import .. */
import {useMsal} from 'msal-react-lite'

const App = () => {
  /* .. reference methods and isLoggedIn property from context ..*/
  const {login,logout,getAuthToken,isLoggedIn} = useMsal()
  return (
    <div>
      MSAL Example:<br/>
      {/*  .. can selectively display content if logged in or not */}
      <br/>Login Status: {isLoggedIn?<span>Logged In</span> :<span>Logged Out</span>} <br/>

      {/*  .. can execute login/logout and getAuthToken methods */}
      <button onClick={() => login()}>LogIn</button>
      <button onClick={() => logout()}>LogOut</button>
      <button onClick={() => getAuthToken()}>Get Token</button>
    </div>
  )
}

export default App

```



## License

MIT © [ecfmg](https://github.com/ecfmg)
