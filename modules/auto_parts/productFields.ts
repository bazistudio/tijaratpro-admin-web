export const autoPartsProductFields = [
  { name: "vehicleModel", label: "Vehicle Model", type: "text", placeholder: "e.g. Toyota Corolla" },
  { name: "partNumber", label: "Part Number", type: "text", placeholder: "e.g. TP-990-12" },
  { name: "engineType", label: "Engine Type", type: "text", placeholder: "e.g. 1.8L Hybrid" },
  { name: "compatibility", label: "Compatibility", type: "textarea", placeholder: "Models supported..." },
];

export const autoPartsProductColumns = [
  { accessorKey: "vehicleModel", header: "Vehicle" },
  { accessorKey: "partNumber", header: "Part #" },
];
