// Re-export auth types from the global types barrel.
// Feature-local types (form values) live in schema.ts.
export type { User, Role, LoginPayload, RegisterPayload, AuthResponse } from "@/types";
export type { LoginFormValues, RegisterFormValues } from "./schema";
