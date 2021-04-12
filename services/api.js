const axios = require('axios');


const Api = axios.create({
  baseURL: 'https://unityapp.online/api',
});

module.exports = Api