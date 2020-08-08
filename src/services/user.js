import axios from 'axios';

export default {
  list() {
    return axios.get('/api/user');
  },
  create(data) {
    return axios.post('/api/user', data);
  },
};