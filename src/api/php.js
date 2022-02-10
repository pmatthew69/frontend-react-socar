import axios from 'axios';

export default axios.create({
    baseURL: "http://localhost/backend-php-socar/api/users"
})