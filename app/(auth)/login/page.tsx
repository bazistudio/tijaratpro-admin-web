"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Loader2, Mail, Lock } from "lucide-react";

import { useLogin } from "@/features/auth/hooks";
import { loginSchema, type LoginFormValues } from "@/features/auth/schema";
import { ROUTES } from "@/lib/constants";

export default function LoginPage() {
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0a0a0c] p-4 relative overflow-hidden">
      
      {/* Background aesthetics */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/20 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] rounded-full bg-purple-500/20 blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 shadow-xl relative z-10 transition-all">
        
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500 text-white font-bold text-xl shadow-lg shadow-indigo-500/30 mb-4">
            T
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Welcome back</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
            Sign in to your TijaratPro account
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
            </label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                {...form.register("email")}
                placeholder="admin@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-xs text-rose-500 mt-1">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type={showPassword ? "text" : "password"}
                {...form.register("password")}
                placeholder="••••••••"
                className="w-full pl-10 pr-12 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-slate-400 hover:text-indigo-500"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {form.formState.errors.password && (
              <p className="text-xs text-rose-500 mt-1">{form.formState.errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-70 text-white font-medium py-2.5 rounded-lg transition-colors mt-2"
          >
            {loginMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : "Sign in"}
          </button>
        </form>

      </div>
    </div>
  );
}
