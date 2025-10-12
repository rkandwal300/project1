import axios from "axios";
import Cookies from "js-cookie";
import { isCCA } from "../utils/urlUtils.js";
import { RoutePaths } from "../router/routePaths.js";

// The setAlert function and its dependency on the store have been removed to break the circular dependency.
// Error handling should be done in the thunks or components that call the API services.

let token = Cookies.get("jwt_token") ? decodeURIComponent(Cookies.get("jwt_token")).replaceAll('\'', "") : undefined;

export const baseURL = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`,
        Appname: isCCA() ? 'CCA' : 'EIA'
    },
});
export const marketplaceBaseURL = axios.create({
    baseURL: import.meta.env.VITE_MARKETPLACE_API_BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`,
        Appname: isCCA() ? 'CCA' : 'EIA'
    },
});
export const baseURL_WitoutAuth = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

function errorResponseHandler(error) {
    if (
        error.config.hasOwnProperty("errorHandle") &&
        error.config.errorHandle === false
    ) {
        return Promise.reject(error);
    }
    // The responsibility of showing alerts is moved from here to the calling code.
    // The interceptor's job is to forward the error.
    return Promise.reject(error);
}

// Function to check if the token is expired or invalid
function isTokenExpired(token) {
    if (!token || token === "undefined") {
        return true; // No token present
    }

    const tokenParts = token.split(".");
    if (tokenParts.length !== 3) {
        return true; // Invalid token format
    }

    const payloadBase64 = tokenParts[1];
    try {
        const decodedPayload = JSON.parse(atob(payloadBase64));
        const currentTime = Math.floor(Date.now() / 1000); // In seconds
        return decodedPayload.exp && decodedPayload.exp < currentTime;
    } catch (e) {
        return true; // Error decoding token
    }
}

const refreshAccessToken = async () => {
    try {
        let authHeader =
            "Basic " +
            btoa(
                import.meta.env.VITE_OKTA_CLIENT_ID +
                ":" +
                import.meta.env.VITE_OKTA_SECRET
            );
        const refreshToken = Cookies.get("refresh_token");
        const response = await fetch(import.meta.env.VITE_CS_API + "/getRefreshToken", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `${authHeader}`,
            },
            body: JSON.stringify({
                grant_type: "refresh_token",
                refresh_token: refreshToken,
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to refresh token");
        }

        const data = await response.json();
        const cookieOptions = {
            expires: 1,
            domain: "amd.com",
            secure: true,
            sameSite: "strict",
        };
        // Update cookies with new tokens
        Cookies.set("jwt_token", data.access_token, cookieOptions);
        Cookies.set("refresh_token", data.refresh_token, cookieOptions);
        Cookies.set("access_token", data.access_token, cookieOptions);

        return data.access_token;
    } catch (error) {
        console.error("Token refresh failed:", error);
        throw error;
    }
};

const clearCookiesAndRedirect = () => {
    const cookies = [
        "email", "first_name", "CCA_role", "last_name", "EIA_role", "EIA_role_id",
        "username", "jwt_token", "access_token", "refresh_token", "org", "CCA_role_id",
        "featuresData", "application",
    ];

    cookies.forEach((cookie) => {
        Cookies.remove(cookie, { path: "/", domain: ".amd.com" });
    });

    localStorage.clear();
    sessionStorage.clear();

    // In a test environment, window may not be defined.
    if (typeof window !== 'undefined') {
        window.location.href = import.meta.env.VITE_OKTA_LOGOUT_LINK;
    }
};


// Axios request interceptor to check token expiration
baseURL.interceptors.request.use(
    async function (config) {
        if (config.url === RoutePaths.LOG_IN) {
            return config;
        }
        const jwtToken = Cookies.get("jwt_token");
        if (!jwtToken) {
            clearCookiesAndRedirect();
            return Promise.reject(
                new Error("Authentication tokens missing. Please log in again.")
            );
        }
        
        let currentToken = decodeURIComponent(jwtToken).replaceAll('\'', "");
        if (!currentToken || isTokenExpired(currentToken)) {
            try {
                const newToken = await refreshAccessToken();
                token = newToken;
            } catch (error) {
                console.error("Token refresh failed:", error);
                clearCookiesAndRedirect();
                return Promise.reject(
                    new Error("Token refresh failed. Please log in again.")
                );
            }
        }
        config.headers.Authorization = `Bearer ${token}`;
        return config; 
    },
    function (error) {
        return Promise.reject(error);
    }
);

baseURL.interceptors.response.use((response) => response, errorResponseHandler);


const apiClient = {
    // Other methods removed for brevity as they depend on the store or are related to UI.
    // The core functionality is now just the configured axios instance.
    errorHandler(e) {
        // This logic should be moved to where API calls are made.
        console.error("API Error:", e);
        // Simply re-throw the error
        throw e;
    },
}

export default apiClient;
