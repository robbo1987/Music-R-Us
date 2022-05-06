import React from 'react'
import {GoogleLogout} from 'react-google-login'


/**
 * COMPONENT
 */

const clientId = '662175514296-h4dm5bmcv28vvpcnenubrse9g470ccm7.apps.googleusercontent.com'

function googleLogout() {

  const onSuccess = ()  => {
    console.log('LOGOUT SUCCESSFUL')
  
  }
  return <div>
    <GoogleLogout
      clientId = {clientId}
      buttonText = "logout"
      onLogoutSuccess = {onSuccess}
     
    />
  </div>
}



export default (googleLogout);
