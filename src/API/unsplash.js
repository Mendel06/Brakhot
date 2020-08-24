import axios from 'axios';
export default axios.create({
    baseURL: 'https://api.unsplash.com',
    headers: {
        Authorization: 'Client-ID XK0hyTtr05O6XwxDrgq3Ec__lOHkS16oIHo22wR_7E4'
        }
});