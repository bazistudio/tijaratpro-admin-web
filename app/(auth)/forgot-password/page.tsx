"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Mail, 
  ChevronRight, 
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Key
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AuthCard } from "@/components/auth/auth-card";
import ThemeToggle from "@/components/ui/theme-toggle";

const forgotSchema = z.object({
  email: z.string().email("Please enter a valid business email"),
});

type ForgotFormValues = z.infer<typeof forgotSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormValues>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotFormValues) => {
    setIsLoading(true);
    // UI Only for now
    console.log("Forgot Password Data:", data);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[var(--background)] transition-colors duration-500">
      {/* LEFT SIDE: Security & Support (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary/5 items-center justify-center p-12 border-r border-[var(--border)]">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px]" />
        
        <div className="relative z-10 w-full max-w-lg">
          <Link href="/" className="flex items-center gap-3 mb-12 group">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 group-hover:rotate-12 transition-all">
              <span className="text-white font-black text-2xl">T</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black gradient-text tracking-tighter">TijaratPro</span>
              <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em] leading-none text-center">Safety First</span>
            </div>
          </Link>

          <h1 className="text-5xl font-black leading-[1.1] mb-8">
            Secure Your <br />
            <span className="text-primary">Business Access.</span>
          </h1>

          <div className="space-y-8 mb-12">
            {[
              { title: "Zero Trust Protocol", desc: "Every password reset is verified through encrypted OTP channels." },
              { title: "Account Recovery", desc: "Our 24/7 support team is here to help you regain access if needed." },
              { title: "Active Monitoring", desc: "We track suspicious login attempts to keep your shop data safe." }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-[var(--border)] flex items-center justify-center flex-shrink-0 group-hover:border-primary/50 transition-all">
                  <ShieldCheck size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">{feature.title}</h4>
                  <p className="text-[var(--text-soft)]">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card p-6 border-primary/10 shadow-2xl flex items-center gap-6">
             <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Key size={28} className="text-primary" />
             </div>
             <p className="text-sm font-bold text-[var(--text-soft)] leading-relaxed">
               "Security is our top priority. We use industry-standard encryption to protect your shop's credentials."
             </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Reset Request Form */}
      <div className="flex-1 relative flex flex-col items-center justify-center p-6 md:p-12">
        <div className="absolute top-8 right-8">
          <ThemeToggle />
        </div>

        <AuthCard className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          {!isSubmitted ? (
            <>
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black mb-2">Forgot Password?</h2>
                <p className="text-[var(--text-soft)] font-medium">Enter your email to receive a secure recovery code.</p>
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

                <Button 
                  type="submit" 
                  className="w-full text-lg" 
                  isLoading={isLoading}
                >
                  Send Recovery OTP
                  {!isLoading && <ChevronRight size={20} />}
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-8 animate-in fade-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-success/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-success/20">
                <CheckCircle2 size={40} className="text-success" />
              </div>
              <h2 className="text-3xl font-black mb-4">Check Your Email</h2>
              <p className="text-[var(--text-soft)] font-medium mb-10 leading-relaxed">
                We've sent a 6-digit verification code to <span className="text-[var(--text)] font-bold">your email</span>. 
                Please enter it to reset your password.
              </p>
              
              <Link href="/verify-otp" className="w-full">
                <Button className="w-full text-lg mb-6">
                  Proceed to Verification
                  <ChevronRight size={20} />
                </Button>
              </Link>
              
              <button 
                onClick={() => setIsSubmitted(false)}
                className="text-sm font-bold text-[var(--text-soft)] hover:text-primary transition-colors flex items-center justify-center gap-2 mx-auto"
              >
                <ArrowLeft size={16} />
                Didn't receive email? Try again
              </button>
            </div>
          )}

          {!isSubmitted && (
            <div className="mt-10 text-center">
              <Link 
                href="/login" 
                className="text-[var(--text-soft)] font-bold hover:text-primary transition-colors flex items-center justify-center gap-2"
              >
                <ArrowLeft size={18} />
                Back to Login
              </Link>
            </div>
          )}
        </AuthCard>
      </div>
    </div>
  );
}
