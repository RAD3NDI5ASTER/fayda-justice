"use client"

import type React from "react"

import { useState } from "react"
import { Eye, EyeOff, Shield, ArrowRight, CheckCircle, Lock, User } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState<"fayda" | "traditional">("fayda")
  const [formData, setFormData] = useState({
    faydaId: "",
    email: "",
    password: "",
    rememberMe: false,
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<any>({})

  const router = useRouter()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev: any) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: any = {}

    if (loginMethod === "fayda") {
      if (!formData.faydaId) {
        newErrors.faydaId = "Fayda ID is required"
      } else if (!/^FAY-\d{3}-\d{4}$/.test(formData.faydaId)) {
        newErrors.faydaId = "Invalid Fayda ID format (FAY-XXX-XXXX)"
      }
    } else {
      if (!formData.email) {
        newErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Invalid email format"
      }
    }

    if (!formData.password) {
      newErrors.password = "Password is required"
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock successful login
      if (loginMethod === "fayda") {
        localStorage.setItem(
          "faydaUser",
          JSON.stringify({
            faydaId: formData.faydaId,
            verified: true,
            role: "citizen",
            loginTime: new Date().toISOString(),
          }),
        )
      } else {
        localStorage.setItem(
          "faydaUser",
          JSON.stringify({
            email: formData.email,
            verified: true,
            role: "court-official",
            loginTime: new Date().toISOString(),
          }),
        )
      }

      // Redirect to dashboard
      router.push("/")
    } catch (error) {
      setErrors({ general: "Login failed. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleFaydaOIDC = () => {
    setIsLoading(true)
    // Simulate VeriFayda OIDC redirect
    setTimeout(() => {
      localStorage.setItem(
        "faydaUser",
        JSON.stringify({
          faydaId: "FAY-123-4567",
          verified: true,
          role: "citizen",
          loginTime: new Date().toISOString(),
          oidcVerified: true,
        }),
      )
      router.push("/")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23374151' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">FaydaJustice</h1>
              <p className="text-sm text-gray-400">Digital Court & Legal Services</p>
            </div>
          </div>
          <p className="text-gray-300">Sign in to access the Ethiopian legal system</p>
        </div>

        {/* Login Methods Toggle */}
        <div className="flex mb-6 bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setLoginMethod("fayda")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              loginMethod === "fayda" ? "bg-orange-500 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Fayda ID
            </div>
          </button>
          <button
            onClick={() => setLoginMethod("traditional")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
              loginMethod === "traditional" ? "bg-orange-500 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <User className="w-4 h-4" />
              Traditional
            </div>
          </button>
        </div>

        {/* Login Card */}
        <Card className="bg-gray-800/50 border-gray-700 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-center text-white">
              {loginMethod === "fayda" ? "Sign in with Fayda ID" : "Sign in with Email"}
            </CardTitle>
            {loginMethod === "fayda" && (
              <div className="flex justify-center">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  VeriFayda OIDC Secured
                </Badge>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            {/* VeriFayda OIDC Button */}
            {loginMethod === "fayda" && (
              <Button
                onClick={handleFaydaOIDC}
                disabled={isLoading}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Connecting to VeriFayda...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Continue with VeriFayda OIDC
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            )}

            {loginMethod === "fayda" && (
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">Or sign in manually</span>
                </div>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Fayda ID or Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {loginMethod === "fayda" ? "Fayda National ID" : "Email Address"}
                </label>
                <Input
                  type={loginMethod === "fayda" ? "text" : "email"}
                  placeholder={loginMethod === "fayda" ? "FAY-123-4567" : "your.email@example.com"}
                  value={loginMethod === "fayda" ? formData.faydaId : formData.email}
                  onChange={(e) => handleInputChange(loginMethod === "fayda" ? "faydaId" : "email", e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                  disabled={isLoading}
                />
                {errors[loginMethod === "fayda" ? "faydaId" : "email"] && (
                  <p className="text-red-400 text-sm mt-1">{errors[loginMethod === "fayda" ? "faydaId" : "email"]}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    className="bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-10"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={formData.rememberMe}
                    onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
                    className="border-gray-600"
                  />
                  <label htmlFor="remember" className="text-sm text-gray-300">
                    Remember me
                  </label>
                </div>
                <Link href="/forgot-password" className="text-sm text-orange-400 hover:text-orange-300">
                  Forgot password?
                </Link>
              </div>

              {/* Error Message */}
              {errors.general && (
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <p className="text-red-400 text-sm">{errors.general}</p>
                </div>
              )}

              {/* Login Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing in...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    Sign In
                  </div>
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-medium mb-2">Demo Credentials:</h4>
              <div className="space-y-1 text-sm text-gray-300">
                <p>
                  <strong>Fayda ID:</strong> FAY-123-4567
                </p>
                <p>
                  <strong>Email:</strong> demo@faydajustice.et
                </p>
                <p>
                  <strong>Password:</strong> demo123
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 space-y-4">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/help" className="hover:text-white">
              Help
            </Link>
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
            <Shield className="w-4 h-4" />
            <span>Secured by Ethiopian Government Digital ID System</span>
          </div>

          <p className="text-xs text-gray-500">
            © 2024 FaydaJustice. All rights reserved. | Developed for Ethiopian Legal System
          </p>
        </div>
      </div>
    </div>
  )
}
