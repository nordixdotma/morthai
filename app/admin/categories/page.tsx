'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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
import { Plus, Edit, Trash2, Upload, X as XIcon } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Category {
  cat_uuid: string;
  nomcategorie: string;
  nomcategorie_fr?: string;
  nomcategorie_en?: string;
  image?: string;
  service_count?: number;
  created_at: string;
  updated_at: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({
    nomcategorie_fr: '',
    nomcategorie_en: '',
    image: '',
  });
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    'Content-Type': 'application/json',
  });

  const getAuthHeadersFormData = () => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
  });

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_URL}/api/categories`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(`${API_URL}/api/upload/single`, {
        method: 'POST',
        headers: getAuthHeadersFormData(),
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const imageUrl = `${API_URL}${data.url}`;
        setFormData({ ...formData, image: imageUrl });
        setImagePreview(imageUrl);
        toast.success('Image uploaded successfully');
      } else {
        toast.error(data.error || 'Failed to upload image');
      }
    } catch (error) {
      toast.error('Failed to upload image');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Trim the values to check if they're actually empty
    const titreFr = formData.nomcategorie_fr?.trim() || '';
    const titreEn = formData.nomcategorie_en?.trim() || '';
    
    // Check if at least one title is provided
    if (!titreFr && !titreEn) {
      toast.error('Veuillez fournir au moins un titre (français ou anglais)');
      return;
    }
    
    try {
      const url = editingCategory
        ? `${API_URL}/api/categories/${editingCategory.cat_uuid}`
        : `${API_URL}/api/categories`;
      
      const method = editingCategory ? 'PUT' : 'POST';
      
      const payload = {
        NomCategorieFr: titreFr || null,
        NomCategorieEn: titreEn || null,
        Image: formData.image || null,
      };
      
      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(editingCategory ? 'Catégorie mise à jour' : 'Catégorie créée');
        setDialogOpen(false);
        setEditingCategory(null);
        setFormData({ nomcategorie_fr: '', nomcategorie_en: '', image: '' });
        setImagePreview('');
        fetchCategories();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Operation failed');
      }
    } catch (error) {
      toast.error('Operation failed');
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      nomcategorie_fr: category.nomcategorie_fr || '',
      nomcategorie_en: category.nomcategorie_en || '',
      image: category.image || '',
    });
    setImagePreview(category.image || '');
    setDialogOpen(true);
  };

  const handleOpenDialog = () => {
    setEditingCategory(null);
    setFormData({ nomcategorie_fr: '', nomcategorie_en: '', image: '' });
    setImagePreview('');
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingCategory(null);
    setFormData({ nomcategorie_fr: '', nomcategorie_en: '', image: '' });
    setImagePreview('');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`${API_URL}/api/categories/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        toast.success('Category deleted');
        fetchCategories();
      } else {
        toast.error('Failed to delete category');
      }
    } catch (error) {
      toast.error('Failed to delete category');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold uppercase">CATÉGORIES</h1>
        <Button onClick={handleOpenDialog}>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter une catégorie
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">Chargement...</div>
      ) : (
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titre fr</TableHead>
                <TableHead>Titre en</TableHead>
                <TableHead>Nombre de soins</TableHead>
                <TableHead>Image arrière plan</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8">
                    Aucune catégorie trouvée
                  </TableCell>
                </TableRow>
              ) : (
                categories.map((category) => (
                  <TableRow key={category.cat_uuid}>
                    <TableCell className="font-medium">
                      {category.nomcategorie_fr || category.nomcategorie || '-'}
                    </TableCell>
                    <TableCell>
                      {category.nomcategorie_en || '-'}
                    </TableCell>
                    <TableCell>
                      {category.service_count || 0} {category.service_count === 1 ? 'soin' : 'soins'}
                    </TableCell>
                    <TableCell>
                      {category.image ? (
                        <div className="relative w-16 h-16 rounded overflow-hidden border">
                          <Image
                            src={category.image}
                            alt={category.nomcategorie_fr || category.nomcategorie}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div>
                          Créée le {new Date(category.created_at).toLocaleDateString('fr-FR', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric'
                          })}
                        </div>
                        {category.updated_at && category.updated_at !== category.created_at && (
                          <div className="text-gray-500">
                            Modifiée le {new Date(category.updated_at).toLocaleDateString('fr-FR', {
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
                          onClick={() => handleEdit(category)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(category.cat_uuid)}
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

      <Dialog open={dialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'Modifier la catégorie' : 'Ajouter une catégorie'}
            </DialogTitle>
            <DialogDescription>
              {editingCategory
                ? 'Modifiez les informations de la catégorie'
                : 'Remplissez les informations pour créer une nouvelle catégorie'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nomcategorie_fr">Titre fr *</Label>
                <Input
                  id="nomcategorie_fr"
                  value={formData.nomcategorie_fr}
                  onChange={(e) =>
                    setFormData({ ...formData, nomcategorie_fr: e.target.value })
                  }
                  placeholder="Titre en français"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nomcategorie_en">Titre en</Label>
                <Input
                  id="nomcategorie_en"
                  value={formData.nomcategorie_en}
                  onChange={(e) =>
                    setFormData({ ...formData, nomcategorie_en: e.target.value })
                  }
                  placeholder="Title in English"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image arrière plan</Label>
                {imagePreview && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border mb-2">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setImagePreview('');
                        setFormData({ ...formData, image: '' });
                      }}
                    >
                      <XIcon className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="cursor-pointer"
                  />
                  {uploading && (
                    <span className="text-sm text-gray-500">Upload...</span>
                  )}
                </div>
                {formData.image && !imagePreview && (
                  <p className="text-sm text-gray-600">Image URL: {formData.image}</p>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseDialog}
              >
                Annuler
              </Button>
              <Button type="submit" disabled={uploading}>
                {editingCategory ? 'Modifier' : 'Créer'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

