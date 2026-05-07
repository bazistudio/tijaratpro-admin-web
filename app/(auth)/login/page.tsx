"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ChevronRight, 
  LayoutDashboard, 
  TrendingUp, 
  ShieldCheck,
  Chrome
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthCard } from "@/components/auth/AuthCard";
import ThemeToggle from "@/components/ui/ThemeToggle";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid business email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    // UI Only for now as per requirements
    console.log("Login Data:", data);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[var(--background)] transition-colors duration-500">
      {/* LEFT SIDE: Branding & Preview (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary/5 items-center justify-center p-12">
        {/* Floating Background Effects */}
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[100px]" />
        
        <div className="relative z-10 w-full max-w-lg">
          <Link href="/" className="flex items-center gap-3 mb-12 group">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 group-hover:rotate-12 transition-transform duration-500">
              <span className="text-white font-black text-2xl">T</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black gradient-text tracking-tighter">TijaratPro</span>
              <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em] leading-none">Enterprise Intelligence</span>
            </div>
          </Link>

          <h1 className="text-5xl font-black leading-[1.1] mb-6">
            Manage Your Business <br />
            <span className="text-primary">Smarter, Not Harder.</span>
          </h1>
          <p className="text-xl text-[var(--text-soft)] mb-12 leading-relaxed">
            The all-in-one ERP system built for Pakistani shop owners to scale their operations with cloud-ready intelligence.
          </p>

          {/* Dashboard Preview Card */}
          <div className="glass-card p-6 border-primary/20 shadow-2xl float-animation">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <LayoutDashboard size={20} className="text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">Revenue Overview</span>
                  <span className="text-[10px] text-[var(--text-soft)]">Real-time synchronization</span>
                </div>
              </div>
              <div className="px-3 py-1 rounded-full bg-success/10 text-success text-[10px] font-black uppercase tracking-wider">
                Live
              </div>
            </div>
            
            <div className="flex items-end gap-3 h-32 mb-4">
              {[40, 70, 45, 90, 65, 80, 50].map((h, i) => (
                <div key={i} className="flex-1 bg-primary/20 rounded-t-lg" style={{ height: `${h}%` }} />
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
                <div className="flex items-center gap-2 mb-1 text-success">
                  <TrendingUp size={14} />
                  <span className="text-[10px] font-black">+12.5%</span>
                </div>
                <div className="text-lg font-black tracking-tight">₨ 45,280</div>
                <div className="text-[10px] text-[var(--text-soft)] font-bold uppercase tracking-wider">Today's Profit</div>
              </div>
              <div className="p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)]">
                <div className="flex items-center gap-2 mb-1 text-primary">
                  <ShieldCheck size={14} />
                  <span className="text-[10px] font-black">Secure</span>
                </div>
                <div className="text-lg font-black tracking-tight">342</div>
                <div className="text-[10px] text-[var(--text-soft)] font-bold uppercase tracking-wider">Total Sales</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Login Form */}
      <div className="flex-1 relative flex flex-col items-center justify-center p-6 md:p-12">
        <div className="absolute top-8 right-8">
          <ThemeToggle />
        </div>

        <AuthCard className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-2">Welcome Back</h2>
            <p className="text-[var(--text-soft)] font-medium">Enter your credentials to access your shop.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Business Email"
              type="email"
              placeholder="name@business.com"
              leftIcon={<Mail />}
              {...register("email")}
              error={errors.email?.message}
              required
            />

            <div className="space-y-1">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                leftIcon={<Lock />}
                rightIcon={
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                }
                {...register("password")}
                error={errors.password?.message}
                required
              />
              <div className="flex justify-end px-1">
                <Link 
                  href="/forgot-password" 
                  className="text-xs font-bold text-primary hover:underline transition-all"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            <div className="flex items-center gap-3 px-1">
              <input 
                type="checkbox" 
                id="rememberMe" 
                {...register("rememberMe")}
                className="w-4 h-4 rounded border-[var(--border)] bg-[var(--bg-secondary)] text-primary focus:ring-primary/20"
              />
              <label htmlFor="rememberMe" className="text-sm font-bold text-[var(--text-soft)] cursor-pointer select-none">
                Remember this device
              </label>
            </div>

            <Button 
              type="submit" 
              className="w-full text-lg" 
              isLoading={isLoading}
            >
              Sign In to Dashboard
              {!isLoading && <ChevronRight size={20} />}
            </Button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--border)]"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-black">
                <span className="bg-[var(--card)] px-4 text-[var(--text-soft)]">Or continue with</span>
              </div>
            </div>

            <Button 
              type="button" 
              variant="outline" 
              className="w-full h-14 rounded-2xl flex items-center justify-center gap-3 hover:bg-[var(--bg-secondary)]"
            >
              <Chrome size={20} className="text-primary" />
              Sign in with Google
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[var(--text-soft)] font-medium">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary font-black hover:underline underline-offset-4">
                Create Shop Account
              </Link>
            </p>
          </div>
        </AuthCard>

        {/* Mobile Logo Only */}
        <div className="lg:hidden mt-12 flex flex-col items-center">
           <Link href="/" className="flex items-center gap-2 group mb-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20">
              <span className="text-white font-black text-sm">T</span>
            </div>
            <span className="text-xl font-black gradient-text tracking-tighter">TijaratPro</span>
          </Link>
          <p className="text-[var(--text-soft)] text-xs font-bold uppercase tracking-widest">Enterprise Edition</p>
        </div>
      </div>
    </div>
  );
}
