import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import msalConfig from './config/msal-config'
import MsalProvider from 'msal-react-lite'

ReactDOM.render(
  <MsalProvider config={msalConfig}>
    <App />
  </MsalProvider>
, document.getElementById('root'))
