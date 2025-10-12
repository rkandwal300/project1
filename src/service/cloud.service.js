import { baseURL } from "./apiService";
import Cookies from "js-cookie";

export const cloudService = {
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
}
