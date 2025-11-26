'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { io, Socket } from 'socket.io-client';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Search, X, Calendar, Gift, Clock, CheckCircle, XCircle, Filter, ChevronDown, ChevronUp, RotateCcw } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Reservation {
  reservation_uuid: string;
  reference?: string;
  nomclient: string;
  email: string;
  numerotelephone: string;
  dateres: string;
  heureres: string;
  service_uuid: string;
  NomService?: string;
  prixtotal: number;
  nbrpersonne: number;
  statusres: string;
  modepaiement: string;
  note: string;
  created_at: string;
  type?: 'reservation' | 'offre'; // Added to distinguish type
}

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tous' },
  { value: 'pending', label: 'En attente' },
  { value: 'confirmed', label: 'Confirmé' },
  { value: 'en_cours', label: 'En cours' },
  { value: 'completed', label: 'Terminé' },
  { value: 'cancelled', label: 'Annulé' },
  { value: 'refunded', label: 'Remboursé' },
];

const PAYMENT_OPTIONS = [
  { value: 'all', label: 'Tous' },
  { value: 'en_ligne', label: 'En ligne' },
  { value: 'au_spa', label: 'Au SPA' },
];

const TYPE_OPTIONS = [
  { value: 'all', label: 'Tous' },
  { value: 'reservation', label: 'Réservation' },
  { value: 'offre', label: 'Offre' },
];

export default function ReservationsPage() {
  const router = useRouter();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [allReservations, setAllReservations] = useState<Reservation[]>([]); // For KPIs
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchReference, setSearchReference] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [dateRangeStart, setDateRangeStart] = useState('');
  const [dateRangeEnd, setDateRangeEnd] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [useDateRange, setUseDateRange] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);

  // Track previous reservations count to detect new ones
  const previousCountRef = useRef(0);
  const socketRef = useRef<Socket | null>(null);

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    'Content-Type': 'application/json',
  });

  const fetchReservations = useCallback(async (silent = false) => {

    try {
      if (!silent) {
        setLoading(true);
      }
      let url = `${API_URL}/api/reservations?`;
      const params = new URLSearchParams();

      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      if (paymentFilter !== 'all') {
        params.append('payment', paymentFilter);
      }
      if (typeFilter !== 'all') {
        params.append('type', typeFilter);
      }
      if (searchReference) {
        params.append('search', searchReference);
      }
      // Date filtering logic - prioritize date range
      if (useDateRange) {
        if (dateRangeStart) {
          params.append('dateStart', dateRangeStart);
        }
        if (dateRangeEnd) {
          params.append('dateEnd', dateRangeEnd);
        }
      } else if (searchDate) {
        params.append('date', searchDate);
      }

      const finalUrl = url + params.toString();
      console.log('Fetching reservations with filters:', {
        searchReference,
        searchDate,
        dateRangeStart,
        dateRangeEnd,
        useDateRange,
        statusFilter,
        paymentFilter,
        typeFilter,
        url: finalUrl
      });

      const response = await fetch(finalUrl, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const newReservations = Array.isArray(data) ? data : [];

      // Check for new reservations and show notification
      const currentCount = newReservations.length;
      if (previousCountRef.current > 0 && currentCount > previousCountRef.current) {
        const newCount = currentCount - previousCountRef.current;
        toast.success(`${newCount} nouvelle(s) réservation(s) trouvée(s)`, {
          duration: 3000,
        });
      }

      previousCountRef.current = currentCount;
      console.log('Reservations received:', newReservations.length);
      setReservations(newReservations);
    } catch (error) {
      if (!silent) {
        toast.error('Échec du chargement des réservations');
      }
    } finally {
      if (!silent) {
        setLoading(false);
      }
    }
  }, [statusFilter, paymentFilter, typeFilter, searchReference, searchDate, dateRangeStart, dateRangeEnd, useDateRange]);

  // Fetch all reservations for KPIs (without filters)
  const fetchAllReservationsForKPIs = useCallback(async () => {
    try {
      const token = localStorage.getItem('admin_token');
      if (!token) return;

      const response = await fetch(`${API_URL}/api/reservations`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setAllReservations(Array.isArray(data) ? data : []);
      }
    } catch (error) {
      console.error('Error fetching all reservations for KPIs:', error);
    }
  }, []);

  useEffect(() => {
    previousCountRef.current = 0; // Reset count when filters change
    fetchReservations(false); // Show loading on manual refresh
    fetchAllReservationsForKPIs(); // Fetch all for KPIs
  }, [fetchReservations, fetchAllReservationsForKPIs]);

  // WebSocket connection for real-time updates
  useEffect(() => {
    const socketUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

    // Initialize socket connection
    socketRef.current = io(socketUrl, {
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    const socket = socketRef.current;

    // Join admin room
    socket.on('connect', () => {
      console.log('WebSocket connected');
      socket.emit('join:admin');
    });

    // Listen for new reservations
    socket.on('new:reservation', (newReservation: Reservation) => {
      console.log('New reservation received:', newReservation);
      toast.success('Nouvelle réservation reçue !', {
        duration: 3000,
      });

      // Always refresh the list to show the new reservation
      fetchReservations(true); // Silent refresh
      fetchAllReservationsForKPIs(); // Refresh KPIs
    });

    // Listen for reservation updates
    socket.on('update:reservation', (updatedReservation: Reservation) => {
      console.log('Reservation updated:', updatedReservation);
      // Refresh the list to reflect the update
      fetchReservations(true); // Silent refresh
      fetchAllReservationsForKPIs(); // Refresh KPIs
    });

    socket.on('disconnect', () => {
      console.log('WebSocket disconnected');
    });

    socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
      // WebSocket will auto-reconnect, so we don't show error to user
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.off('new:reservation');
        socket.off('update:reservation');
        socket.disconnect();
      }
    };
  }, [fetchAllReservationsForKPIs]); // Include fetchAllReservationsForKPIs for KPI refresh

  const handleSearch = () => {
    fetchReservations();
  };

  const handleClearFilters = () => {
    setSearchReference('');
    setSearchDate('');
    setDateRangeStart('');
    setDateRangeEnd('');
    setStatusFilter('all');
    setPaymentFilter('all');
    setTypeFilter('all');
    setUseDateRange(false);
  };

  // Calculate active filter count
  const getActiveFilterCount = () => {
    let count = 0;
    if (searchReference) count++;
    if (searchDate || dateRangeStart || dateRangeEnd) count++;
    if (statusFilter !== 'all') count++;
    if (paymentFilter !== 'all') count++;
    if (typeFilter !== 'all') count++;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const reservation = reservations.find((r) => r.reservation_uuid === id);
      if (!reservation) return;

      const updateData = {
        NomClient: reservation.nomclient,
        Email: reservation.email,
        NumeroTelephone: reservation.numerotelephone,
        DateRes: reservation.dateres,
        HeureRes: reservation.heureres,
        Service_UUID: reservation.service_uuid,
        ModePaiement: reservation.modepaiement,
        PrixTotal: reservation.prixtotal,
        NbrPersonne: reservation.nbrpersonne,
        StatusRes: newStatus,
        Note: reservation.note || '',
      };

      const response = await fetch(`${API_URL}/api/reservations/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        toast.success('Statut mis à jour');
        fetchReservations();
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Erreur inconnue' }));
        toast.error(`Échec de la mise à jour: ${errorData.error || response.statusText}`);
      }
    } catch (error) {
      toast.error('Échec de la mise à jour du statut');
    }
  };

  const getStatusDisplay = (status: string) => {
    const statusMap: Record<string, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
      'pending': { label: 'En attente', variant: 'secondary' },
      'en_attente': { label: 'En attente', variant: 'secondary' },
      'confirmed': { label: 'Confirmé', variant: 'default' },
      'en_cours': { label: 'En cours', variant: 'default' },
      'completed': { label: 'Terminé', variant: 'default' },
      'cancelled': { label: 'Annulé', variant: 'destructive' },
      'refunded': { label: 'Remboursé', variant: 'outline' },
    };

    const statusInfo = statusMap[status] || { label: status, variant: 'default' as const };
    return (
      <Badge variant={statusInfo.variant}>
        {statusInfo.label}
      </Badge>
    );
  };

  const getStatusAction = (status: string, id: string) => {
    if (status === 'pending' || status === 'en_attente') {
      return (
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            updateStatus(id, 'confirmed');
          }}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Confirmer
        </Button>
      );
    } else if (status === 'confirmed' || status === 'en_cours') {
      return (
        <Button
          size="sm"
          variant="destructive"
          onClick={(e) => {
            e.stopPropagation();
            updateStatus(id, 'cancelled');
          }}
        >
          Annuler
        </Button>
      );
    }
    return null;
  };

  const formatPaymentMethod = (method: string) => {
    if (!method) return 'N/A';
    if (method.toLowerCase().includes('ligne') || method.toLowerCase().includes('online')) {
      return 'En ligne - Non payé';
    }
    if (method.toLowerCase().includes('spa')) {
      return 'Au SPA';
    }
    return method;
  };

  // Calculate KPIs from all reservations (unfiltered)
  const kpis = {
    totalReservations: allReservations.filter(r => !r.reference?.startsWith('MOR-OFFRE-')).length,
    totalOffres: allReservations.filter(r => r.reference?.startsWith('MOR-OFFRE-')).length,
    enAttente: allReservations.filter(r => r.statusres === 'pending' || r.statusres === 'en_attente').length,
    confirme: allReservations.filter(r => r.statusres === 'confirmed').length,
    annule: allReservations.filter(r => r.statusres === 'cancelled').length,
  };

  const kpiCards = [
    {
      title: 'Nombre de réservations',
      value: kpis.totalReservations,
      icon: Calendar,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Nombre d\'offres',
      value: kpis.totalOffres,
      icon: Gift,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'En attente',
      value: kpis.enAttente,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
    },
    {
      title: 'Confirmé',
      value: kpis.confirme,
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Annulé',
      value: kpis.annule,
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold uppercase">RÉSERVATIONS</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {kpiCards.map((kpi) => {
          const IconComponent = kpi.icon;
          return (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xs font-medium text-gray-600">{kpi.title}</CardTitle>
                <div className={`p-2 rounded-full ${kpi.bgColor}`}>
                  <IconComponent className={`h-4 w-4 ${kpi.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filters - Redesigned */}
      <div className="mb-6 space-y-4">
        {/* Main Search Bar */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl"></div>
          <div className="relative bg-white border-2 border-gray-200 rounded-xl p-2 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex gap-2 items-center">
              <div className="flex-1 relative">
                <Input
                  value={searchReference}
                  onChange={(e) => setSearchReference(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  placeholder="Rechercher par N° commande ou nom client..."
                  className="border-0 bg-transparent focus:outline-none focus:ring-0 text-base placeholder:text-gray-400"
                />
              </div>
              {searchReference && (
                <button
                  onClick={() => setSearchReference('')}
                  className="p-1.5 hover:bg-primary/10 rounded-lg transition-colors flex-shrink-0"
                  title="Effacer la recherche"
                  aria-label="Effacer la recherche"
                >
                  <X className="h-4 w-4 text-primary" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Pills and Toggle */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all ${showAdvancedFilters
              ? 'bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg'
              : 'bg-white border-2 border-primary/20 text-primary hover:bg-primary/5'
              }`}
          >
            <Filter className="h-4 w-4" />
            <span>Filtres avancés</span>
            {showAdvancedFilters ? (
              <ChevronUp className="h-4 w-4 ml-1" />
            ) : (
              <ChevronDown className="h-4 w-4 ml-1" />
            )}
          </button>

          {activeFilterCount > 0 && (
            <div className="flex items-center gap-2 px-3 py-2.5 bg-primary/10 rounded-lg border border-primary/20">
              <span className="text-sm font-medium text-primary">
                {activeFilterCount} filtre{activeFilterCount > 1 ? 's' : ''}
              </span>
              <button
                onClick={handleClearFilters}
                className="p-1 hover:bg-primary/20 rounded transition-colors"
                title="Réinitialiser les filtres"
                aria-label="Réinitialiser les filtres"
              >
                <X className="h-4 w-4 text-primary" />
              </button>
            </div>
          )}

          <div className="flex-1"></div>

          <Button
            onClick={handleSearch}
            className="bg-primary hover:bg-primary/90 text-white font-medium px-6 shadow-md hover:shadow-lg transition-all"
          >
            <Search className="h-4 w-4 mr-2" />
            Rechercher
          </Button>
        </div>

        {/* Advanced Filters Section */}
        {showAdvancedFilters && (
          <div className="bg-white border-2 border-primary/10 rounded-xl p-6 shadow-sm space-y-4">
            {/* Filters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Date Filter */}
              <div className="lg:col-span-2">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="font-semibold text-sm text-gray-700">
                      {useDateRange ? 'Période' : 'Date'}
                    </Label>
                    <button
                      onClick={() => {
                        setUseDateRange(!useDateRange);
                        if (!useDateRange) {
                          setSearchDate('');
                        } else {
                          setDateRangeStart('');
                          setDateRangeEnd('');
                        }
                      }}
                      className="text-xs px-2 py-1 rounded bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
                    >
                      {useDateRange ? 'Plage' : 'Jour'}
                    </button>
                  </div>
                  <div className="space-y-2">
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary pointer-events-none" />
                      <Input
                        type="date"
                        value={useDateRange ? dateRangeStart : searchDate}
                        onChange={(e) => {
                          if (useDateRange) {
                            setDateRangeStart(e.target.value);
                          } else {
                            setSearchDate(e.target.value);
                          }
                        }}
                        className="pl-10 border-primary/20 focus:border-primary focus:ring-primary/20"
                      />
                    </div>
                    {useDateRange && (
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-primary pointer-events-none" />
                        <Input
                          type="date"
                          value={dateRangeEnd}
                          onChange={(e) => setDateRangeEnd(e.target.value)}
                          className="pl-10 border-primary/20 focus:border-primary focus:ring-primary/20"
                          min={dateRangeStart}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Filter */}
              <div className="space-y-2">
                <Label className="font-semibold text-sm text-gray-700">État</Label>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="border-primary/20 focus:border-primary focus:ring-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Payment Filter */}
              <div className="space-y-2">
                <Label className="font-semibold text-sm text-gray-700">Paiement</Label>
                <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                  <SelectTrigger className="border-primary/20 focus:border-primary focus:ring-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PAYMENT_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Type Filter */}
              <div className="space-y-2">
                <Label className="font-semibold text-sm text-gray-700">Type</Label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="border-primary/20 focus:border-primary focus:ring-primary/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TYPE_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results Summary */}
            <div className="pt-2 border-t border-primary/10 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                <span className="font-semibold text-primary">{reservations.length}</span>
                {' '}résultat{reservations.length !== 1 ? 's' : ''} trouvé{reservations.length !== 1 ? 's' : ''}
              </div>
              {activeFilterCount > 0 && (
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary/20 rounded-full">
                  <span className="text-xs font-medium text-primary">
                    {activeFilterCount} filtre{activeFilterCount > 1 ? 's' : ''} actif{activeFilterCount > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Reservations Table */}
      {loading ? (
        <div className="text-center py-12">Chargement...</div>
      ) : (
        <div className="bg-white rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N° cmd</TableHead>
                <TableHead>Nom client</TableHead>
                <TableHead>Date cmd</TableHead>
                <TableHead>Prix total</TableHead>
                <TableHead>État cmd</TableHead>
                <TableHead>Paiement</TableHead>
                <TableHead>Offre/Réservation</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reservations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8">
                    Aucune réservation trouvée
                  </TableCell>
                </TableRow>
              ) : (
                reservations.map((reservation) => (
                  <TableRow
                    key={reservation.reservation_uuid}
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => router.push(`/admin/reservations/${reservation.reservation_uuid}`)}
                  >
                    <TableCell className="font-mono font-semibold">
                      {reservation.reference || `MOR-${reservation.reservation_uuid.substring(0, 4).toUpperCase()}`}
                    </TableCell>
                    <TableCell className="font-medium">{reservation.nomclient}</TableCell>
                    <TableCell>
                      {new Date(reservation.created_at || reservation.dateres).toLocaleDateString('fr-FR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric'
                      })}
                    </TableCell>
                    <TableCell>{reservation.prixtotal} MAD</TableCell>
                    <TableCell>
                      {getStatusDisplay(reservation.statusres)}
                    </TableCell>
                    <TableCell>{formatPaymentMethod(reservation.modepaiement)}</TableCell>
                    <TableCell>
                      {reservation.reference && reservation.reference.includes('OFFRE') ? 'Offre' : 'Réservation'}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Button
                        variant="link"
                        onClick={() => router.push(`/admin/reservations/${reservation.reservation_uuid}`)}
                      >
                        Détails
                      </Button>
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
