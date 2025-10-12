import { RoutePaths } from "../router/routePaths";
import { baseURL_WitoutAuth } from "./apiService";

export const authService = {
    async LoginAPI(data) {
        try {
            this.showPageLoader();
            const response = await baseURL_WitoutAuth.post(RoutePaths.LOG_IN, data);
            this.hidePageLoader();
            return response;
        } catch (e) {
            this.hidePageLoader();
            this.errorHandler(e);
            return e;
        }
    },
}
