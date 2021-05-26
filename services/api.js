const axios = require('axios');


const Api = axios.create({
  baseURL: 'http://unity.vps-kinghost.net/api',
});

module.exports = Api