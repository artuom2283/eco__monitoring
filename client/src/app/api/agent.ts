import axios, {AxiosError, AxiosResponse} from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = `http://localhost:8080/api/`;
axios.defaults.withCredentials = true;
axios.interceptors.response.use(null, error => {
    const expectedError =
        error.response &&
        error.response >= 400 &&
        error.response < 500;

    if(!expectedError){
        toast.error("An unexpected error occured!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        })
    }

    return Promise.reject(error)
})

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
  putPollution: (body: object) => requests.put(`pollutions`, body),
  delPollution: (id: number) => requests.del(`pollutions/${id}`),
  addPollution: (body: object) => requests.post(`pollutions`, body)
};

const Facilities = {
  getFacilities: () => requests.get("facilities"),
  getFacility: (id: number) => requests.get(`facilities`),
  addFacility: (body: object) => requests.post("facilities", body),
  delFacility: (id: number) => requests.del(`facilities/${id}`),
  putFacility: (body: object) => requests.put("facilities", body)
}

const Reports = {
  getReports: () => requests.get("reports"),
  getReport: (id: number) => requests.get(`reports/${id}`),
  addReport: (body: object) => requests.post("reports", body),
  delReport: (id: number) => requests.del(`reports/${id}`),
  putReport: (body: object) => requests.put("reports", body),
  getReportsByName: (name: string) => requests.get(`reports/name-${name}`),
  getSortedReports: (param: string, orderBy: string) => requests.get(`reports/sort/${param}-${orderBy}`)
}

const agent = {
  Pollution,
  Facilities,
  Reports
}

export default agent;