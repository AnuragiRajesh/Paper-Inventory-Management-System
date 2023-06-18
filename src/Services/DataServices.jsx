

import axios from 'axios';
const loginApiUrl=`http://172.17.130.162:9123/api/Authenticate/auth/login`
export const loginApi =  (data) => {
    return axios.post(loginApiUrl, data, );
};
