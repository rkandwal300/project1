import { baseURL, marketplaceBaseURL } from "./apiService";

export const marketplaceService = {
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
