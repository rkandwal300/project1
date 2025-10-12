import { baseURL } from "./apiService";
import { isCCA } from "../utils/urlUtils.js";

export const validationService = {
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
}