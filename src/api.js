
import axios from 'axios';

const API_URL = process.env.VUE_APP_THINGY_API;

const API = "http://localhost:8081";

// TODO implement as vue plugin an inject auth header in the requests
/**
 * Binding to the thingy-API.
 */
// export const ThingyAPI = new Vue ({
  
//   data () {
//     properties : ["temperature", "air-quality", "pressure", "humidity"]
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
  get: (thingyId, property, params) => axios.get(`${API}/thingy/${thingyId}/${property}`, params),
  filter: (thingyId, property, params) => axios.get(`${API}/thingy/${thingyId}/${property}/filter`, params),
}

// TODO
const thingys = {
  list: params => axios.get(`${API}/thingy/`, { params }),
  post: (thingy_id, params) => axios.post(`${API}/thingy/${thingy_id}`, params),
  delete: (thingy_id, params) => axios.delete(`${API}/thingy/${thingy_id}`, params),
}

const plants = {
  list: (params) => axios.get(`${API}/plants`, params),
  get: (plant_id, params) => axios.get(`${API}/plant/${plant_id}`, params),
  post: (plant_id, params) => axios.get(`${API}/plant/${plant_id}`, params),
}



export default {
  property,
  thingys,
}
