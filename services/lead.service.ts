import { api } from "@/lib/api";

export interface LeadPayload {
  name: string;
  phone: string;
  shopName: string;
  city: string;
  businessType: string;
}

export const leadService = {
  submitLead: async (data: LeadPayload) => {
    const response = await api("/leads", {
      method: "POST",
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to submit request");
    }
    
    return response.json();
  },
};
