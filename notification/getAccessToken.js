const {google} = require('googleapis');
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE];
getAccessToken= async function () {
    return new Promise(function(resolve, reject) {
      const key = require('../musab-ed031-firebase-adminsdk-9mo7f-2e14df7d2d.json');
      const jwtClient = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        SCOPES,
        null
      );
      jwtClient.authorize(function(err, tokens) {
        if (err) {
          reject(err);
          return;
        }
        console.log('token.access_token------------------------------');
        console.log(tokens.access_token);
        
        resolve(tokens.access_token);
      });
    });
  }


  module.exports = {getAccessToken}