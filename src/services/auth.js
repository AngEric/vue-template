import axios from 'axios';

export default {
  login(data) {
    return axios.post('/api/auth/login', data);
  },
};