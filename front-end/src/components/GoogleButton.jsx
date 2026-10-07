import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

// Only rendered when REACT_APP_GOOGLE_CLIENT_ID is set (see App.js).
const GoogleButton = ({ onCredential, onError }) => (
  <div className="flex justify-center">
    <GoogleLogin
      onSuccess={(res) => onCredential(res.credential)}
      onError={() => onError('Google sign-in was cancelled or failed.')}
      theme="filled_black"
      shape="pill"
    />
  </div>
);

export default GoogleButton;
