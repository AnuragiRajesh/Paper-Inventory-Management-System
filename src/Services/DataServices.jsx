

import axios from 'axios';
const Access_Token = localStorage.getItem('Access_Token')
const headers = {
   headers:{
    "Authorization" : `Bearer ${Access_Token}`
}
};
const particularUnitApiUrl =`http://172.17.130.162:9123/api/Authenticate/auth/ViewUnits`
const accessAllUnitApiUrl = `http://172.17.130.162:9123/api/Authenticate/auth/ViewallUnits`
const stockInApiUrl = `http://172.17.130.162:9123/api/Authenticate/inventory/stock-in`
const loginApiUrl = `http://172.17.130.162:9123/api/Authenticate/auth/login`
const supplierApiUrl = `http://172.17.130.162:9123/api/Authenticate/Masters/Supplier`
const paperGroupApiUrl = `http://172.17.130.162:9123/api/Authenticate/Masters/PaperGroup`
const brandApiUrl = `http://172.17.130.162:9123/api/Authenticate/Masters/PaperBrand`
const millApiUrl = `http://172.17.130.162:9123/api/Authenticate/Masters/Mill`
const gsmApiUrl = `http://172.17.130.162:9123/api/Authenticate/Masters/GSM`
const paperReelSizeApiUrl = `http://172.17.130.162:9123/api/Authenticate/Masters/PaperReelSize`;
const paperSheetSizeApiUrl = `http://172.17.130.162:9123/api/Authenticate/Masters/PaperSheetSize`
export const loginApi = (data) => {
    return axios.post(loginApiUrl, data,);
};
export const supplierApi = async () => {
    return axios.get(supplierApiUrl, headers);
};
export const paperGroupApi = async () => {
    return axios.get(paperGroupApiUrl, headers);
};
export const brandApi = async () => {
    return axios.get(brandApiUrl, headers);
};
export const millApi = async () => {
    return axios.get(millApiUrl, headers);
};
export const gsmApi = async () => {
    return axios.get(gsmApiUrl, headers);
};
export const paperReelSizeApi = async () => {
    return axios.get(paperReelSizeApiUrl, headers);
};
export const paperSheetSizeApi = async () => {
    return axios.get(paperSheetSizeApiUrl, headers);
};
export const stockInApi = async (data) => {
    console.log(data,"data ")
    return axios.post(stockInApiUrl, data, headers);
};
export const accessAllUnitApi = async () => {
    console.log(headers,"headers")
    return axios.get(accessAllUnitApiUrl,headers );
};
export const particularUnitApi = async (data) => {
    console.log(data,"particularunit")
    return axios.get(`${particularUnitApiUrl}?unitid=${data}` ,headers );
}