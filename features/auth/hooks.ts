import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { queryKeys, ROUTES } from "@/lib/constants";
import { useAuthStore } from "@/store";
import { loginUser, registerUser, getMe } from "./api";
import type { LoginPayload, RegisterPayload } from "@/types";

// ─── useLogin ─────────────────────────────────────────────────────────────────
export function useLogin() {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: (res) => {
      if (!res.data) return;
      setAuth(res.data.user, res.data.token);
      toast.success(`Welcome back, ${res.data.user.name}!`);
      router.push(ROUTES.DASHBOARD);
    },
    onError: (err: { message: string }) => {
      toast.error(err.message ?? "Login failed. Please try again.");
    },
  });
}

// ─── useRegister ──────────────────────────────────────────────────────────────
export function useRegister() {
  const { setAuth } = useAuthStore();
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
    onSuccess: (res) => {
      if (!res.data) return;
      setAuth(res.data.user, res.data.token);
      toast.success("Account created! Welcome to TijaratPro.");
      router.push(ROUTES.DASHBOARD);
    },
    onError: (err: { message: string }) => {
      toast.error(err.message ?? "Registration failed. Please try again.");
    },
  });
}

// ─── useMe ────────────────────────────────────────────────────────────────────
// Hydrates/refreshes the logged-in user from the server.
export function useMe() {
  const { setUser, isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: async () => {
      const res = await getMe();
      if (res.data) setUser(res.data);
      return res.data ?? null;
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // re-use for 5 min
  });
}

// ─── useLogout ────────────────────────────────────────────────────────────────
export function useLogout() {
  const { clearAuth } = useAuthStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  return () => {
    clearAuth();
    queryClient.clear(); // wipe all cached data on logout
    toast.success("Logged out successfully.");
    router.push(ROUTES.LOGIN);
  };
}
