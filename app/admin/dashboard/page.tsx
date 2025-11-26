"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FolderTree, Calendar, Gift, Sparkles } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"

function AdminDashboard() {
  type ChartPoint = { name: string; reservations: number; offers: number; services: number }
  const [stats, setStats] = useState({
    categories: 0,
    services: 0,
    reservations: 0,
    offers: 0,
  })
  const [loading, setLoading] = useState(true)
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  const [chartData, setChartData] = useState<ChartPoint[]>([])
  const [recentReservations, setRecentReservations] = useState<any[]>([])
  const [recentOffers, setRecentOffers] = useState<any[]>([])

  useEffect(() => {
    fetchStats()
    fetchChartData()
    fetchRecentItems()
  }, [selectedPeriod])

  const fetchStats = async () => {
    const token = localStorage.getItem("admin_token")

    try {
      const [categoriesRes, servicesRes, reservationsRes, offersRes] = await Promise.all([
        fetch(`${API_URL}/api/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/services`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/reservations`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/offres`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      const categories = await categoriesRes.json()
      const services = await servicesRes.json()
      const reservations = await reservationsRes.json()
      const offers = await offersRes.json()

      setStats({
        categories: Array.isArray(categories) ? categories.length : 0,
        services: Array.isArray(services) ? services.length : 0,
        reservations: Array.isArray(reservations) ? reservations.length : 0,
        offers: Array.isArray(offers) ? offers.length : 0,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchChartData = async () => {
    const token = localStorage.getItem("admin_token")

    try {
      const [reservationsRes, offersRes, servicesRes] = await Promise.all([
        fetch(`${API_URL}/api/reservations`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/offres`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/services`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      const reservations = await reservationsRes.json()
      const offers = await offersRes.json()
      const services = await servicesRes.json()

      // Process data based on selected period
      const processedData = processChartData(
        Array.isArray(reservations) ? reservations : [],
        Array.isArray(offers) ? offers : [],
        Array.isArray(services) ? services : [],
        selectedPeriod,
      )

      setChartData(processedData)
    } catch (error) {
      console.error("Error fetching chart data:", error)
      setChartData([])
    }
  }

  const processChartData = (reservations: any[], offers: any[], services: any[], period: string) => {
    const now = new Date()
    const data: Record<string, any> = {}

    const getKey = (date: string | undefined) => {
      if (!date) return null
      const d = new Date(date)

      if (period === "week") {
        const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        // Get dates from past 7 days
        const lastWeekStart = new Date(now)
        lastWeekStart.setDate(now.getDate() - 6)
        if (d >= lastWeekStart && d <= now) {
          return days[d.getDay()]
        }
      } else if (period === "month") {
        // Get dates from past 4 weeks
        const lastMonthStart = new Date(now)
        lastMonthStart.setDate(now.getDate() - 28)
        if (d >= lastMonthStart && d <= now) {
          const weekNum = Math.floor((now.getDate() - d.getDate()) / 7) + 1
          return `Week ${5 - weekNum}`
        }
      } else if (period === "year") {
        // Get months from past year
        const lastYearStart = new Date(now)
        lastYearStart.setFullYear(now.getFullYear() - 1)
        if (d >= lastYearStart && d <= now) {
          const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
          return months[d.getMonth()]
        }
      }
      return null
    }

    // Process reservations
    reservations.forEach((res: any) => {
      const key = getKey(res.created_at || res.date)
      if (key) {
        data[key] = data[key] || { name: key, reservations: 0, offers: 0, services: 0 }
        data[key].reservations++
      }
    })

    // Process offers
    offers.forEach((offer: any) => {
      const key = getKey(offer.created_at || offer.date)
      if (key) {
        data[key] = data[key] || { name: key, reservations: 0, offers: 0, services: 0 }
        data[key].offers++
      }
    })

    // Process services
    services.forEach((service: any) => {
      const key = getKey(service.created_at || service.date)
      if (key) {
        data[key] = data[key] || { name: key, reservations: 0, offers: 0, services: 0 }
        data[key].services++
      }
    })

    // Return data sorted by period order
    if (period === "week") {
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
      return days.map((day) => data[day] || { name: day, reservations: 0, offers: 0, services: 0 })
    } else if (period === "month") {
      const weeks = ["Week 1", "Week 2", "Week 3", "Week 4"]
      return weeks.map((week) => data[week] || { name: week, reservations: 0, offers: 0, services: 0 })
    } else {
      const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      return months.map((month) => data[month] || { name: month, reservations: 0, offers: 0, services: 0 })
    }
  }

  const fetchRecentItems = async () => {
    const token = localStorage.getItem("admin_token")

    try {
      const [reservationsRes, offersRes] = await Promise.all([
        fetch(`${API_URL}/api/reservations`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/offres`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ])

      const reservations = await reservationsRes.json()
      const offers = await offersRes.json()

      // Get last 3 items sorted by date
      const recentResList = Array.isArray(reservations)
        ? reservations
          .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 3)
        : []

      const recentOffersList = Array.isArray(offers)
        ? offers
          .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
          .slice(0, 3)
        : []

      setRecentReservations(recentResList)
      setRecentOffers(recentOffersList)
    } catch (error) {
      console.error("Error fetching recent items:", error)
    }
  }

  const statCards = [
    {
      title: "Categories",
      value: stats.categories,
      icon: FolderTree,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Services",
      value: stats.services,
      icon: Sparkles,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Reservations",
      value: stats.reservations,
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Offers",
      value: stats.offers,
      icon: Gift,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  if (loading) {
    return <div className="text-center py-12">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const IconComponent = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {IconComponent && (
                  <div className={`p-2 rounded-full ${stat.bgColor}`}>
                    <IconComponent className={`h-5 w-5 ${stat.color}`} />
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-xl font-bold">Activity Chart</h2>
          <div className="flex gap-2 flex-wrap">
            {["week", "month", "year"].map((period) => (
              <Button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                variant={selectedPeriod === period ? "default" : "outline"}
                className="capitalize text-sm"
              >
                {period}
              </Button>
            ))}
          </div>
        </div>

        <Card>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" fontSize={12} />
                <YAxis fontSize={12} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reservations" stroke="#9333ea" name="Reservations" strokeWidth={2} />
                <Line type="monotone" dataKey="offers" stroke="#ea580c" name="Offers" strokeWidth={2} />
                <Line type="monotone" dataKey="services" stroke="#22c55e" name="Services" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Reservations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Recent Reservations</CardTitle>
            <Calendar className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            {recentReservations.length > 0 ? (
              <div className="space-y-4">
                {recentReservations.map((reservation: any, index: number) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{reservation.name || "Reservation"}</p>
                      <p className="text-xs text-gray-500">{new Date(reservation.created_at).toLocaleDateString()}</p>
                    </div>
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded ml-2 flex-shrink-0">
                      {reservation.statusres || "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No recent reservations</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Offers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-lg">Recent Offers</CardTitle>
            <Gift className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            {recentOffers.length > 0 ? (
              <div className="space-y-4">
                {recentOffers.map((offer: any, index: number) => (
                  <div key={index} className="flex items-center justify-between border-b pb-3 last:border-b-0">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{offer.title || "Offer"}</p>
                      <p className="text-xs text-gray-500">{new Date(offer.created_at).toLocaleDateString()}</p>
                    </div>
                    <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded ml-2 flex-shrink-0">
                      Active
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No recent offers</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AdminDashboard
