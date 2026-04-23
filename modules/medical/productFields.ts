export const medicalProductFields = [
  { name: "manufacturer", label: "Manufacturer", type: "text", placeholder: "e.g. GSK" },
  { name: "batchNumber", label: "Batch Number", type: "text", placeholder: "e.g. BN-12345" },
  { name: "expiryDate", label: "Expiry Date", type: "date", placeholder: "" },
  { name: "dosage", label: "Dosage", type: "text", placeholder: "e.g. 500mg" },
];

export const medicalProductColumns = [
  { accessorKey: "manufacturer", header: "Manufacturer" },
  { accessorKey: "expiryDate", header: "Expiry" },
];
