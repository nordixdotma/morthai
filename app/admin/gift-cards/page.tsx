'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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

interface GiftCard {
  carteid: string;
  theme: string;
  prix: number;
  created_at: string;
}

export default function GiftCardsPage() {
  const [giftCards, setGiftCards] = useState<GiftCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState<GiftCard | null>(null);
  const [formData, setFormData] = useState({ theme: '', prix: '' });

  useEffect(() => {
    fetchGiftCards();
  }, []);

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    'Content-Type': 'application/json',
  });

  const fetchGiftCards = async () => {
    try {
      const response = await fetch(`${API_URL}/api/cartes-cadeaux`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      setGiftCards(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to fetch gift cards');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const payload = {
        Theme: formData.theme,
        Prix: parseFloat(formData.prix),
      };

      const url = editingCard
        ? `${API_URL}/api/cartes-cadeaux/${editingCard.carteid}`
        : `${API_URL}/api/cartes-cadeaux`;
      
      const method = editingCard ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(editingCard ? 'Gift card updated' : 'Gift card created');
        setDialogOpen(false);
        setEditingCard(null);
        setFormData({ theme: '', prix: '' });
        fetchGiftCards();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Operation failed');
      }
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (card: GiftCard) => {
    setEditingCard(card);
    setFormData({ theme: card.theme, prix: card.prix.toString() });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gift card?')) return;

    try {
      const response = await fetch(`${API_URL}/api/cartes-cadeaux/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        toast.success('Gift card deleted');
        fetchGiftCards();
      } else {
        toast.error('Failed to delete gift card');
      }
    } catch (error) {
      toast.error('Failed to delete gift card');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gift Cards</h1>
        <Button onClick={() => {
          setEditingCard(null);
          setFormData({ theme: '', prix: '' });
          setDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Gift Card
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Theme</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {giftCards.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8">
                    No gift cards found
                  </TableCell>
                </TableRow>
              ) : (
                giftCards.map((card) => (
                  <TableRow key={card.carteid}>
                    <TableCell className="font-medium">{card.theme}</TableCell>
                    <TableCell>{card.prix} MAD</TableCell>
                    <TableCell>
                      {new Date(card.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(card)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(card.carteid)}
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCard ? 'Edit Gift Card' : 'Add Gift Card'}
            </DialogTitle>
            <DialogDescription>
              {editingCard
                ? 'Update the gift card information'
                : 'Create a new gift card'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme *</Label>
                <Input
                  id="theme"
                  value={formData.theme}
                  onChange={(e) =>
                    setFormData({ ...formData, theme: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prix">Price (MAD) *</Label>
                <Input
                  id="prix"
                  type="number"
                  step="0.01"
                  value={formData.prix}
                  onChange={(e) =>
                    setFormData({ ...formData, prix: e.target.value })
                  }
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {editingCard ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

