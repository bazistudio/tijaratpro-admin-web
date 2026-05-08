import axiosInstance from "@/lib/api/axios";

const BASE = "/api/import";

export const importService = {
  /**
   * Preview mapping and validate data
   */
  preview: async (file: File, type: string, mapping: Record<string, string>) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    formData.append('mapping', JSON.stringify(mapping));

    const res = await axiosInstance.post(`${BASE}/preview`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data.data;
  },

  /**
   * Confirm and perform bulk import
   */
  confirm: async (data: any[], type: string, sessionId?: string) => {
    const res = await axiosInstance.post(`${BASE}/confirm`, {
      data,
      type,
      sessionId
    });
    return res.data;
  }
};
