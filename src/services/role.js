import axios from 'axios';

export default {
  list() {
    return axios.get('/api/role');
  },
  create(data) {
    return axios.post('/api/role', data);
  },
  updateStatus(data) {
    return axios.put('/api/role/status', data);
  },
};