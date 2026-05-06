"use client"

import * as React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api"
import { toast } from "sonner"
import { ChevronLeft } from "lucide-react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const res = await api("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email })
      })
      
      if (res.ok) {
        setIsSubmitted(true)
        toast.success("Reset link sent!")
      } else {
        const data = await res.json()
        toast.error(data.message || "Something went wrong")
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
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Forgot Password?</h1>
          <p className="text-muted-foreground">
            No worries, we'll send you reset instructions.
          </p>
        </div>

        {isSubmitted ? (
          <div className="space-y-6 text-center animate-in fade-in slide-in-from-bottom-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success">
              <span className="material-symbols-outlined text-4xl">mail</span>
            </div>
            <div className="space-y-2">
              <p className="font-medium text-foreground">Check your email</p>
              <p className="text-sm text-muted-foreground">
                We've sent a password reset link to <span className="font-semibold text-foreground">{email}</span>
              </p>
            </div>
            <Button variant="outline" className="w-full" onClick={() => setIsSubmitted(false)}>
              Try another email
            </Button>
            <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground">
               <ChevronLeft className="h-4 w-4" /> Back to login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-xl"
              />
            </div>
            <Button type="submit" className="w-full h-12" disabled={isLoading}>
              {isLoading ? "Sending..." : "Reset Password"}
            </Button>
            
            <Link href="/login" className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground">
               <ChevronLeft className="h-4 w-4" /> Back to login
            </Link>
          </form>
        )}
      </div>
    </div>
  )
}
