"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronRight, 
  ArrowLeft,
  ShieldCheck,
  Smartphone,
  Timer,
  RefreshCcw
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuthCard } from "@/components/auth/AuthCard";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function OTPVerifyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Verifying OTP:", otp.join(""));
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/reset-password";
    }, 2000);
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[var(--background)] transition-colors duration-500">
      {/* LEFT SIDE: Identity Verification (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary/5 items-center justify-center p-12 border-r border-[var(--border)]">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[120px]" />
        
        <div className="relative z-10 w-full max-w-lg">
          <Link href="/" className="flex items-center gap-3 mb-12 group">
            <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-xl shadow-primary/20 group-hover:rotate-12 transition-all">
              <span className="text-white font-black text-2xl">T</span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-black gradient-text tracking-tighter">TijaratPro</span>
              <span className="text-[10px] text-primary font-black uppercase tracking-[0.2em] leading-none">Identity Check</span>
            </div>
          </Link>

          <h1 className="text-5xl font-black leading-[1.1] mb-8">
            Verify Your <br />
            <span className="text-primary">Identity.</span>
          </h1>

          <div className="space-y-8 mb-12">
            {[
              { title: "2-Factor Security", desc: "We've sent a 6-digit code to protect your business account." },
              { title: "Encrypted Session", desc: "Your verification session is secured with 256-bit AES encryption." },
              { title: "Privacy Guaranteed", desc: "TijaratPro never shares your recovery details with third parties." }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-[var(--border)] flex items-center justify-center flex-shrink-0 group-hover:border-primary/50 transition-all">
                  <Smartphone size={24} className="text-primary" />
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
                <ShieldCheck size={28} className="text-primary" />
             </div>
             <p className="text-sm font-bold text-[var(--text-soft)] leading-relaxed">
               "Your security is our priority. Verification codes expire in 5 minutes for your protection."
             </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: OTP Form */}
      <div className="flex-1 relative flex flex-col items-center justify-center p-6 md:p-12">
        <div className="absolute top-8 right-8">
          <ThemeToggle />
        </div>

        <AuthCard className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black mb-2">Verify Code</h2>
            <p className="text-[var(--text-soft)] font-medium">Please enter the 6-digit code sent to your email.</p>
          </div>

          <form onSubmit={handleVerify} className="space-y-10">
            <div className="flex justify-between gap-2 md:gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => { inputRefs.current[index] = el; }}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-full h-14 md:h-16 text-center text-2xl font-black rounded-xl bg-[var(--bg-secondary)] border border-[var(--border)] focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-[var(--text)]"
                />
              ))}
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-soft)]">
                <Timer size={16} />
                <span>Expires in: <span className="text-primary">{formatTime(timeLeft)}</span></span>
              </div>
              
              <Button 
                type="submit" 
                className="w-full text-lg h-16" 
                isLoading={isLoading}
                disabled={otp.some(d => !d)}
              >
                Verify & Continue
                {!isLoading && <ChevronRight size={20} />}
              </Button>

              <button 
                type="button"
                disabled={timeLeft > 0}
                className="text-sm font-bold text-[var(--text-soft)] hover:text-primary transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCcw size={16} />
                Resend Verification Code
              </button>
            </div>
          </form>

          <div className="mt-10 text-center">
            <Link 
              href="/forgot-password" 
              className="text-[var(--text-soft)] font-bold hover:text-primary transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} />
              Change Email Address
            </Link>
          </div>
        </AuthCard>
      </div>
    </div>
  );
}
