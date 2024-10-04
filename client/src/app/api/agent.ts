import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL = `http://localhost:8080/`;
axios.defaults.withCredentials = true;
const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string, params?: URLSearchParams) => axios.get(url, { params }).then(responseBody),
  post: (url: string, body?: object) => axios.post(url, body, {
    headers: { 'Content-Type': 'application/json' }
  }).then(responseBody),
  put: (url: string, body?: object) => axios.put(url, body, {
    headers: { 'Content-Type': 'application/json' }
  }).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
};

const Pollution = {
  getPollutions: () => requests.get("pollutions"),
  getPollution: (id: number) => requests.get(`pollutions/${id}`),
  putPollution: (id: number, body: object) => requests.put(`pollutions`, body),
  delPollution: (id: number) => requests.del(`pollutions/${id}`),
  addPollution: (body: object) => requests.post(`pollutions`, body)
};

const Facilities = {
  getFacilities: () => requests.get("facilities"),
  getFacilitiesWithPollution: () => requests.get("fullFacilities"),
  getFacilitiesWithPollutionByName: (name: string) => requests.get(`fullFacilities/${name}`),
  getFacilitiesWithPollutionByAsc: () => requests.get("fullFacilities/sortByAscending"),
  getFacilitiesWithPollutionByDesc: () => requests.get("fullFacilities/sortByDescending"),
  getFacility: (id: number) => requests.get(`facilities`),
  addFacility: (facilityData: object) => requests.put("facilities", facilityData),
  delFacility: (id: number) => requests.del(`facilities/${id}`),
}

const Reports = {
    getReports: () => requests.get("reports"),
    getReport: (id: number) => requests.get("reports/${id}"),
    addReport: (reportData: object) => requests.put("reports", reportData),
    delReport: (id: number) => requests.del(`reports/${id}`),
}

const agent = {
  Pollution,
  Facilities,
  Reports
}

export default agent;