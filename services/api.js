const axios = require('axios');


const Api = axios.create({
  baseURL: 'http://unityapp.ddns.net/api',
});

module.exports = Api