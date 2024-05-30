import axios from "axios";
import Cookies from "js-cookie";

export const API_URL = "https://ieltszone.uz/api/v1/";

const options = {
    baseURL: API_URL,
    withCredentials: true,
};

const $api = axios.create(options);
const $apiAuth = axios.create({
    baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
    const accessToken = Cookies.get("token");

    if (config.headers && accessToken) {
        config.headers.Authorization = "Bearer " + accessToken;
    }
    return config;
});

$api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        if (error.response.status === 401) {
            Cookies.remove("token");
            Cookies.remove("role");
            window.location.href = "/login";
        }
        throw error;
    }
);

export { $api, $apiAuth };
