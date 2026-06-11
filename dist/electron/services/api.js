"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.apiClient = void 0;
const axios_1 = __importDefault(require("axios"));
// Change this to the real API endpoint later
const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:4000/api';
exports.apiClient = axios_1.default.create({
    baseURL: API_BASE_URL,
    timeout: 5000,
});
exports.api = {
    // Resolves conflicts by checking server.updatedAt > local.updatedAt
    syncEntity: async (entityType, operation, payload) => {
        const endpoint = `/${entityType}`;
        // Minimal mock-up of what the API interaction looks like
        try {
            let response;
            if (operation === 'CREATE') {
                response = await exports.apiClient.post(endpoint, payload);
            }
            else if (operation === 'UPDATE') {
                response = await exports.apiClient.put(`${endpoint}/${payload.id}`, payload);
            }
            else if (operation === 'DELETE') {
                response = await exports.apiClient.delete(`${endpoint}/${payload.id}`);
            }
            return { success: true, data: response?.data };
        }
        catch (error) {
            // Basic Conflict Handling: if 409 Conflict, parse server entity
            if (error.response && error.response.status === 409) {
                return { success: false, conflict: true, serverData: error.response.data.serverEntity };
            }
            throw error;
        }
    }
};
//# sourceMappingURL=api.js.map