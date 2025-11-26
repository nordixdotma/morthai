"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import { Lock, Mail, AlertCircle } from "lucide-react"

export default function AdminLoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Server error" }))
        const errorMessage = errorData.error || "Login failed"
        setError("These credentials do not match our records.")
        toast.error(errorMessage)
        setLoading(false)
        return
      }

      const data = await response.json()

      // Store token in localStorage
      localStorage.setItem("admin_token", data.token)
      localStorage.setItem("admin_user", JSON.stringify(data.user))

      if (rememberMe) {
        // Store remember me preference
        localStorage.setItem("remember_me", "true")
      }

      toast.success("Login successful!")
      router.push("/admin/dashboard")
    } catch (error: any) {
      console.error("Login error:", error)
      setError("These credentials do not match our records.")
      if (error.message?.includes("Failed to fetch") || error.message?.includes("NetworkError")) {
        toast.error("Cannot connect to server. Please make sure the backend is running on port 3001.")
      } else {
        toast.error("Connection error. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: "url(/sections/e2.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 space-y-6">
          {/* Logo only - no text below */}
          <div className="flex justify-center mb-4">
            <div className="relative h-14 w-14">
              <Image src="/logo.svg" alt="Mor Thai Logo" fill className="object-contain" priority />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-1 text-center">
            <h2 className="text-3xl font-bold" style={{ color: "#8B4513" }}>
              Connexion.
            </h2>
            <p className="text-gray-600 text-xs">
              Connectez-vous avec les données que vous avez saisies lors de votre création de compte.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1.5">
              <Label htmlFor="username" className="text-gray-700 text-sm">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Entrez votre email"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value)
                    setError("")
                  }}
                  className="pl-9 h-10 border-gray-300 focus:border-primary focus:ring-primary text-sm"
                  required
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center gap-2 text-red-600 text-xs">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            {/* Password Field */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-gray-700 text-sm">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError("")
                  }}
                  className="pl-9 h-10 border-gray-300 focus:border-primary focus:ring-primary text-sm"
                  required
                />
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center space-x-2 pt-1">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(checked) => setRememberMe(checked === true)}
              />
              <Label htmlFor="remember" className="text-xs text-gray-600 cursor-pointer">
                Remember me
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-10 text-sm font-semibold mt-4"
              style={{ backgroundColor: "#8B4513" }}
              disabled={loading}
            >
              {loading ? "Connexion..." : "Se connecter"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
