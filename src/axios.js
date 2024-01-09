import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
// import router from "./router";

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
})

axiosClient.interceptors.request.use((config) => {
    // const token = '123'; //TODO
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
});

// let navigate = useNavigate();
axiosClient.interceptors.response.use(response => {
    return response
}, error => {
    if(error.response && error.response.status === 401){
        // router.navigate('/login');
        // return error
        // console.log('errror');
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
        localStorage.removeItem('role_id');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        window.location.href = 'http://localhost:3000/#/login';
    }
    throw error;
})

export default axiosClient;







///////////////////////////////////////////////////////////////

// import axios from "axios";

// const axiosClient = axios.create({
//     baseURL: `${import.meta.env.VITE_API_BASE_URL}/api`
// })

// axiosClient.interceptors.request.use((config) => {
//     // const token = '123'; //TODO
//     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
//     return config
// });

// axios.interceptors.response.use(response => {
//     return response
// }, error => {
//     if(error.response && error.response.status === 401){
//         router.navigate('/login');
//         return error
//     }
//     throw error;
// })

// export default axiosClient;
