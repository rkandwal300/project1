import { baseURL } from "./apiService";

export const userService = {
    async getUser() {
        try {
            const response = await baseURL.get("/user");
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};
