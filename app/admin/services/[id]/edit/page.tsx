'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft, Plus, X as XIcon, Upload, ChevronUp, ChevronDown } from 'lucide-react';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

interface Category {
  cat_uuid: string;
  nomcategorie: string;
  nomcategorie_fr?: string;
  nomcategorie_en?: string;
}

interface ServiceOffer {
  offer_uuid?: string;
  durée: number;
  prix_mad: number;
  prix_eur: number;
  isExpanded?: boolean;
}

const DURATION_OPTIONS = [
  { value: 30, label: '30min' },
  { value: 60, label: '1h' },
  { value: 90, label: '1h30' },
  { value: 120, label: '2h' },
];

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [activeTab, setActiveTab] = useState('fr');
  const [formData, setFormData] = useState({
    nomservice_fr: '',
    nomservice_en: '',
    description_fr: '',
    description_en: '',
    meta_title: '',
    meta_description: '',
    reference: '',
    cat_uuid: '',
    is_public: 'public',
  });
  
  const [offers, setOffers] = useState<ServiceOffer[]>([]);
  const [mainImage, setMainImage] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    fetchCategories();
    if (id) {
      fetchService();
    }
  }, [id]);

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

  const fetchService = async () => {
    try {
      const response = await fetch(`${API_URL}/api/services/${id}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        toast.error('Service non trouvé');
        router.push('/admin/services');
        return;
      }

      const service = await response.json();
      
      setFormData({
        nomservice_fr: service.nomservice_fr || '',
        nomservice_en: service.nomservice_en || '',
        description_fr: service.description_fr || service.description || '',
        description_en: service.description_en || '',
        meta_title: service.meta_title || '',
        meta_description: service.meta_description || '',
        reference: service.reference || '',
        cat_uuid: service.cat_uuid || '',
        is_public: 'public',
      });

      // Set offers
      if (service.offers && Array.isArray(service.offers)) {
        setOffers(service.offers.map((offer: any) => ({
          offer_uuid: offer.offer_uuid,
          durée: offer.durée,
          prix_mad: offer.prix_mad,
          prix_eur: offer.prix_eur,
          isExpanded: false,
        })));
      }

      // Set main image
      if (service.images && Array.isArray(service.images) && service.images.length > 0) {
        setMainImage(service.images[0]);
        setImagePreview(service.images[0]);
      }
    } catch (error) {
      toast.error('Échec du chargement du service');
      console.error('Error:', error);
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
        setMainImage(imageUrl);
        setImagePreview(imageUrl);
        toast.success('Image téléchargée avec succès');
      } else {
        toast.error(data.error || 'Échec du téléchargement de l\'image');
      }
    } catch (error) {
      toast.error('Échec du téléchargement de l\'image');
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

  const handleAddOffer = () => {
    setOffers([
      ...offers,
      {
        durée: 60,
        prix_mad: 0,
        prix_eur: 0,
        isExpanded: true,
      },
    ]);
  };

  const handleRemoveOffer = (index: number) => {
    setOffers(offers.filter((_, i) => i !== index));
  };

  const handleUpdateOffer = (index: number, field: keyof ServiceOffer, value: any) => {
    const updatedOffers = [...offers];
    updatedOffers[index] = { ...updatedOffers[index], [field]: value };
    setOffers(updatedOffers);
  };

  const toggleOfferExpanded = (index: number) => {
    const updatedOffers = [...offers];
    updatedOffers[index].isExpanded = !updatedOffers[index].isExpanded;
    setOffers(updatedOffers);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.nomservice_fr && !formData.nomservice_en) {
      toast.error('Veuillez fournir au moins un titre (français ou anglais)');
      return;
    }

    if (!formData.cat_uuid) {
      toast.error('Veuillez sélectionner une catégorie');
      return;
    }

    if (offers.length === 0) {
      toast.error('Veuillez ajouter au moins une offre');
      return;
    }

    // Validate offers
    for (let i = 0; i < offers.length; i++) {
      const offer = offers[i];
      if (!offer.durée || !offer.prix_mad || !offer.prix_eur) {
        toast.error(`L'offre #${i + 1} est incomplète`);
        return;
      }
    }

    setSubmitting(true);

    try {
      const payload = {
        NomServiceFr: formData.nomservice_fr.trim() || null,
        NomServiceEn: formData.nomservice_en.trim() || null,
        DescriptionFr: formData.description_fr.trim() || null,
        DescriptionEn: formData.description_en.trim() || null,
        MetaTitle: formData.meta_title.trim() || null,
        MetaDescription: formData.meta_description.trim() || null,
        Reference: formData.reference.trim() || null,
        Images: mainImage ? [mainImage] : [],
        CAT_UUID: formData.cat_uuid,
        Offers: offers.map((offer) => ({
          durée: offer.durée,
          prix_mad: parseFloat(offer.prix_mad.toString()),
          prix_eur: parseFloat(offer.prix_eur.toString()),
        })),
      };

      const response = await fetch(`${API_URL}/api/services/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Service modifié avec succès');
        router.push('/admin/services');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Échec de la modification du service');
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast.error('Échec de la modification du service');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Chargement...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push('/admin/services')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-3xl font-bold uppercase">MODIFIER UN PRODUIT</h1>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Content Tabs */}
          <Card>
            <CardHeader>
              <CardTitle>Contenue</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="fr">Français</TabsTrigger>
                  <TabsTrigger value="en">Anglais</TabsTrigger>
                </TabsList>
                <TabsContent value="fr" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="nomservice_fr">Titre *</Label>
                    <Input
                      id="nomservice_fr"
                      value={formData.nomservice_fr}
                      onChange={(e) =>
                        setFormData({ ...formData, nomservice_fr: e.target.value })
                      }
                      placeholder="Titre en français"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description_fr">Description</Label>
                    <Textarea
                      id="description_fr"
                      value={formData.description_fr}
                      onChange={(e) =>
                        setFormData({ ...formData, description_fr: e.target.value })
                      }
                      rows={8}
                      placeholder="Description en français..."
                      className="resize-none"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="en" className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="nomservice_en">Titre</Label>
                    <Input
                      id="nomservice_en"
                      value={formData.nomservice_en}
                      onChange={(e) =>
                        setFormData({ ...formData, nomservice_en: e.target.value })
                      }
                      placeholder="Title in English"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description_en">Description</Label>
                    <Textarea
                      id="description_en"
                      value={formData.description_en}
                      onChange={(e) =>
                        setFormData({ ...formData, description_en: e.target.value })
                      }
                      rows={8}
                      placeholder="Description in English..."
                      className="resize-none"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Meta Information */}
          <Card>
            <CardHeader>
              <CardTitle>Meta Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="meta_title">Meta Title</Label>
                <Input
                  id="meta_title"
                  value={formData.meta_title}
                  onChange={(e) =>
                    setFormData({ ...formData, meta_title: e.target.value })
                  }
                  placeholder="Meta title for SEO"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meta_description">Meta description</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) =>
                    setFormData({ ...formData, meta_description: e.target.value })
                  }
                  rows={3}
                  placeholder="Meta description for SEO"
                />
              </div>
            </CardContent>
          </Card>

          {/* Reference */}
          <Card>
            <CardHeader>
              <CardTitle>Référence</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="reference">Référence</Label>
                <Input
                  id="reference"
                  value={formData.reference}
                  onChange={(e) =>
                    setFormData({ ...formData, reference: e.target.value })
                  }
                  placeholder="Référence (ex: vRa-100)"
                  className="font-mono"
                />
              </div>
            </CardContent>
          </Card>

          {/* Price Section with Offers */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Prix</CardTitle>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddOffer}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Ajouter une offre
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {offers.length === 0 ? (
                <p className="text-center text-gray-500 py-8">
                  Aucune offre ajoutée. Cliquez sur "Ajouter une offre" pour commencer.
                </p>
              ) : (
                offers.map((offer, index) => (
                  <Card
                    key={offer.offer_uuid || index}
                    className={`border-2 ${offer.isExpanded ? 'border-blue-200 bg-blue-50/50' : 'border-gray-200'}`}
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Offre #{index + 1}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleOfferExpanded(index)}
                          >
                            {offer.isExpanded ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )}
                          </Button>
                          {offers.length > 1 && (
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              onClick={() => handleRemoveOffer(index)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <XIcon className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    {offer.isExpanded && (
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor={`duration-${index}`}>Durée</Label>
                          <Select
                            value={offer.durée.toString()}
                            onValueChange={(value) =>
                              handleUpdateOffer(index, 'durée', parseInt(value))
                            }
                          >
                            <SelectTrigger id={`duration-${index}`}>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {DURATION_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value.toString()}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor={`prix_mad-${index}`}>Prix en MAD</Label>
                            <Input
                              id={`prix_mad-${index}`}
                              type="number"
                              step="0.01"
                              value={offer.prix_mad || ''}
                              onChange={(e) =>
                                handleUpdateOffer(index, 'prix_mad', parseFloat(e.target.value) || 0)
                              }
                              placeholder="0.00"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor={`prix_eur-${index}`}>Prix en EUR</Label>
                            <Input
                              id={`prix_eur-${index}`}
                              type="number"
                              step="0.01"
                              value={offer.prix_eur || ''}
                              onChange={(e) =>
                                handleUpdateOffer(index, 'prix_eur', parseFloat(e.target.value) || 0)
                              }
                              placeholder="0.00"
                              required
                            />
                          </div>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publication */}
          <Card>
            <CardHeader>
              <CardTitle>Publication</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={formData.is_public}
                onValueChange={(value) =>
                  setFormData({ ...formData, is_public: value })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="public" />
                  <Label htmlFor="public">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="private" />
                  <Label htmlFor="private">Privée</Label>
                </div>
              </RadioGroup>
              <Button
                type="submit"
                className="w-full mt-6"
                disabled={submitting}
                style={{ backgroundColor: '#8B4513' }}
              >
                {submitting ? 'Enregistrement...' : 'Sauvegarder'}
              </Button>
            </CardContent>
          </Card>

          {/* Category */}
          <Card>
            <CardHeader>
              <CardTitle>Catégorie</CardTitle>
            </CardHeader>
            <CardContent>
              <Select
                value={formData.cat_uuid}
                onValueChange={(value) =>
                  setFormData({ ...formData, cat_uuid: value })
                }
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.cat_uuid} value={cat.cat_uuid}>
                      {cat.nomcategorie_fr || cat.nomcategorie}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Media */}
          <Card>
            <CardHeader>
              <CardTitle>Média</CardTitle>
            </CardHeader>
            <CardContent>
              {imagePreview ? (
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
                      setMainImage('');
                    }}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                  <Label
                    htmlFor="image-upload"
                    className="cursor-pointer text-sm text-gray-600"
                  >
                    Cliquez pour télécharger une image
                  </Label>
                  <Input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={uploading}
                    className="hidden"
                  />
                  {uploading && (
                    <p className="text-sm text-gray-500 mt-2">Téléchargement...</p>
                  )}
                </div>
              )}
              {!imagePreview && (
                <Input
                  id="image-upload-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={uploading}
                  className="mt-2"
                />
              )}
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}

