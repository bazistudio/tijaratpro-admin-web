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
  User,
  Store,
  CheckCircle2,
  Globe
} from "lucide-react";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthCard } from "@/components/auth/auth-card";
import ThemeToggle from "@/components/ui/ThemeToggle";
import axiosInstance, { setStoredToken } from "@/lib/api/axios";

const signupSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Please enter a valid business email"),
  shopName: z.string().min(3, "Shop name must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  agreeTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post("/api/auth/register", {
        name: data.fullName,
        email: data.email,
        password: data.password,
        shopName: data.shopName,
      });

      if (res.data.success) {
        setStoredToken(res.data.token);
        // Navigate to login or dashboard
        router.push("/login?registered=true");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[var(--background)] transition-colors duration-500">
      {/* LEFT SIDE: Branding & Trust (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary/5 items-center justify-center p-12 border-r border-[var(--border)]">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px]" />
        
        <div className="relative z-10 w-full max-w-lg">
          <Link href="/" className="flex items-center gap-3 mb-12 group">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 group-hover:rotate-12 transition-all">
              <span className="text-white font-black text-2xl">T</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black gradient-text tracking-tighter">TijaratPro</span>
            </div>
          </Link>

          <h1 className="text-5xl font-black leading-[1.1] mb-8">
            The Future of Retail <br />
            <span className="text-primary">Starts With You.</span>
          </h1>

          <div className="space-y-8 mb-12">
            {[
              { title: "One-Click Billing", desc: "Fastest POS in Pakistan for lightning speed checkouts." },
              { title: "Multi-Shop Ready", desc: "Manage 100+ branches from a single unified dashboard." },
              { title: "Smart Inventory", desc: "AI-powered alerts for low stock and expiring items." }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-[var(--border)] flex items-center justify-center flex-shrink-0 group-hover:border-primary/50 transition-all">
                  <CheckCircle2 size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">{feature.title}</h4>
                  <p className="text-[var(--text-soft)]">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card p-6 border-primary/10 shadow-2xl relative overflow-hidden">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Store size={20} className="text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-primary uppercase tracking-widest">New Shop Registration</span>
                  <span className="text-xs text-[var(--text-soft)]">Real-time setup assistant</span>
                </div>
             </div>
             <div className="space-y-2">
                <div className="h-2 w-full bg-[var(--bg-secondary)] rounded-full overflow-hidden">
                  <div className="h-full w-[35%] bg-primary rounded-full animate-pulse" />
                </div>
                <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-[var(--text-soft)]">
                  <span>Step 1: Account</span>
                  <span>35% Complete</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Signup Form */}
      <div className="flex-1 relative flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto">
        <div className="absolute top-8 right-8">
          <ThemeToggle />
        </div>

        <AuthCard className="my-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-2">Create Shop Account</h2>
            <p className="text-[var(--text-soft)] font-medium">Join 500+ businesses scaling with TijaratPro.</p>
            {error && (
              <div className="mt-4 p-3 bg-danger/10 border border-danger/20 rounded-xl text-danger text-xs font-black uppercase tracking-widest">
                {error}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                label="Full Name"
                placeholder="John Doe"
                leftIcon={<User />}
                {...register("fullName")}
                error={errors.fullName?.message}
                required
              />
              <Input
                label="Shop Name"
                placeholder="Elite Mobile Store"
                leftIcon={<Store />}
                {...register("shopName")}
                error={errors.shopName?.message}
                required
              />
            </div>

            <Input
              label="Business Email"
              type="email"
              placeholder="owner@shop.com"
              leftIcon={<Mail />}
              {...register("email")}
              error={errors.email?.message}
              required
            />

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

            <div className="space-y-3 px-1">
              <div className="flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="agreeTerms" 
                  {...register("agreeTerms")}
                  className="mt-1 w-4 h-4 rounded border-[var(--border)] bg-[var(--bg-secondary)] text-primary focus:ring-primary/20"
                />
                <label htmlFor="agreeTerms" className="text-sm font-medium text-[var(--text-soft)] leading-tight cursor-pointer select-none">
                  I agree to the <Link href="/terms" className="text-primary font-bold hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary font-bold hover:underline">Privacy Policy</Link>.
                </label>
              </div>
              {errors.agreeTerms && <p className="text-xs font-bold text-danger ml-7">{errors.agreeTerms.message}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full text-lg" 
              isLoading={isLoading}
            >
              Initialize Shop Account
              {!isLoading && <ChevronRight size={20} />}
            </Button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[var(--border)]"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-widest font-black">
                <span className="bg-[var(--card)] px-4 text-[var(--text-soft)]">Or join with</span>
              </div>
            </div>

            <Button 
              type="button" 
              variant="outline" 
              className="w-full h-14 rounded-2xl flex items-center justify-center gap-3 hover:bg-[var(--bg-secondary)]"
            >
              <Globe size={20} className="text-primary" />
              Sign up with Google
            </Button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-[var(--text-soft)] font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-primary font-black hover:underline underline-offset-4">
                Login to Dashboard
              </Link>
            </p>
          </div>
        </AuthCard>
      </div>
    </div>
  );
}
