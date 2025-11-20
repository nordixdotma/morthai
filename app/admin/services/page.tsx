'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Upload, X as XIcon } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Category {
  cat_uuid: string;
  nomcategorie: string;
}

interface Service {
  service_uuid: string;
  nomservice: string;
  description: string;
  images: string[];
  durée: number;
  prix: number;
  cat_uuid: string;
  NomCategorie?: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    nomservice: '',
    description: '',
    images: '',
    durée: '',
    prix: '',
    cat_uuid: '',
  });
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchServices();
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
      console.error('Failed to fetch categories:', error);
    }
  };

  const fetchServices = async () => {
    try {
      const response = await fetch(`${API_URL}/api/services`, {
        headers: getAuthHeaders(),
      });
      const data = await response.json();
      setServices(Array.isArray(data) ? data : []);
    } catch (error) {
      toast.error('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('images', file);
      });

      const response = await fetch(`${API_URL}/api/upload/multiple`, {
        method: 'POST',
        headers: getAuthHeadersFormData(),
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        const newImages = data.urls.map((url: string) => `${API_URL}${url}`);
        setUploadedImages([...uploadedImages, ...newImages]);
        toast.success(`${files.length} image(s) uploaded successfully`);
      } else {
        toast.error(data.error || 'Failed to upload images');
      }
    } catch (error) {
      toast.error('Failed to upload images');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const removeUploadedImage = (index: number) => {
    setUploadedImages(uploadedImages.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.nomservice || !formData.nomservice.trim()) {
      toast.error('Service name is required');
      return;
    }
    if (!formData.durée || isNaN(parseInt(formData.durée))) {
      toast.error('Duration must be a valid number');
      return;
    }
    if (!formData.prix || isNaN(parseFloat(formData.prix))) {
      toast.error('Price must be a valid number');
      return;
    }
    if (!formData.cat_uuid) {
      toast.error('Category is required');
      return;
    }
    
    try {
      // Combine uploaded images and URL images
      const urlImages = formData.images
        ? formData.images.split(',').map((img) => img.trim()).filter(Boolean)
        : [];
      const allImages = [...uploadedImages, ...urlImages];
      
      const payload = {
        NomService: formData.nomservice.trim(),
        Description: formData.description?.trim() || null,
        Images: allImages,
        Durée: parseInt(formData.durée),
        Prix: parseFloat(formData.prix),
        CAT_UUID: formData.cat_uuid,
      };

      const url = editingService
        ? `${API_URL}/api/services/${editingService.service_uuid}`
        : `${API_URL}/api/services`;
      
      const method = editingService ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success(editingService ? 'Service updated' : 'Service created');
        setDialogOpen(false);
        setEditingService(null);
        setFormData({
          nomservice: '',
          description: '',
          images: '',
          durée: '',
          prix: '',
          cat_uuid: '',
        });
        setUploadedImages([]);
        fetchServices();
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        const errorMessage = errorData.error || errorData.message || 'Operation failed';
        toast.error(errorMessage);
        console.error('Service operation error:', errorData);
      }
    } catch (error: any) {
      console.error('Service operation error:', error);
      toast.error(error.message || 'Operation failed. Please check your connection.');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    // Separate uploaded images (from API) and URL images
    const images = Array.isArray(service.images) ? service.images : [];
    const apiImages = images.filter((img: string) => img.startsWith(API_URL));
    const urlImages = images.filter((img: string) => !img.startsWith(API_URL));
    
    setUploadedImages(apiImages);
    setFormData({
      nomservice: service.nomservice,
      description: service.description || '',
      images: urlImages.join(', '),
      durée: service.durée.toString(),
      prix: service.prix.toString(),
      cat_uuid: service.cat_uuid,
    });
    setDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const response = await fetch(`${API_URL}/api/services/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        toast.success('Service deleted');
        fetchServices();
      } else {
        toast.error('Failed to delete service');
      }
    } catch (error) {
      toast.error('Failed to delete service');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Services</h1>
        <Button onClick={() => {
          setEditingService(null);
          setFormData({
            nomservice: '',
            description: '',
            images: '',
            durée: '',
            prix: '',
            cat_uuid: '',
          });
          setUploadedImages([]);
          setDialogOpen(true);
        }}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration (min)</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {services.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-8">
                    No services found
                  </TableCell>
                </TableRow>
              ) : (
                services.map((service) => (
                  <TableRow key={service.service_uuid}>
                    <TableCell className="font-medium">{service.nomservice}</TableCell>
                    <TableCell>{service.NomCategorie || 'N/A'}</TableCell>
                    <TableCell>{service.durée}</TableCell>
                    <TableCell>{service.prix} MAD</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleEdit(service)}
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

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingService ? 'Edit Service' : 'Add Service'}
            </DialogTitle>
            <DialogDescription>
              {editingService
                ? 'Update the service information'
                : 'Create a new service'}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="nomservice">Service Name *</Label>
                <Input
                  id="nomservice"
                  value={formData.nomservice}
                  onChange={(e) =>
                    setFormData({ ...formData, nomservice: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="durée">Duration (minutes) *</Label>
                  <Input
                    id="durée"
                    type="number"
                    value={formData.durée}
                    onChange={(e) =>
                      setFormData({ ...formData, durée: e.target.value })
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
              <div className="space-y-2">
                <Label htmlFor="cat_uuid">Category *</Label>
                <Select
                  value={formData.cat_uuid}
                  onValueChange={(value) =>
                    setFormData({ ...formData, cat_uuid: value })
                  }
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.cat_uuid} value={cat.cat_uuid}>
                        {cat.nomcategorie}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="images">Images</Label>
                
                {/* File Upload */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      disabled={uploading}
                    />
                    <Label
                      htmlFor="file-upload"
                      className="cursor-pointer flex items-center gap-2 px-4 py-2 border border-dashed rounded-md hover:bg-gray-50"
                    >
                      <Upload className="h-4 w-4" />
                      <span>{uploading ? 'Uploading...' : 'Upload Images'}</span>
                    </Label>
                  </div>
                  
                  {/* Uploaded Images Preview */}
                  {uploadedImages.length > 0 && (
                    <div className="grid grid-cols-3 gap-2 mt-2">
                      {uploadedImages.map((img, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={img}
                            alt={`Uploaded ${index + 1}`}
                            className="w-full h-24 object-cover rounded border"
                          />
                          <button
                            type="button"
                            onClick={() => removeUploadedImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <XIcon className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* URL Input */}
                <div className="mt-2">
                  <Label htmlFor="images-url" className="text-sm text-muted-foreground">
                    Or enter image URLs (comma-separated)
                  </Label>
                  <Input
                    id="images-url"
                    value={formData.images}
                    onChange={(e) =>
                      setFormData({ ...formData, images: e.target.value })
                    }
                    placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                    className="mt-1"
                  />
                </div>
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
                {editingService ? 'Update' : 'Create'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

