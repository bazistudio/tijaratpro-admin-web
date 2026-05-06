"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { ChevronLeft, Eye, EyeOff } from "lucide-react"

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!token) {
      toast.error("Invalid reset link")
      router.push("/login")
    }
  }, [token, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match")
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 characters")
    }

    setIsLoading(true)
    try {
      const res = await api("/auth/reset-password", {
        method: "POST",
        body: JSON.stringify({ token, password })
      })
      
      if (res.ok) {
        toast.success("Password reset successful!")
        router.push("/login")
      } else {
        const data = await res.json()
        toast.error(data.message || "Failed to reset password")
      }
    } catch (err) {
      toast.error("Failed to connect to server")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <div className="w-full max-w-md space-y-8 rounded-3xl bg-card p-10 shadow-xl border border-border/50">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Set New Password</h1>
          <p className="text-muted-foreground">
            Choose a strong password to secure your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-500">
          <div className="space-y-2 relative">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 rounded-xl pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-12 rounded-xl"
            />
          </div>

          <Button type="submit" className="w-full h-12" disabled={isLoading}>
            {isLoading ? "Updating..." : "Reset Password"}
          </Button>
          
          <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground">
             <ChevronLeft className="h-4 w-4" /> Back to login
          </Link>
        </form>
      </div>
    </div>
  )
}
