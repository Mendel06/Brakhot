import axios from 'axios';
export default axios.create({
    baseURL: 'https://api.jsonbin.io',
    headers: {
        'secret-key': '$2b$10$Eq1NlVFkh3EFxcrMsENazOMxo0.92FVhzCEbQOCN4Sx06lQjcrdjK'
        }
});