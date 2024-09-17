import axios, { AxiosResponse } from "axios";


axios.defaults.baseURL = `http://localhost:5000/api/`; //change root
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
    getPollutions: () => requests.get("pollution/pollutions"),
    getPollution: (id: number) => requests.get(`pollution/pollutions/${id}`),
    //addPollution: (id: number) =
}

const Facilities = {
    getFacilities: () => requests.get("industrialFacilities/facilities"),
    getFacilitiesWithPollution: () => requests.get("industrialFacilities/fullFacilities"),
    getFacility: (id: number) => requests.get(`industrialFacilities/facilities/${id}`),

}

const agent = {
    Pollution,
    Facilities,

}

export default agent;