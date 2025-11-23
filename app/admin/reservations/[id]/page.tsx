'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Mail, MessageSquare, Save } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

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
  NomServiceFr?: string;
  prixtotal: number;
  nbrpersonne: number;
  statusres: string;
  modepaiement: string;
  note: string;
  created_at: string;
}

const STATUS_OPTIONS = [
  { value: 'pending', label: 'EnAttente' },
  { value: 'en_cours', label: 'En cours' },
  { value: 'confirmed', label: 'Confirmer' },
  { value: 'completed', label: 'Terminer' },
  { value: 'cancelled', label: 'Annuler' },
  { value: 'refunded', label: 'Rembourser' },
];

const EMAIL_TYPES = [
  { value: 'confirm', label: 'Confirmation' },
  { value: 'reminder', label: 'Rappel' },
  { value: 'cancel', label: 'Annulation' },
  { value: 'change', label: 'Modification' },
];

export default function ReservationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    nomclient_first: '',
    nomclient_last: '',
    email: '',
    phone_code: '+212',
    phone: '',
    dateRes: new Date(),
    timeRes: '',
    statusres: 'pending',
    note: '',
  });
  
  // Client name split
  const [clientNameParts, setClientNameParts] = useState<string[]>([]);
  
  // Email/WhatsApp state
  const [emailType, setEmailType] = useState('');
  const [emailLanguage, setEmailLanguage] = useState('fr');
  const [emailPreview, setEmailPreview] = useState('');
  const [whatsappPreview, setWhatsappPreview] = useState('');
  const [emailHtmlContent, setEmailHtmlContent] = useState('');
  const [whatsappMessage, setWhatsappMessage] = useState('');
  const [activeTab, setActiveTab] = useState('email');
  const [orderNote, setOrderNote] = useState('');

  useEffect(() => {
    if (id) {
      fetchReservation();
    }
  }, [id]);

  const getAuthHeaders = () => ({
    'Authorization': `Bearer ${localStorage.getItem('admin_token')}`,
    'Content-Type': 'application/json',
  });

  const fetchReservation = async () => {
    try {
      const response = await fetch(`${API_URL}/api/reservations/${id}`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        if (response.status === 404) {
          toast.error('Réservation non trouvée');
          router.push('/admin/reservations');
          return;
        }
        throw new Error('Échec du chargement de la réservation');
      }

      const data = await response.json();
      setReservation(data);
      
      // Split client name
      const nameParts = data.nomclient ? data.nomclient.split(' ') : ['', ''];
      setClientNameParts(nameParts);
      
      // Split phone number
      const phoneNumber = data.numerotelephone || '';
      const phoneMatch = phoneNumber.match(/^(\+212|212)?\s*(.+)$/);
      const phoneCode = phoneMatch ? (phoneMatch[1] || '+212') : '+212';
      const phoneOnly = phoneMatch ? phoneMatch[2].replace(/\s/g, '') : phoneNumber.replace(/^\+?212\s*/, '');
      
      // Parse date and time
      const resDate = new Date(data.dateres);
      const [hours, minutes] = data.heureres ? data.heureres.split(':') : ['10', '00'];
      
      setFormData({
        nomclient_first: nameParts[0] || '',
        nomclient_last: nameParts.slice(1).join(' ') || '',
        email: data.email || '',
        phone_code: phoneCode,
        phone: phoneOnly,
        dateRes: resDate,
        timeRes: `${hours}:${minutes}`,
        statusres: data.statusres || 'pending',
        note: data.note || '',
      });
      
      setOrderNote(data.note || '');
    } catch (error) {
      toast.error('Échec du chargement des détails de la réservation');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!reservation) return;

    setSaving(true);
    try {
      const fullPhone = formData.phone_code === '+212' || formData.phone_code === '212'
        ? `+212 ${formData.phone}`
        : `${formData.phone_code} ${formData.phone}`;

      const updateData = {
        NomClient: `${formData.nomclient_first} ${formData.nomclient_last}`.trim(),
        Email: formData.email,
        NumeroTelephone: fullPhone,
        DateRes: formData.dateRes.toISOString().split('T')[0],
        HeureRes: formData.timeRes + ':00',
        Service_UUID: reservation.service_uuid,
        ModePaiement: reservation.modepaiement,
        PrixTotal: reservation.prixtotal,
        NbrPersonne: reservation.nbrpersonne,
        StatusRes: formData.statusres,
        Note: formData.note,
      };

      const response = await fetch(`${API_URL}/api/reservations/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        toast.success('Réservation mise à jour avec succès');
        fetchReservation();
      } else {
        const error = await response.json();
        toast.error(error.error || 'Échec de la mise à jour');
      }
    } catch (error) {
      toast.error('Échec de la mise à jour');
      console.error('Error:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleAddOrderNote = async () => {
    if (!orderNote.trim()) {
      toast.error('Veuillez entrer une note');
      return;
    }

    setSaving(true);
    try {
      const updateData = {
        NomClient: formData.nomclient_first && formData.nomclient_last 
          ? `${formData.nomclient_first} ${formData.nomclient_last}`.trim()
          : reservation?.nomclient,
        Email: formData.email || reservation?.email,
        NumeroTelephone: reservation?.numerotelephone,
        DateRes: reservation?.dateres,
        HeureRes: reservation?.heureres,
        Service_UUID: reservation?.service_uuid,
        ModePaiement: reservation?.modepaiement,
        PrixTotal: reservation?.prixtotal,
        NbrPersonne: reservation?.nbrpersonne,
        StatusRes: reservation?.statusres,
        Note: orderNote,
      };

      const response = await fetch(`${API_URL}/api/reservations/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        toast.success('Note ajoutée');
        setOrderNote('');
        fetchReservation();
      } else {
        toast.error('Échec de l\'ajout de la note');
      }
    } catch (error) {
      toast.error('Échec de l\'ajout de la note');
    } finally {
      setSaving(false);
    }
  };

  const handleEmailPreview = async () => {
    if (!reservation || !emailType) {
      toast.error('Veuillez sélectionner un type d\'email');
      return;
    }

    try {
      // Only send custom message if it's not HTML (simple text)
      // If emailHtmlContent contains HTML tags, don't send it as message
      let customMessage = null;
      if (emailHtmlContent && emailHtmlContent.trim()) {
        // Check if it's plain text (no HTML tags)
        const htmlTagPattern = /<[^>]+>/;
        if (!htmlTagPattern.test(emailHtmlContent)) {
          customMessage = emailHtmlContent;
        }
      }

      // Fetch HTML preview from backend
      const response = await fetch(`${API_URL}/api/reservations/${id}/email/preview`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ 
          emailType,
          language: emailLanguage,
          message: customMessage
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.html) {
          setEmailHtmlContent(data.html);
          setEmailPreview(data.html);
        }
      } else {
        toast.error('Erreur lors de la génération de l\'aperçu email');
      }
    } catch (error) {
      console.error('Error fetching email preview:', error);
      toast.error('Erreur lors de la génération de l\'aperçu email');
    }
  };

  const generateFallbackEmailPreview = () => {
    const formattedDate = formData.dateRes.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    const messages: Record<string, Record<string, string>> = {
      confirm: {
        fr: `Bonjour ${formData.nomclient_first || reservation.nomclient},\n\nVotre réservation pour ${reservation.NomServiceFr || reservation.NomService || 'notre service'} le ${formattedDate} à ${formData.timeRes} a été confirmée !\n\nNous avons hâte de vous accueillir.\n\nCordialement,\nMor Thai Spa`,
        en: `Hello ${formData.nomclient_first || reservation.nomclient},\n\nYour reservation for ${reservation.NomService || 'our service'} on ${formattedDate} at ${formData.timeRes} has been confirmed!\n\nWe look forward to seeing you.\n\nBest regards,\nMor Thai Spa`,
      },
      reminder: {
        fr: `Bonjour ${formData.nomclient_first || reservation.nomclient},\n\nRappel : Votre réservation pour ${reservation.NomServiceFr || reservation.NomService || 'notre service'} est prévue le ${formattedDate} à ${formData.timeRes}.\n\nNous vous attendons !\n\nCordialement,\nMor Thai Spa`,
        en: `Hello ${formData.nomclient_first || reservation.nomclient},\n\nReminder: Your reservation for ${reservation.NomService || 'our service'} is scheduled for ${formattedDate} at ${formData.timeRes}.\n\nWe look forward to seeing you!\n\nBest regards,\nMor Thai Spa`,
      },
      cancel: {
        fr: `Bonjour ${formData.nomclient_first || reservation.nomclient},\n\nNous sommes désolés de vous informer que votre réservation pour ${reservation.NomServiceFr || reservation.NomService || 'notre service'} le ${formattedDate} à ${formData.timeRes} a été annulée.\n\nSi vous souhaitez reprogrammer, n'hésitez pas à nous contacter.\n\nNous nous excusons pour ce désagrément.\n\nCordialement,\nMor Thai Spa`,
        en: `Hello ${formData.nomclient_first || reservation.nomclient},\n\nWe're sorry to inform you that your reservation for ${reservation.NomService || 'our service'} on ${formattedDate} at ${formData.timeRes} has been cancelled.\n\nIf you would like to reschedule, please don't hesitate to contact us.\n\nWe apologize for any inconvenience.\n\nBest regards,\nMor Thai Spa`,
      },
      change: {
        fr: `Bonjour ${formData.nomclient_first || reservation.nomclient},\n\nNous aimerions discuter d'un report de votre réservation pour ${reservation.NomServiceFr || reservation.NomService || 'notre service'}.\n\nRéservation actuelle : ${formattedDate} à ${formData.timeRes}\n\nVeuillez nous faire connaître votre date et heure préférées, et nous ferons de notre mieux pour répondre à votre demande.\n\nCordialement,\nMor Thai Spa`,
        en: `Hello ${formData.nomclient_first || reservation.nomclient},\n\nWe would like to discuss rescheduling your reservation for ${reservation.NomService || 'our service'}.\n\nCurrent booking: ${formattedDate} at ${formData.timeRes}\n\nPlease let us know your preferred alternative date and time, and we'll do our best to accommodate your request.\n\nBest regards,\nMor Thai Spa`,
      },
    };

    const preview = messages[emailType]?.[emailLanguage] || '';
    setWhatsappPreview(preview);
    setWhatsappMessage(preview);
  };

  const handleWhatsAppPreview = () => {
    if (!reservation || !emailType) {
      toast.error('Veuillez sélectionner un type d\'email');
      return;
    }

    generateFallbackEmailPreview();
  };

  const sendWhatsAppMessage = async () => {
    const messageToSend = whatsappMessage || whatsappPreview;
    if (!messageToSend.trim()) {
      toast.error('Veuillez générer un aperçu d\'abord');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/reservations/${id}/whatsapp`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ message: messageToSend }),
      });

      if (response.ok) {
        toast.success('Message WhatsApp envoyé avec succès !');
        setWhatsappPreview('');
        setWhatsappMessage('');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Échec de l\'envoi du message');
      }
    } catch (error) {
      toast.error('Échec de l\'envoi du message');
    }
  };

  const sendEmailMessage = async () => {
    const htmlToSend = emailHtmlContent || emailPreview;
    if (!htmlToSend.trim()) {
      toast.error('Veuillez générer un aperçu d\'abord');
      return;
    }

    if (!emailType) {
      toast.error('Veuillez sélectionner un type d\'email');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/reservations/${id}/email`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ 
          emailType,
          html: htmlToSend,
          language: emailLanguage
        }),
      });

      if (response.ok) {
        toast.success('Email envoyé avec succès !');
        setEmailHtmlContent('');
        setEmailPreview('');
        setEmailType('');
      } else {
        const error = await response.json();
        toast.error(error.error || 'Échec de l\'envoi de l\'email');
      }
    } catch (error) {
      toast.error('Échec de l\'envoi de l\'email');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p>Chargement...</p>
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="text-center py-12">
        <p>Réservation non trouvée</p>
        <Button onClick={() => router.push('/admin/reservations')} className="mt-4">
          Retour aux réservations
        </Button>
      </div>
    );
  }

  const reservationNumber = reservation.reference || `MOR-${reservation.reservation_uuid.substring(0, 4).toUpperCase()}`;
  const createdAt = new Date(reservation.created_at || Date.now());

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push('/admin/reservations')}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold uppercase">DÉTAILS DE LA RÉSERVATION</h1>
          <p className="text-sm text-gray-600 mt-1">
            Réservation N° {reservationNumber} - Fait le: {createdAt.toLocaleDateString('fr-FR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric'
            })} à {createdAt.toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Payment and General Info */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Paiement ({reservation.modepaiement?.includes('ligne') || reservation.modepaiement?.includes('online') ? 'En ligne' : 'Au SPA'}).</CardTitle>
                <CardTitle>Général</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateRes">Date de réservation:</Label>
                  <Input
                    id="dateRes"
                    type="date"
                    value={formData.dateRes.toISOString().split('T')[0]}
                    onChange={(e) => setFormData({ ...formData, dateRes: new Date(e.target.value) })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="timeRes">Heure:</Label>
                  <Input
                    id="timeRes"
                    type="time"
                    value={formData.timeRes}
                    onChange={(e) => setFormData({ ...formData, timeRes: e.target.value })}
                  />
                </div>
              </div>
              <Button
                onClick={() => {
                  setFormData({ ...formData, ...formData });
                  handleSave();
                }}
                style={{ backgroundColor: '#8B4513' }}
                className="w-full sm:w-auto"
              >
                Modifier la date et heure
              </Button>
              <div className="space-y-2">
                <Label htmlFor="client-note">Note client:</Label>
                <Textarea
                  id="client-note"
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                  rows={3}
                  placeholder="Ajouter une note..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Client Information */}
          <Card>
            <CardHeader>
              <CardTitle>Informations clients</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="client-first">Client:</Label>
                  <Input
                    id="client-first"
                    value={formData.nomclient_first}
                    onChange={(e) => setFormData({ ...formData, nomclient_first: e.target.value })}
                    placeholder="Prénom"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-last" className="invisible">Nom</Label>
                  <Input
                    id="client-last"
                    value={formData.nomclient_last}
                    onChange={(e) => setFormData({ ...formData, nomclient_last: e.target.value })}
                    placeholder="Nom"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">E-mail:</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone-code">Téléphone:</Label>
                  <Input
                    id="phone-code"
                    value={formData.phone_code}
                    onChange={(e) => setFormData({ ...formData, phone_code: e.target.value })}
                    className="w-20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="invisible">Numéro</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Numéro de téléphone"
                  />
                </div>
              </div>
              <Button
                onClick={handleSave}
                style={{ backgroundColor: '#8B4513' }}
                className="w-full sm:w-auto"
                disabled={saving}
              >
                Modifier
              </Button>
            </CardContent>
          </Card>

          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle>Soins</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center py-2 border-b">
                  <span>
                    {reservation.NomServiceFr || reservation.NomService || 'Service'} x {reservation.nbrpersonne || 1}
                  </span>
                  <span className="font-bold">{reservation.prixtotal} MAD</span>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-bold">Total:</span>
                  <span className="font-bold text-lg">{reservation.prixtotal} MAD</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notes de Commande</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                value={orderNote}
                onChange={(e) => setOrderNote(e.target.value)}
                rows={4}
                placeholder="Ajouter une note"
              />
              <Button
                onClick={handleAddOrderNote}
                style={{ backgroundColor: '#8B4513' }}
                disabled={saving || !orderNote.trim()}
              >
                Ajouter
              </Button>
            </CardContent>
          </Card>

          {/* Email Section */}
          <Card>
            <CardHeader>
              <CardTitle>E-mail & WhatsApp</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="email-type">Type de message à envoyer</Label>
                  <Select value={emailType} onValueChange={setEmailType}>
                    <SelectTrigger id="email-type">
                      <SelectValue placeholder="Veuillez choisir le type d'email que vous voulez envoyé" />
                    </SelectTrigger>
                    <SelectContent>
                      {EMAIL_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button
                  onClick={async () => {
                    // Reset HTML content if it's already a complete HTML document
                    // This prevents sending modified HTML back to backend
                    if (emailHtmlContent && emailHtmlContent.includes('<!DOCTYPE html>')) {
                      setEmailHtmlContent('');
                    }
                    await handleEmailPreview();
                    handleWhatsAppPreview();
                  }}
                  variant="outline"
                  style={{ backgroundColor: '#8B4513', color: 'white' }}
                  disabled={!emailType}
                >
                  Aperçu avant envoi
                </Button>
                <Select value={emailLanguage} onValueChange={setEmailLanguage}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fr">Français</SelectItem>
                    <SelectItem value="en">Anglais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {(emailPreview || whatsappPreview) && (
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="email">
                      <Mail className="h-4 w-4 mr-2" />
                      Email
                    </TabsTrigger>
                    <TabsTrigger value="whatsapp">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp
                    </TabsTrigger>
                  </TabsList>
                  
                  {/* Email Tab */}
                  <TabsContent value="email" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Aperçu du template Email HTML:</Label>
                      <div className="border rounded-lg overflow-hidden">
                        <iframe
                          srcDoc={emailHtmlContent}
                          title="Email Preview"
                          className="w-full h-[400px] border-none bg-white"
                        />
                      </div>
                      {emailHtmlContent && (
                        <div className="space-y-2">
                          <Label className="text-xs text-gray-500">Éditer le HTML (optionnel):</Label>
                          <Textarea
                            value={emailHtmlContent}
                            onChange={(e) => {
                              setEmailHtmlContent(e.target.value);
                              setEmailPreview(e.target.value);
                            }}
                            rows={10}
                            className="font-mono text-xs"
                            placeholder="HTML éditable..."
                          />
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={sendEmailMessage}
                      style={{ backgroundColor: '#8B4513' }}
                      disabled={!emailHtmlContent && !emailPreview}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Envoyer par Email
                    </Button>
                  </TabsContent>
                  
                  {/* WhatsApp Tab */}
                  <TabsContent value="whatsapp" className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>Aperçu du message WhatsApp:</Label>
                      <Textarea
                        value={whatsappMessage || whatsappPreview}
                        onChange={(e) => setWhatsappMessage(e.target.value)}
                        rows={15}
                        className="font-mono"
                        placeholder="Le message WhatsApp apparaîtra ici..."
                      />
                    </div>
                    <Button
                      onClick={sendWhatsAppMessage}
                      style={{ backgroundColor: '#25D366' }}
                      disabled={!whatsappMessage && !whatsappPreview}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Envoyer via WhatsApp
                    </Button>
                  </TabsContent>
                </Tabs>
              )}

              {/* Email History */}
              <div className="space-y-2 mt-6">
                <Label>Historique des emails</Label>
                <div className="border rounded-lg p-4 min-h-[100px] bg-gray-50">
                  <p className="text-sm text-gray-500">Aucun email envoyé</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar - Status */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>État de la réservation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <RadioGroup
                value={formData.statusres}
                onValueChange={(value) => setFormData({ ...formData, statusres: value })}
              >
                {STATUS_OPTIONS.map((status) => (
                  <div key={status.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={status.value} id={status.value} />
                    <Label htmlFor={status.value} className="cursor-pointer">
                      {status.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
              <Button
                onClick={handleSave}
                className="w-full mt-6"
                style={{ backgroundColor: '#8B4513' }}
                disabled={saving}
              >
                <Save className="h-4 w-4 mr-2" />
                Sauvegarder
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
