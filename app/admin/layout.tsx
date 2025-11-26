"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { LayoutDashboard, FolderTree, Sparkles, Calendar, Gift, LogOut, Menu, X, CreditCard, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Skip auth check for login page
  const isLoginPage = pathname === "/admin/login"

  useEffect(() => {
    if (!isLoginPage) {
      checkAuth()
    } else {
      setLoading(false)
      setIsAuthenticated(true) // Allow login page to render
    }
  }, [isLoginPage, pathname])

  // Disable main document scroll when inside admin (each admin page has its own scrollable container)
  useEffect(() => {
    if (!isLoginPage) {
      try {
        document.documentElement.style.overflow = "hidden"
        document.body.style.overflow = "hidden"
      } catch (e) {
        // ignore in environments without document
      }
    } else {
      try {
        document.documentElement.style.overflow = ""
        document.body.style.overflow = ""
      } catch (e) {
        // ignore
      }
    }

    return () => {
      try {
        document.documentElement.style.overflow = ""
        document.body.style.overflow = ""
      } catch (e) {
        // ignore
      }
    }
  }, [isLoginPage])

  const checkAuth = async () => {
    const token = localStorage.getItem("admin_token")

    if (!token) {
      setLoading(false)
      router.push("/admin/login")
      return
    }

    try {
      const response = await fetch(`${API_URL}/api/auth/verify`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem("admin_token")
        localStorage.removeItem("admin_user")
        router.push("/admin/login")
      }
    } catch (error) {
      // If backend is not running, allow access if token exists (for development)
      // In production, you might want to redirect to login
      console.error("Auth check error:", error)
      const token = localStorage.getItem("admin_token")
      if (token) {
        // Allow access if token exists (backend might be down)
        setIsAuthenticated(true)
      } else {
        router.push("/admin/login")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_user")
    toast.success("Logged out successfully")
    router.push("/admin/login")
  }

  if (isLoginPage) {
    return <>{children}</>
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  const menuItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/categories", label: "Categories", icon: FolderTree },
    { href: "/admin/services", label: "Services", icon: Sparkles },
    { href: "/admin/reservations", label: "Reservations", icon: Calendar },
    { href: "/admin/offers", label: "Offers", icon: Gift },
    { href: "/admin/gift-cards", label: "Gift Cards", icon: CreditCard },
    { href: "/admin/users", label: "Gestion utilisateur", icon: Users },
  ]

  return (
    <div className="h-screen bg-gray-100 flex flex-col overflow-hidden admin-layout-bg">
      <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-2 flex items-center justify-between flex-shrink-0 shadow-sm">
        <div className="relative h-10 w-10 md:h-12 md:w-12 ml-0 md:ml-16">
          <Image src="/logo.svg" alt="Mor Thai Logo" fill className="object-contain" priority />
        </div>

        <div className="hidden md:flex items-center gap-2">
          <div className="text-right">
            <h1 className="text-xl font-semibold text-gray-900">Mor Thai Admin</h1>
            <p className="text-xs text-gray-500">Panel</p>
          </div>
        </div>

        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden">
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r transform transition-transform duration-200 ease-in-out lg:transition-none h-full`}
        >
          <div className="h-full flex flex-col relative z-10">
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => {
                const IconComponent = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive ? "bg-primary text-primary-foreground" : "text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {IconComponent && <IconComponent className="h-5 w-5" />}
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </nav>
            <div className="p-4 border-t flex-shrink-0">
              <Button variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto lg:ml-0">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setSidebarOpen(false)} />
      )}
    </div>
  )
}
