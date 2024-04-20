import Cookies from "js-cookie";
import axios from "axios";

export const API_URL = "http://mclass.uz/api/v1/";

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
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                await AuthService.getNewTokens();
                return $api.request(originalRequest);
            } catch (e) {
                if (e.response.status === 401) {
                    AuthService.logout();
                }
            }
        }
        throw error;
    }
);

export { $api, $apiAuth };
