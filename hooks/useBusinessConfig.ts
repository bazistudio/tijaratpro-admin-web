import { useShopStore } from "@/store/shop.store";
import { mobileProductFields, mobileProductColumns } from "@/modules/mobile/productFields";
import { medicalProductFields, medicalProductColumns } from "@/modules/medical/productFields";
import { autoPartsProductFields, autoPartsProductColumns } from "@/modules/auto_parts/productFields";

export type BusinessType = "RETAIL" | "MEDICAL" | "AUTO" | "WHOLESALE" | "SYSTEM";

export const useBusinessConfig = () => {
  const { activeShop } = useShopStore();
  
  // Default to RETAIL if not set
  const businessType: BusinessType = activeShop?.businessType || "RETAIL";

  const getProductFields = () => {
    switch (businessType) {
      case "MEDICAL":
        return medicalProductFields;
      case "AUTO":
        return autoPartsProductFields;
      case "RETAIL":
      case "WHOLESALE":
      case "SYSTEM":
        return mobileProductFields; // Use mobile as default/retail for now
      default:
        return [];
    }
  };

  const getProductColumns = () => {
    switch (businessType) {
      case "MEDICAL":
        return medicalProductColumns;
      case "AUTO":
        return autoPartsProductColumns;
      default:
        return mobileProductColumns;
    }
  };

  return {
    businessType,
    productFields: getProductFields(),
    productColumns: getProductColumns(),
    // Add more config mapping here as needed (validation, etc)
  };
};
