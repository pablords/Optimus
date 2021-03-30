const axios = require('axios');


const Api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});


module.exports = {
  getMobilePhone: async (data) => {

    const res = await Api.post('/whats-app/getContact', data)
      .then((res) => {
        return res.data
      }).catch((err) => {
        console.log(err)
      })

  }
}