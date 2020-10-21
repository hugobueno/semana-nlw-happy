import Axios from "axios"

import axios from 'axios'

const api = axios.create({
    baseURL: 'http://localhost:3004'
})

export default api