import axios from "axios";
import Cookies from "js-cookie";
import { store } from "../store/store";
import { isCCA } from "../utils/urlUtils.js";
import { showSnackbar } from "../store/slice/snackbarSlice.js";
// import { setAlert } from "../helpers";

// TODO: remove this function
export const setAlert = (status, message, color, timeout = 3000) => {
    store.dispatch(
        showSnackbar({
            timeout,
            snackbar: status,
            text: message,
            color,
        })
    );
};

const token = decodeURIComponent(Cookies.get("jwt_token")).replaceAll('"', "");
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

    // if has response show the error
    if (error?.response) {
        setAlert(
            true,
            error?.response?.data?.message || "API Error Occured",
            "error",
            3000
        );
    } else if (error.code === "ERR_NETWORK") {
        // Handle network error specifically
        setAlert(true, "Network Error: API is offline", "error", 3000);
    } else if (error.request) {
        // The request was made but no response was received
        if (error.code === "ECONNABORTED") {
            // Handle timeout specifically
            setAlert(true, "API request timed out", "error", 3000);
        } else {
            setAlert(true, "API is offline (no response received)", "error", 3000);
        }
    } else {
        // Something else happened in setting up the request that triggered an error
        const alertMessage =
            error.message === "Network Error"
                ? "Network Error: API is offline"
                : `API is offline (error: ${error.message})`;

        setAlert(true, alertMessage, "error", 3000);
    }
}

// Function to check if the token is expired or in valid
function isTokenExpired(token) {
    if (!token || token === "undefined") {
        return true; // No token present
    }

    // Split the token into its parts
    const tokenParts = token.split(".");

    if (tokenParts.length !== 3) {
        return true; // Invalid token format
    }

    // Decode the payload part of the token
    const payloadBase64 = tokenParts[1];
    const decodedPayload = JSON.parse(atob(payloadBase64));

    // Get the current time and compare with the expiration (`exp`)
    const currentTime = Math.floor(Date.now() / 1000); // In seconds
    return decodedPayload.exp && decodedPayload.exp < currentTime;
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
        Cookies.set("jwt_token", data.access_token, cookieOptions, {
            httpOnly: true,
            secure: true,
        });
        Cookies.set("refresh_token", data.refresh_token, cookieOptions, {
            httpOnly: true,
            secure: true,
        });
        Cookies.set("access_token", data.access_token, cookieOptions, {
            httpOnly: true,
            secure: true,
        });

        return data.access_token;
    } catch (error) {
        console.error("Token refresh failed:", error);
        throw error;
    }
};

// Axios request interceptor to check token expiration
baseURL.interceptors.request.use(
    async function (config) {
        if (config.url === "/login") {
            return config;
        }
        const jwtToken = Cookies.get("jwt_token");
        if (!jwtToken) {
            const cookies = [
                "email",
                "first_name",
                "CCA_role",
                "last_name",
                "EIA_role",
                "EIA_role_id",
                "username",
                "jwt_token",
                "access_token",
                "refresh_token",
                "access_token",
                "org",
                "CCA_role_id",
                "featuresData",
                "application",
            ];

            cookies.forEach((cookie) => {
                Cookies.remove(cookie, { path: "/", domain: ".amd.com" });
            });

            localStorage.clear();
            sessionStorage.clear();

            window.location.href = import.meta.env.VITE_OKTA_LOGOUT_LINK;
            setAlert(true, "Session expired. Please login again.", "red", 3000);
            return Promise.reject(
                new Error("Authentication tokens missing. Please log in again.")
            );
        }
        if (token === "undefined" && jwtToken) {
            token = decodeURIComponent(jwtToken).replaceAll('"', "");
        }
        if (isTokenExpired(token)) {
            try {
                const newToken = await refreshAccessToken();
                token = newToken;
                config.headers.Authorization = `Bearer ${token}`;
            } catch (error) {
                console.error("Token refresh failed:", error);

                const cookies = [
                    "email",
                    "first_name",
                    "CCA_role",
                    "last_name",
                    "EIA_role",
                    "EIA_role_id",
                    "username",
                    "jwt_token",
                    "access_token",
                    "refresh_token",
                    "access_token",
                    "org",
                    "CCA_role_id",
                    "featuresData",
                    "application",
                ];
                cookies.forEach((cookie) => {
                    Cookies.remove(cookie, { path: "/", domain: ".amd.com" });
                });
                localStorage.clear();
                sessionStorage.clear();
                window.location.href = import.meta.env.VITE_OKTA_LOGOUT_LINK;
                setAlert(true, "Session expired. Please login again.", "red", 3000);
                return Promise.reject(
                    new Error("Token refresh failed. Please log in again.")
                );
            }
        }
        if (token && token !== "undefined") {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config; // Proceed with the request
    },
    function (error) {
        return Promise.reject(new Error("Custom rejection: errorHandle is false"));
    }
);

axios.interceptors.response.use((response) => response, errorResponseHandler);
const apiClient = {
    showPageLoader() {
        // store.commit("SET_pageLoadingState", true);
    },
    hidePageLoader() {
        // store.commit("SET_pageLoadingState", false);
    },
    errorHandler(e) {
        if (e.status === 401) {
            Cookies.remove("email", { path: "/", domain: ".amd.com" });
            Cookies.remove("first_name", { path: "/", domain: ".amd.com" });
            Cookies.remove("CCA_role", { path: "/", domain: ".amd.com" });
            Cookies.remove("last_name", { path: "/", domain: ".amd.com" });
            Cookies.remove("username", { path: "/", domain: ".amd.com" });
            Cookies.remove("jwt_token", { path: "/", domain: ".amd.com" });
            Cookies.remove("access_token", { path: "/", domain: ".amd.com" });
            Cookies.remove("refresh_token", { path: "/", domain: ".amd.com" });
            Cookies.remove("CCA_role_id", { path: "/", domain: ".amd.com" });
            Cookies.remove("EIA_role", { path: "/", domain: ".amd.com" });
            Cookies.remove("EIA_role_id", { path: "/", domain: ".amd.com" });
            Cookies.remove("featuresData", { path: "/", domain: ".amd.com" });
            Cookies.remove("application", { path: "/", domain: ".amd.com" });
            Cookies.remove("access_token", { path: "/", domain: ".amd.com" });
            Cookies.remove("org", { path: "/", domain: ".amd.com" });
            localStorage.clear()
            sessionStorage.clear();
            setAlert(true, e?.response?.data?.Message || e?.response?.data?.message, 'red', 3000)
            window.location.href = import.meta.env.VITE_OKTA_LOGOUT_LINK
        } else if (e.status === 413) {
            setAlert(true, "File size is too large to handle", 'red', 3000)
        } else if (e.status === 400 || e.status === 500 || e.status === 404 || e.status === 409) {
            setAlert(true, e?.response?.data?.Message || e?.response?.data?.message, 'red', 3000)
        } else if (e.status === 502) {
            setAlert(true, 'There is a temporary issue with the server (502 Bad Gateway), Please try again.', 'red', 3000)
        }
        else if (e.code === 'ERR_NETWORK') {
            setAlert(true, 'Server Under Maintenance', 'error', 3000);
        } else if (e.response) {
            let data = {
                status: true,
                message: e.response.data.message || e.response.data.Message,
                color: 'red',
                icon: 'mdi-twitter',
                timeout: 3000
            };
            setAlert(true, data.message, 'error', 3000)
        } else if (e.request) {
            let data = {
                status: true,
                message: 'API is offline (no response received)',
                color: 'red',
                icon: 'mdi-twitter',
                timeout: 3000
            };
            setAlert(true, data.message, 'error', 3000)
        } else {
            let data = {
                status: true,
                message: `API is offline (error: ${e.message})`,
                color: 'red',
                icon: 'mdi-twitter',
                timeout: 3000
            };
            setAlert(true, data.message, 'error', 3000)
        }
        return e.response ? e.response.data : null;
    },
    async LoginAPI(data) {
        try {
            this.showPageLoader();
            const response = await baseURL_WitoutAuth.post("/login", data);
            this.hidePageLoader();
            return response;
        } catch (e) {
            this.hidePageLoader();
            this.errorHandler(e);
            return e;
        }
    },
    async getPortfoliosName(csp, datadogcsp) {
        let selectedCSP = csp === "AWS CloudWatch" ? "cloudwatch" : csp === "Azure App Insights" ? "azureinsights" : csp === "Google Cloud Ops Agent" ? "gcptelemetry" : csp;
        let selectedCloud = csp === "AWS CloudWatch" ? "AWS" : csp === "Azure App Insights" ? "AZURE" : csp === "Google Cloud Ops Agent" ? "GCP" : csp;
        let params = (csp == 'Datadog' || csp == 'Prometheus')
            ? { provider: datadogcsp, cloud_csp: csp?.toLowerCase() }
            : (csp === "AWS CloudWatch" || csp === "Azure App Insights" || csp === "Google Cloud Ops Agent") ? { provider: selectedCloud, cloud_csp: selectedCSP } : { provider: selectedCSP };
        params.list_all = true;
        params.user_email = Cookies.get('email')
        try {
            const response = await baseURL.get('/get-portfolio', { params });
            return response;
        } catch (e) {
            return e;
        }
    },
    async getPortfolioInstances(data) {
        const params = { ...data };

        try {
            const response = await baseURL.get('/get-portfolio', { params });
            return response;
        } catch (e) {
            return e;
        }
    },
    async getRegions(csp) {
        try {
            let selectedProvider = (csp == 'AWS CloudWatch') ? 'AWS' : (csp == 'Azure App Insights') ? 'AZURE' : (csp == 'Google Cloud Ops Agent') ? 'GCP' : csp
            const response = await baseURL.get(`/regions?provider=${selectedProvider}&email=` + Cookies.get('email'));
            return response?.data;
        } catch (e) {
            this.errorHandler(e);
        }
    },
    async CloudConnection(data) {
        let params;
        if (data.query_type === 'sync_account') {
            params = {
                provider: data.provider?.toLowerCase(),
                accountName: data.accountName,
                user_email: data.user_email,
                id: data.portfolioID
            };
        } else {
            params = {
                provider: data.csp,
                region: data.region,
                accountName: data.accountName,
                user_email: data.user_email
            };

            if (data.csp === 'AWS') {
                params.awsAccessId = data.accessID;
                params.awsAccessSecret = data.accessSecret;
            } else if (data.csp === 'AZURE') {
                params.azureClientId = data.azureClientId;
                params.azureClientSecret = data.azureClientSecret;
                params.azureTenantId = data.azureTenantId;
                params.azureSubscriptionId = data.azureSubscriptionId;
            } else if (data.csp === 'GCP') {
                params.project_id = data.project_id;
                params.private_key = data.private_key;
                params.client_email = data.client_email;
                params.client_id = data.client_id;
            }
        }
        try {
            this.showPageLoader();
            const response = await baseURL.get(`/cloud-accounts/${data?.query_type}`, { params });
            this.hidePageLoader();
            return response;
        } catch (e) {
            this.hidePageLoader();
            this.errorHandler(e);
        }
    },
    async AddCloudConnection(data) {
        let params = {
            provider: data.provider,
            region: data.region,
            accountName: data.accountName,
            user_email: data.user_email
        };

        if (data.provider === 'AWS') {
            params.awsAccessId = data.awsAccessId;
            params.awsAccessSecret = data.awsAccessSecret;
        } else if (data.provider === 'AZURE') {
            params.azureClientId = data.azureClientId;
            params.azureClientSecret = data.azureClientSecret;
            params.azureTenantId = data.azureTenantId;
            params.azureSubscriptionId = data.azureSubscriptionId;
        } else if (data.provider === 'GCP') {
            params.project_id = data.project_id;
            params.private_key = data.private_key;
            params.client_email = data.client_email;
            params.client_id = data.client_id;
        }
        try {
            this.showPageLoader();
            const response = await baseURL.post(`/cloud-accounts`, params);
            this.hidePageLoader();
            return response;
        } catch (e) {
            this.hidePageLoader();
            this.errorHandler(e);
        }
    },
    async getInstanceSizes(data) {
        try {
            const response = await baseURL.get(`/instance-sizes?provider=${data?.provider}&region=${data?.region}&email=` + Cookies.get('email'));
            return response?.data;
        } catch (e) {
            this.errorHandler(e);
        }
    },
    async rowValidationAPI(data) {
        try {
            const response = await baseURL.post(`/input/validate`, { ...data, appName: isCCA() ? 'CCA' : 'EIA' })
            return response?.data ? response?.data : []
        }
        catch (e) {
            this.errorHandler(e)
            return e.response.data
        }
    },
    async uploadFile(obj, data) {
        try {
            this.showPageLoader();
            const response = await baseURL.post(`/file-upload/validate?provider=${obj.provider}`,
                data);
            this.hidePageLoader();
            return response?.data ? response?.data : [];
        } catch (e) {
            this.hidePageLoader();
            this.errorHandler(e);
            return e.response || []
        }
    },
    async updatePortfolio(obj) {
        try {
            const response = await baseURL.patch(`/update-portfolio?id=${obj.id}`, obj)
            return response?.data || []
        }
        catch (e) {
            return e?.status === 409 ?
                {
                    errorCode: -1,
                    message: e?.response?.data?.Message
                } : e;
        }
    },
    async savePortfolio(data) {
        try {
            let obj = { ...data }
            const response = await baseURL.post(`/save-portfolio`, obj)
            return response?.data ? response?.data : []
        }
        catch (e) {
            this.hidePageLoader()
            this.errorHandler(e)
            return e?.response?.data
        }
    },
    async DeletePortfolio(data) {
        try {
            this.showPageLoader();
            const response = await baseURL.delete(`/delete-portfolio?id=${data.id}`);

            this.hidePageLoader();
            return response;
        } catch (e) {
            this.hidePageLoader();
            this.errorHandler(e);
        }
    },
    async bulkUpdateAPI(data) {
        try {
            this.showPageLoader();
            const response = await baseURL.post(`/input/correct`, { ...data, appName: isCCA() ? 'CCA' : 'EIA' })
            this.hidePageLoader();
            return response?.data;
        } catch (e) {
            this.hidePageLoader();
            this.errorHandler(e);
        }
    },
    async getListofInstance(data) {
        try {
            const response = await baseURL.get(`/cloud-instances?provider=${data?.provider}&email=` + Cookies.get('email'));
            return response?.data;
        } catch (e) {
            this.errorHandler(e);
        }
    },
    async instanceListByProvider(data) {
        try {
            this.showPageLoader();
            const response = await baseURL.get(`/explorer?provider=${data?.provider}&email=` + Cookies.get('email'));
            this.hidePageLoader();
            if (response.status === 200) {
                return response?.data?.Data ? response.data.Data : [];
            }
            else {
                setAlert(3000, true, response?.data?.message || "API error occured", "red")

            }
        } catch (e) {
            this.hidePageLoader();
            this.errorHandler(e);
        }
    },
    async getInstanceSummary(data) {
        const params = { ...data };
        try {
            this.showPageLoader();
            const response = await baseURL.get('/instances/summary', { params });
            this.hidePageLoader();
            return response;
        } catch (e) {
            this.hidePageLoader();
            this.errorHandler(e);
        }
    },
    async testTelemetryConnection(data) {
        let params = data.sourceType
        delete data.sourceType
        try {
            this.showPageLoader();
            const response = await baseURL.post(`/telemetry/connection/${params}`, data);
            this.hidePageLoader();
            return response;
        } catch (e) {
            this.hidePageLoader();
            this.errorHandler(e);
            return e?.response
        }
    },
    async getTelemetryMetrics(data) {
        try {
            this.showPageLoader()
            const response = await baseURL.post(`/telemetry/metrics/${data.sourceType}`, data)
            this.hidePageLoader();
            return response;
        } catch (e) {
            this.hidePageLoader();
            this.errorHandler(e);
        }
    },
    async getCloudAccountDetails(data) {
        try {
            this.showPageLoader();
            const response = await baseURL.get(`/getCloudAccount?accountName=${data.accountName}&provider=${data.provider}&user_email=${data.user_email}`);
            this.hidePageLoader();
            return response;
        } catch (e) {
            this.hidePageLoader();
            this.errorHandler(e);
        }
    },
    async costAdvice(data) {
        try {
            let obj = { ...data }
            this.showPageLoader()
            const response = await baseURL.post('/cost-advice', obj)
            this.hidePageLoader()
            return response || []
        }
        catch (e) {
            if (e.status === 400 && e.response.data.Details) {
                this.hidePageLoader()
                return e;
            }
            else {
                this.hidePageLoader()
                this.errorHandler(e)
            }
        }
    },
    async SavingsAPI(obj, activeApp) {
        let baseurl = activeApp == "Market Place" ? marketplaceBaseURL : baseURL
        try {
            const response = await baseurl.get(`savings?date_filter=${obj.days}`, {
                headers: {
                    'AppName': obj.appName
                }
            });
            return response.data;
        } catch (e) {
            throw e;
        }
    },
    async metricsAPI(obj, activeApp) {
        let baseurl = activeApp == "Market Place" ? marketplaceBaseURL : baseURL
        try {
            const response = await baseurl.get(`metrics?date_filter=${obj.days}`, {
                headers: {
                    'AppName': obj.appName
                }
            });
            return response.data;
        } catch (e) {
            throw e;
        }
    },
    async organizationAPI(obj, activeApp) {
        let baseurl = activeApp == "Market Place" ? marketplaceBaseURL : baseURL
        try {
            const response = await baseurl.get(`organizations?date_filter=${obj.days}`, {
                headers: {
                    'AppName': obj.appName
                }
            });
            return response.data;
        } catch (e) {
            throw e;
        }
    },
    async FeaturesAPI(obj, activeApp) {
        let baseurl = activeApp == "Market Place" ? marketplaceBaseURL : baseURL
        try {
            const response = await baseurl.get(`features/count?date_filter=${obj.days}`, {
                headers: {
                    'AppName': obj.appName
                }
            });
            return response.data;
        } catch (e) {
            throw e;
        }
    }

}

export default apiClient;