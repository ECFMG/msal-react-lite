# msal-react-lite

> A lightweight Higher Order Component to quickly add MSAL to any React Project

[![NPM](https://img.shields.io/npm/v/msal-react-lite.svg)](https://www.npmjs.com/package/msal-react-lite) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save msal-react-lite
```

## Usage

Add the appropriate environment variables:
  * REACT_APP_AAD_APP_CLIENTID
  * REACT_APP_AAD_DIRECTORY_TENANTID
  * REACT_APP_AAD_REDIRECT_URI
  * REACT_APP_AAD_SCOPES

(e.g you could use .env)

```typescript
REACT_APP_FUNCTION_ENDPOINT=http://localhost:7071
REACT_APP_AAD_APP_CLIENTID=<<YOUR CLIENT ID>>
REACT_APP_AAD_DIRECTORY_TENANTID=<<YOUR TENANT ID>>
REACT_APP_AAD_REDIRECT_URI=http://localhost:5000
REACT_APP_AAD_SCOPES=<<app ID URI>>/<<scope>>
```


Create a file for your MSAL Configuration:

(the following is a sample to help you get started you'll need to customize to your needs)


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

msal-react-lite uses standard MSAL coniguration options, refer to the doucmention links below for help on configuring to meet your specific needs.
  
  - msalConfig: [See Microsoft's Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md#configuration-options)
  - silentRequestConfig: [See Microsoft's Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/request-response-object.md#silentflowrequest)
  - endSessionRequestConfig: [See Microsoft's Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/logout.md#end-session-request)
  - loginRequestConfig (loginPopup only):[See Microsoft's Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/514cebb834fd913d350a538b1aaf3e2331ad2aea/lib/msal-browser/src/request/PopupRequest.ts)
  - redirectRequestConfig (loginRedirect only):[See Microsoft's Documentation](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/514cebb834fd913d350a538b1aaf3e2331ad2aea/lib/msal-browser/src/request/RedirectRequest.ts)
 

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

## Thanks

- Thanks to [Travis Fischer](https://github.com/transitive-bullshit) for [create-react-library](https://www.npmjs.com/package/create-react-library) which made the process of creating an NPM package quite painless.
