import { baseURL } from "./apiService";

export const telemetryService = {
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
}