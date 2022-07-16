require('dotenv').config();
const qs = require('qs');
const {Buffer} = require('buffer');
const axios = require('axios');

let auth = Buffer.from(process.env.CLIENT_ID_SPOTIFY+':'+process.env.CLIENT_SECRET_SPOTIFY).toString('base64');
const url_token = 'https://accounts.spotify.com/api/token';
const data = qs.stringify({'grant_type':'client_credentials'});

class Token {
  async generateToken () {     
    const result =  await axios.post(url_token,data, {
        headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded' 
        }
    });
  
    return process.env.ACCESS_TOKEN_SPOTIFY = result.data.access_token;
  }
}

module.exports = new Token();


