import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5110', 
});

api.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';

export default api;
