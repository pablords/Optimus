const axios = require('axios');


const Api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});


module.exports = {
  getMobilePhone: async (data) => {

    await Api.post('/whats-app/getContact', data)
      .then((res) => {
        return res
      }).catch((err) => {
        console.log(err)
      })

  }
}