import { baseURL } from "./apiService";
import Cookies from "js-cookie";

export const portfolioService = {
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
}
