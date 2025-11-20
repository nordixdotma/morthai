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
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Offer {
  offre_uuid: string;
  nombeneficiaire: string;
  emailbeneficiaire: string;
  numtelephonebeneficiaire: string;
  nomenvoyeur: string;
  note: string;
  CarteTheme?: string;
  CartePrix?: number;
  NomService?: string;
  ServicePrix?: number;
  durée: number;
  codeunique: string;
  created_at: string;
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOffers();
  }, []);

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    'Content-Type': 'application/json',
  });

  const fetchOffers = async () => {
    try {
      const response = await fetch(`${API_URL}/api/offres`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      setOffers(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to fetch offers');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Offers</h1>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Beneficiary</TableHead>
                <TableHead>Sender</TableHead>
                <TableHead>Gift Card</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Created</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No offers found
                  </TableCell>
                </TableRow>
              ) : (
                offers.map((offer) => (
                  <TableRow key={offer.offre_uuid}>
                    <TableCell>
                      <Badge variant="outline" className="font-mono">
                        {offer.codeunique}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="font-medium">{offer.nombeneficiaire}</div>
                        <div className="text-muted-foreground">
                          {offer.emailbeneficiaire}
                        </div>
                        <div className="text-muted-foreground text-xs">
                          {offer.numtelephonebeneficiaire}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{offer.nomenvoyeur}</TableCell>
                    <TableCell>
                      {offer.CarteTheme && (
                        <div className="text-sm">
                          <div>{offer.CarteTheme}</div>
                          <div className="text-muted-foreground">
                            {offer.CartePrix} MAD
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {offer.NomService && (
                        <div className="text-sm">
                          <div>{offer.NomService}</div>
                          <div className="text-muted-foreground">
                            {offer.ServicePrix} MAD
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{offer.durée} min</TableCell>
                    <TableCell>
                      {new Date(offer.created_at).toLocaleDateString()}
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

