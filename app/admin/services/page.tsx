'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { Plus, Edit, Trash2 } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface ServiceOffer {
  offer_uuid: string;
  durée: number;
  prix_mad: number;
  prix_eur: number;
}

interface Service {
  service_uuid: string;
  nomservice: string;
  nomservice_fr?: string;
  nomservice_en?: string;
  reference?: string;
  cat_uuid: string;
  NomCategorie?: string;
  NomCategorieFr?: string;
  NomCategorieEn?: string;
  offers?: ServiceOffer[];
  offers_count?: number;
  created_at: string;
  updated_at: string;
}

export default function ServicesPage() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    'Content-Type': 'application/json',
  });

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/api/services`, {
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch services');
      }
      
      const data = await response.json();
      const servicesList = Array.isArray(data) ? data : [];
      
      // Fetch offers for each service in parallel
      const servicesWithOffers = await Promise.all(
        servicesList.map(async (service: Service) => {
          try {
            const offersResponse = await fetch(`${API_URL}/api/services/${service.service_uuid}`, {
              headers: getAuthHeaders(),
            });
            if (offersResponse.ok) {
              const serviceData = await offersResponse.json();
              return { ...service, offers: serviceData.offers || [] };
            }
          } catch (error) {
            console.error(`Failed to fetch offers for service ${service.service_uuid}:`, error);
          }
          return { ...service, offers: [] };
        })
      );
      
      setServices(servicesWithOffers);
    } catch (error) {
      toast.error('Échec du chargement des services');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) return;

    try {
      const response = await fetch(`${API_URL}/api/services/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        toast.success('Service supprimé');
        fetchServices();
      } else {
        toast.error('Échec de la suppression du service');
      }
    } catch (error) {
      toast.error('Échec de la suppression du service');
    }
  };

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (mins === 0) return `${hours}h`;
    return `${hours}h${mins}`;
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold uppercase">PRODUITS</h1>
        <Button onClick={() => router.push('/admin/services/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un produit
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">Chargement...</div>
      ) : (
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Référence</TableHead>
                <TableHead>Nom</TableHead>
                <TableHead>Options</TableHead>
                <TableHead>Catégorie</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Aucun service trouvé
                  </TableCell>
                </TableRow>
              ) : (
                services.map((service) => (
                  <TableRow key={service.service_uuid}>
                    <TableCell className="font-mono font-semibold">
                      {service.reference || '-'}
                    </TableCell>
                    <TableCell className="font-medium">
                      {service.nomservice_fr || service.nomservice || '-'}
                    </TableCell>
                    <TableCell>
                      {service.offers && service.offers.length > 0 ? (
                        <div className="space-y-1 text-sm">
                          {service.offers.map((offer) => (
                            <div key={offer.offer_uuid} className="text-gray-700">
                              Durée: {formatDuration(offer.durée)} => {offer.prix_mad} dh | {offer.prix_eur} EUR
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-gray-400">Aucune offre</span>
                      )}
                    </TableCell>
                    <TableCell>
                      {service.NomCategorieFr || service.NomCategorie || '-'}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div>
                          Créée le {new Date(service.created_at).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </div>
                        {service.updated_at && service.updated_at !== service.created_at && (
                          <div className="text-gray-500">
                            Modifiée le {new Date(service.updated_at).toLocaleDateString('fr-FR', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric'
                            })}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => router.push(`/admin/services/${service.service_uuid}/edit`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(service.service_uuid)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
