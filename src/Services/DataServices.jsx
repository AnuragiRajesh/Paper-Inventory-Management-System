
import axios from 'axios';
const baseUrl = `http://172.17.130.162:9123`
const refreshTokenUrl =`${baseUrl}/refresh-token`
const accessAllUnitApiUrl = `${baseUrl}/stock/inward`
const stockInApiUrl = `${baseUrl}/stock/inward`
const updateStockInApiUrl = `${baseUrl}/stock/inward`
const deleteStockApiUrl = `${baseUrl}/stock/inward`
const loginApiUrl = `${baseUrl}/auth/login`
const supplierApiUrl = `${baseUrl}/Master/Supplier`
const paperGroupApiUrl = `${baseUrl}/Master/PaperGroup`
const brandApiUrl = `${baseUrl}/Master/PaperBrand`
const millApiUrl = `${baseUrl}/Master/Mill`
const gsmApiUrl = `${baseUrl}/Master/GSM`
const paperReelSizeApiUrl = `${baseUrl}/Master/PaperReelSize`;
const paperSheetSizeApiUrl = `${baseUrl}/Master/PaperSheetSize`
const Access_Token = localStorage.getItem('Access_Token')
const Refresh_Token = localStorage.getItem('Refresh_Token')
const headers = {
  headers:{
   "Authorization" : `Bearer ${Access_Token}`
}};
const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${Access_Token}`,
  },
});

// Axios interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        if (Refresh_Token) {
          const refreshResponse = await axios.post(refreshTokenUrl, {
            accessToken: Access_Token,
            refreshToken:Refresh_Token,
          });
          console.log(refreshResponse)
          const newAccessToken = refreshResponse.data.accessToken;
          const newRefreshToken = refreshResponse.data.refreshToken;
          localStorage.setItem("Access_Token", newAccessToken)
          localStorage.setItem("Refresh_Token", newRefreshToken);
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } else {
        }
      } catch (error) {
       
      }
    }
    return Promise.reject(error);
  }
);

export const loginApi = (data) => {
  return axios.post(loginApiUrl,data);
};

export const supplierApi = () => {
  return axiosInstance.get(supplierApiUrl);
};

export const paperGroupApi = () => {
  return axiosInstance.get(paperGroupApiUrl);
};

export const brandApi = () => {
  return axiosInstance.get(brandApiUrl);
};

export const millApi = () => {
  return axiosInstance.get(millApiUrl);
};

export const gsmApi = () => {
  return axiosInstance.get(gsmApiUrl);
};

export const paperReelSizeApi = () => {
  return axiosInstance.get(paperReelSizeApiUrl);
};

export const paperSheetSizeApi = () => {
  return axiosInstance.get(paperSheetSizeApiUrl);
};

export const stockInApi = async (data) => {
    return axiosInstance.post(stockInApiUrl,data);

};
export const updateStockInApiUrlApi = async (Inward_Id,data) => {
  console.log(data)
  return axiosInstance.put(`${updateStockInApiUrl}/${Inward_Id}`,data);
}
export const accessAllUnitApi = async () => {
    return axiosInstance.get(accessAllUnitApiUrl);
};
export const particularUnitApi = async (data) => {
    console.log(data)
    return axiosInstance.get(`${accessAllUnitApiUrl}/${data}`);
}

export const deleteStockApi = async (Inward_Id) => {
  return axiosInstance.delete(`${deleteStockApiUrl}/${Inward_Id}`);
}