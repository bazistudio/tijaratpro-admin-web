export declare const apiClient: import("axios").AxiosInstance;
export declare const api: {
    syncEntity: (entityType: string, operation: string, payload: any) => Promise<{
        success: boolean;
        data: any;
        conflict?: undefined;
        serverData?: undefined;
    } | {
        success: boolean;
        conflict: boolean;
        serverData: any;
        data?: undefined;
    }>;
};
//# sourceMappingURL=api.d.ts.map