"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Lock, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  ShieldAlert,
  CheckCircle2,
  LockKeyhole
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthCard } from "@/components/auth/auth-card";
import ThemeToggle from "@/components/ui/theme-toggle";

const resetSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetFormValues = z.infer<typeof resetSchema>;

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetFormValues) => {
    setIsLoading(true);
    // UI Only
    console.log("Resetting Password:", data);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[var(--background)] transition-colors duration-500">
      {/* LEFT SIDE: Security Confirmation (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary/5 items-center justify-center p-12 border-r border-[var(--border)]">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px]" />
        
        <div className="relative z-10 w-full max-w-lg">
          <Link href="/" className="flex items-center gap-3 mb-12 group">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20">
              <span className="text-white font-black text-2xl">T</span>
            </div>
            <span className="text-3xl font-black gradient-text tracking-tighter">TijaratPro</span>
          </Link>

          <h1 className="text-5xl font-black leading-[1.1] mb-8">
            Create a <br />
            <span className="text-primary">New Password.</span>
          </h1>

          <div className="space-y-8 mb-12">
            {[
              { title: "Password Strength", desc: "Use a mix of letters, numbers, and symbols for maximum security." },
              { title: "One-Time Reset", desc: "Your recovery link and code will expire once the reset is successful." },
              { title: "Instant Update", desc: "Your new password takes effect immediately across all devices." }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-[var(--border)] flex items-center justify-center flex-shrink-0 group-hover:border-primary/50 transition-all">
                  <LockKeyhole size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">{feature.title}</h4>
                  <p className="text-[var(--text-soft)]">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card p-6 border-danger/10 shadow-2xl flex items-center gap-6 bg-danger/5">
             <div className="w-14 h-14 rounded-2xl bg-danger/10 flex items-center justify-center flex-shrink-0">
                <ShieldAlert size={28} className="text-danger" />
             </div>
             <p className="text-sm font-bold text-danger/80 leading-relaxed">
               "Never share your password with anyone. TijaratPro staff will never ask for your login credentials."
             </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Reset Form */}
      <div className="flex-1 relative flex flex-col items-center justify-center p-6 md:p-12">
        <div className="absolute top-8 right-8">
          <ThemeToggle />
        </div>

        <AuthCard className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          {!isSuccess ? (
            <>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black mb-2">Set New Password</h2>
                <p className="text-[var(--text-soft)] font-medium">Create a strong password to secure your account.</p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                  label="New Password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  leftIcon={<Lock />}
                  rightIcon={
                    <button type="button" onClick={() => setShowPass(!showPass)}>
                      {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  }
                  {...register("password")}
                  error={errors.password?.message}
                  required
                />

                <Input
                  label="Confirm New Password"
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••"
                  leftIcon={<Lock />}
                  {...register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                  required
                />

                <Button 
                  type="submit" 
                  className="w-full text-lg h-16" 
                  isLoading={isLoading}
                >
                  Save New Password
                  {!isLoading && <ChevronRight size={20} />}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-8 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-success/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-success/20">
                <CheckCircle2 size={40} className="text-success" />
              </div>
              <h2 className="text-3xl font-black mb-4">Password Updated</h2>
              <p className="text-[var(--text-soft)] font-medium mb-10 leading-relaxed">
                Your password has been successfully reset. You can now use your new credentials to login.
              </p>
              
              <Link href="/login" className="w-full">
                <Button className="w-full text-lg">
                  Go to Login
                  <ChevronRight size={20} />
                </Button>
              </Link>
            </div>
          )}
        </AuthCard>
      </div>
    </div>
  );
}
