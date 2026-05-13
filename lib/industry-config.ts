/**
 * TijaratPro Industry Configuration Engine
 * This is the heart of the universal SaaS architecture.
 */

export type IndustryType = 
  | "general" 
  | "pharmacy" 
  | "auto_parts" 
  | "grocery" 
  | "electronics" 
  | "wholesale" 
  | "fashion"

export interface IndustryField {
  name: string
  label: string
  type: "text" | "number" | "date" | "select" | "boolean"
  placeholder?: string
  required?: boolean
  options?: string[]
  description?: string
  default?: any
}

export interface IndustryConfig {
  id: IndustryType
  label: string
  icon: string
  features: {
    expiryTracking: boolean
    batchSystem: boolean
    serialNumberTracking: boolean
    vehicleCompatibility: boolean
    wholesaleLedger: boolean
    weighingScaleSupport: boolean
  }
  productFields: IndustryField[]
  posFeatures: {
    prescriptionCheck: boolean
    barcodeFocus: boolean
    quickQuantity: boolean
  }
}

export const INDUSTRY_PROFILES: Record<IndustryType, IndustryConfig> = {
  general: {
    id: "general",
    label: "General Store",
    icon: "Store",
    features: {
      expiryTracking: false,
      batchSystem: false,
      serialNumberTracking: false,
      vehicleCompatibility: false,
      wholesaleLedger: false,
      weighingScaleSupport: false,
    },
    productFields: [],
    posFeatures: {
      prescriptionCheck: false,
      barcodeFocus: true,
      quickQuantity: true,
    }
  },
  pharmacy: {
    id: "pharmacy",
    label: "Pharmacy / Medical Store",
    icon: "Pill",
    features: {
      expiryTracking: true,
      batchSystem: true,
      serialNumberTracking: false,
      vehicleCompatibility: false,
      wholesaleLedger: true,
      weighingScaleSupport: false,
    },
    productFields: [
      { name: "batchNumber", label: "Batch Number", type: "text", required: true, placeholder: "B-1234" },
      { name: "expiryDate", label: "Expiry Date", type: "date", required: true },
      { name: "dosage", label: "Dosage / Strength", type: "text", placeholder: "500mg" },
      { name: "manufacturer", label: "Manufacturer", type: "text", placeholder: "GSK, Pfizer..." },
      { name: "prescriptionRequired", label: "Prescription Required", type: "boolean" },
    ],
    posFeatures: {
      prescriptionCheck: true,
      barcodeFocus: true,
      quickQuantity: false,
    }
  },
  auto_parts: {
    id: "auto_parts",
    label: "Auto Parts & Spares",
    icon: "Car",
    features: {
      expiryTracking: false,
      batchSystem: false,
      serialNumberTracking: true,
      vehicleCompatibility: true,
      wholesaleLedger: true,
      weighingScaleSupport: false,
    },
    productFields: [
      { name: "partNumber", label: "Part Number", type: "text", required: true },
      { name: "vehicleCompatibility", label: "Vehicle Compatibility", type: "text", placeholder: "Civic 2016-2021, Corolla..." },
      { name: "oemNumber", label: "OEM Number", type: "text" },
      { name: "engineType", label: "Engine Type", type: "text", placeholder: "1.8L, V6..." },
    ],
    posFeatures: {
      prescriptionCheck: false,
      barcodeFocus: false,
      quickQuantity: true,
    }
  },
  grocery: {
    id: "grocery",
    label: "Grocery & Supermarket",
    icon: "ShoppingBag",
    features: {
      expiryTracking: true,
      batchSystem: false,
      serialNumberTracking: false,
      vehicleCompatibility: false,
      wholesaleLedger: false,
      weighingScaleSupport: true,
    },
    productFields: [
      { name: "expiryDate", label: "Expiry Date", type: "date" },
      { name: "isLooseItem", label: "Sold as Loose (Weight)", type: "boolean" },
    ],
    posFeatures: {
      prescriptionCheck: false,
      barcodeFocus: true,
      quickQuantity: true,
    }
  },
  electronics: {
    id: "electronics",
    label: "Electronics & Mobiles",
    icon: "Smartphone",
    features: {
      expiryTracking: false,
      batchSystem: false,
      serialNumberTracking: true,
      vehicleCompatibility: false,
      wholesaleLedger: true,
      weighingScaleSupport: false,
    },
    productFields: [
      { name: "imei", label: "IMEI / Serial Number", type: "text", required: true },
      { name: "warrantyPeriod", label: "Warranty (Months)", type: "number", placeholder: "12" },
      { name: "condition", label: "Condition", type: "select", options: ["New", "Refurbished", "Used"] },
    ],
    posFeatures: {
      prescriptionCheck: false,
      barcodeFocus: true,
      quickQuantity: true,
    }
  },
  wholesale: {
    id: "wholesale",
    label: "Wholesale Business",
    icon: "Truck",
    features: {
      expiryTracking: false,
      batchSystem: true,
      serialNumberTracking: false,
      vehicleCompatibility: false,
      wholesaleLedger: true,
      weighingScaleSupport: false,
    },
    productFields: [
      { name: "moq", label: "Minimum Order Qty", type: "number", default: 1 },
      { name: "caseQuantity", label: "Units per Case", type: "number" },
    ],
    posFeatures: {
      prescriptionCheck: false,
      barcodeFocus: false,
      quickQuantity: true,
    }
  },
  fashion: {
    id: "fashion",
    label: "Fashion & Apparel",
    icon: "Shirt",
    features: {
      expiryTracking: false,
      batchSystem: false,
      serialNumberTracking: false,
      vehicleCompatibility: false,
      wholesaleLedger: false,
      weighingScaleSupport: false,
    },
    productFields: [
      { name: "material", label: "Material / Fabric", type: "text" },
      { name: "season", label: "Season", type: "select", options: ["Summer", "Winter", "All Season"] },
      { name: "gender", label: "Gender", type: "select", options: ["Men", "Women", "Unisex", "Kids"] },
    ],
    posFeatures: {
      prescriptionCheck: false,
      barcodeFocus: true,
      quickQuantity: true,
    }
  }
}
