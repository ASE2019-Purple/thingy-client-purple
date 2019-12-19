
import axios from 'axios';

const API_URL = process.env.VUE_APP_THINGY_API;

const API = process.env.NODE_ENV === 'production' ? "http://35.233.66.177:8081" : "http://localhost:8081";;

const property = {
   list: (thingyId, params) => axios.get(`${API}/thing/${thingyId}/properties`, params),
   get: (thingyId, property, params) => axios.get(`${API}/thing/${thingyId}/property/${property}`, params)
}

const thingys = {
  list: params => axios.get(`${API}/things`,  params ),
  get: (thingy_id, params) => axios.get(`${API}/thing/${thingy_id}`, params),

  post: (params) => axios.post(`${API}/things`, params),
  delete: (thingy_id, params) => axios.delete(`${API}/thing/${thingy_id}`, params),
}

const plants = {
  list: (params) => axios.get(`${API}/plants`, params),
  post: (params) => axios.post(`${API}/plants`, params),
  delete: (plant_id, params) => axios.delete(`${API}/plant/${plant_id}`, params),
  get: (plant_id, params) => axios.get(`${API}/plant/${plant_id}`, params),
  put: (plant_id, params) => axios.put(`${API}/plant/${plant_id}`, params),
  prediction: (plant_id, params) => axios.get(`${API}/plant/${plant_id}/prediction`, params),

}

export default {
  property,
  thingys,
  plants
}
