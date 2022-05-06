import React from 'react'
import {GoogleLogin} from 'react-google-login'


/**
 * COMPONENT
 */

const clientId = '662175514296-h4dm5bmcv28vvpcnenubrse9g470ccm7.apps.googleusercontent.com'

function googleLogin() {

  const onSuccess = res => {
    console.log('LOGIN SUCCESS! CURRENT USER: ', res.profileObj)
  }

  const onFailure = res => {
    console.log('LOGIN FAILURE! res: ', res)
  }


  return <div>
    <GoogleLogin
      clientId = {clientId}
      buttonText = "login with Google"
      onSuccess = {onSuccess}
      onFailure = {onFailure}
      cookiePolicy = {'single_host_origin'}
      isSignedIn = {true}
    />
  </div>
}



export default (googleLogin);
