"use client"

import * as React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuthStore } from "@/store"
import { toast } from "sonner"
import { Eye, EyeOff, Lock, Mail, ChevronRight, Store } from "lucide-react"

const loginSchema = z.object({
  identifier: z.string().min(3, "Required"),
  password: z.string().min(6, "Min 6 characters"),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const setAuth = useAuthStore((state) => state.setAuth)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const responseData = await res.json()

      if (!res.ok) {
        throw new Error(responseData.message || "Invalid credentials")
      }

      if (responseData.token) {
        localStorage.setItem("token", responseData.token)
        if (responseData.user) {
          setAuth(responseData.user, responseData.token)
        }
        toast.success("Welcome back to TijaratPro!")
        router.push("/dashboard")
      }
    } catch (err: any) {
      toast.error(err.message || "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0a0a0b]">
      {/* Decorative Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/10 blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px] animate-pulse delay-700" />
      
      <div className="w-full max-w-md px-6 z-10">
        <div className="text-center mb-10 animate-in fade-in slide-in-from-top-8 duration-700">
           <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20 shadow-[0_0_20px_rgba(var(--primary),0.2)]">
              <Store className="w-8 h-8 text-primary" />
           </div>
           <h1 className="text-4xl font-extrabold tracking-tight text-white mb-2">TijaratPro</h1>
           <p className="text-muted-foreground text-lg">Next-Gen Business Intelligence</p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-[2.5rem] p-10 shadow-2xl animate-in fade-in zoom-in-95 duration-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="identifier" className="text-sm font-medium text-zinc-300 ml-1">Account Identifier</Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                <Input
                  id="identifier"
                  placeholder="email or phone number"
                  {...register("identifier")}
                  className="h-14 bg-white/[0.03] border-white/[0.1] rounded-2xl pl-11 focus:ring-primary focus:border-primary transition-all text-white placeholder:text-zinc-600"
                />
              </div>
              {errors.identifier && <p className="text-xs text-destructive ml-1">{errors.identifier.message}</p>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label htmlFor="password" title="Password" className="text-sm font-medium text-zinc-300">Password</Label>
                <Link href="/forgot-password" title="Forgot password?" className="text-xs text-primary hover:underline font-medium">Forgot Access?</Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className="h-14 bg-white/[0.03] border-white/[0.1] rounded-2xl pl-11 focus:ring-primary focus:border-primary transition-all text-white placeholder:text-zinc-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-destructive ml-1">{errors.password.message}</p>}
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 rounded-2xl text-base font-bold shadow-[0_0_20px_rgba(var(--primary),0.3)] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group" 
              disabled={isLoading}
            >
              {isLoading ? "Synchronizing..." : "Authorize Access"}
              {!isLoading && <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/[0.05] text-center">
            <p className="text-zinc-500 text-sm">
              New business owner?{" "}
              <Link href="/register" className="text-white hover:text-primary font-bold transition-colors">Apply for Shop Account</Link>
            </p>
          </div>
        </div>

        <div className="mt-10 text-center animate-in fade-in duration-1000 delay-500">
           <p className="text-zinc-600 text-xs tracking-widest uppercase font-medium">Securely Protected by Tijarat Intelligence Engine</p>
        </div>
      </div>
    </div>
  )
}
