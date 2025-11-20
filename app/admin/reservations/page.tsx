'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Reservation {
  reservation_uuid: string;
  nomclient: string;
  email: string;
  numerotelephone: string;
  dateres: string;
  heureres: string;
  NomService?: string;
  prixtotal: number;
  nbrpersonne: number;
  statusres: string;
  modepaiement: string;
  note: string;
}

export default function ReservationsPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  useEffect(() => {
    fetchReservations();
  }, [statusFilter]);

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    'Content-Type': 'application/json',
  });

  const fetchReservations = async () => {
    try {
      const url =
        statusFilter === 'all'
          ? `${API_URL}/api/reservations`
          : `${API_URL}/api/reservations/status/${statusFilter}`;
      
      const response = await fetch(url, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      setReservations(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to fetch reservations');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const reservation = reservations.find((r) => r.reservation_uuid === id);
      if (!reservation) return;

      const response = await fetch(`${API_URL}/api/reservations/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...reservation,
          StatusRes: newStatus,
        }),
      });

      if (response.ok) {
        toast.success('Status updated');
        fetchReservations();
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Reservations</h1>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reservations</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="confirmed">Confirmed</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No reservations found
                  </TableCell>
                </TableRow>
              ) : (
                reservations.map((reservation) => (
                  <TableRow key={reservation.reservation_uuid}>
                    <TableCell className="font-medium">
                      {reservation.nomclient}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{reservation.email}</div>
                        <div className="text-muted-foreground">
                          {reservation.numerotelephone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{reservation.NomService || 'N/A'}</TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div>{new Date(reservation.dateres).toLocaleDateString()}</div>
                        <div className="text-muted-foreground">
                          {reservation.heureres}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{reservation.prixtotal} MAD</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(reservation.statusres)}>
                        {reservation.statusres}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={reservation.statusres}
                        onValueChange={(value) =>
                          updateStatus(reservation.reservation_uuid, value)
                        }
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="confirmed">Confirmed</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                          <SelectItem value="cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

