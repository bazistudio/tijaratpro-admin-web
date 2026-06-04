export type ModuleType = 
  | "PRODUCTS" 
  | "INVENTORY" 
  | "SALES" 
  | "EXPIRY_TRACKING" 
  | "COMPATIBILITY" 
  | "IMEI_TRACKING"
  | "REPORTS"
  | "SETTINGS";

export interface ModuleField {
  name: string
  label: string
  type: "text" | "number" | "date" | "select" | "boolean"
  placeholder?: string
  required?: boolean
  options?: string[]
  description?: string
  default?: any
}

export interface ModuleConfig {
  id: ModuleType
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
  productFields: ModuleField[]
  posFeatures: {
    prescriptionCheck: boolean
    barcodeFocus: boolean
    quickQuantity: boolean
  }
}

export const MODULE_FIELD_PROFILES: Record<string, ModuleConfig> = {
  EXPIRY_TRACKING: {
    id: "EXPIRY_TRACKING",
    label: "Expiry & Batch Tracking",
    icon: "Clock",
    features: {
      expiryTracking: true,
      batchSystem: true,
      serialNumberTracking: false,
      vehicleCompatibility: false,
      wholesaleLedger: false,
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
  COMPATIBILITY: {
    id: "COMPATIBILITY",
    label: "Vehicle Compatibility",
    icon: "Truck",
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
  IMEI_TRACKING: {
    id: "IMEI_TRACKING",
    label: "IMEI & Serial Tracking",
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
  }
};
