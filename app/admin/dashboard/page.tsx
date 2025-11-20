'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderTree, Calendar, Gift, Sparkles } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

function AdminDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    services: 0,
    reservations: 0,
    offers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const token = localStorage.getItem('admin_token');
    
    try {
      const [categoriesRes, servicesRes, reservationsRes, offersRes] = await Promise.all([
        fetch(`${API_URL}/api/categories`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/services`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/reservations`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
        fetch(`${API_URL}/api/offres`, {
          headers: { 'Authorization': `Bearer ${token}` },
        }),
      ]);

      const categories = await categoriesRes.json();
      const services = await servicesRes.json();
      const reservations = await reservationsRes.json();
      const offers = await offersRes.json();

      setStats({
        categories: Array.isArray(categories) ? categories.length : 0,
        services: Array.isArray(services) ? services.length : 0,
        reservations: Array.isArray(reservations) ? reservations.length : 0,
        offers: Array.isArray(offers) ? offers.length : 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Categories',
      value: stats.categories,
      icon: FolderTree,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Services',
      value: stats.services,
      icon: Sparkles,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Reservations',
      value: stats.reservations,
      icon: Calendar,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Offers',
      value: stats.offers,
      icon: Gift,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ];

  if (loading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const IconComponent = stat.icon;
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
          );
        })}
      </div>
    </div>
  );
}

export default AdminDashboard;

