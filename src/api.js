
import axios from 'axios';

const API_URL = process.env.VUE_APP_THINGY_API;

const API = "http://localhost:8081";

// TODO implement a vue plugin that injects the auth header into the requests

// export const ThingyAPI = new Vue ({
  
//   data () {
//     properties : ["temperature", "airquality", "pressure", "humidity"]
//   },
//   methods : {
//     async get () {
//       const token = await this.$auth.getTokenSilently();
//       return axios.get(`${API}/`, {
//         params,
//         headers: {
//           Authorization: 'Bearer ' + token // send the access token through the 'Authorization' header
//         }
//       });
//     }
//   }
// })

const property = {
   list: (thingyId, params) => axios.get(`${API}/thing/${thingyId}/properties`, params),
   get: (thingyId, property, params) => axios.get(`${API}/thing/${thingyId}/property/${property}`, params)
}

const thingys = {
  list: params => axios.get(`${API}/things`, { params }),
  get: (thingy_id, params) => axios.get(`${API}/thing/${thingy_id}`, params),

  post: (params) => axios.post(`${API}/things`, params),
  patch: (thingy_id, params) => axios.patch(`${API}/thing/${thingy_id}`, params),
  delete: (thingy_id, params) => axios.delete(`${API}/thing/${thingy_id}`, params),
}

const plants = {
  list: (params) => axios.get(`${API}/plants`, params),
  post: (params) => axios.post(`${API}/plants`, params),
  delete: (plant_id, params) => axios.delete(`${API}/plant/${plant_id}`, params),
  get: (plant_id, params) => axios.get(`${API}/plant/${plant_id}`, params),
  put: (plant_id, params) => axios.put(`${API}/plant/${plant_id}`, params),
}

export default {
  property,
  thingys,
  plants
}
