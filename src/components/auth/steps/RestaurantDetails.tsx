import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface RestaurantDetailsProps {
  name: string;
  description: string;
  cuisineType: string;
  logoUrl: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (value: string, field: string) => void;
}

export const RestaurantDetails = ({
  name,
  description,
  cuisineType,
  logoUrl,
  onChange,
  onSelectChange,
}: RestaurantDetailsProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const filePath = `${crypto.randomUUID()}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('restaurant-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('restaurant-images')
        .getPublicUrl(filePath);

      onSelectChange(publicUrl, 'logoUrl');
      
      toast({
        title: "Logo caricato con successo",
        description: "Il logo del ristorante è stato aggiornato.",
      });
    } catch (error) {
      console.error('Errore durante il caricamento del logo:', error);
      toast({
        title: "Errore durante il caricamento",
        description: "Si è verificato un errore durante il caricamento del logo.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="restaurantName">Nome del Ristorante</Label>
        <Input
          id="restaurantName"
          name="restaurantName"
          value={name}
          onChange={onChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="description">Descrizione</Label>
        <Textarea
          id="description"
          name="description"
          value={description}
          onChange={onChange}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="cuisineType">Tipo di Cucina</Label>
        <Select
          value={cuisineType}
          onValueChange={(value) => onSelectChange(value, "cuisineType")}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleziona il tipo di cucina" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="italian">Italiana</SelectItem>
            <SelectItem value="japanese">Giapponese</SelectItem>
            <SelectItem value="mexican">Messicana</SelectItem>
            <SelectItem value="indian">Indiana</SelectItem>
            <SelectItem value="american">Americana</SelectItem>
            <SelectItem value="chinese">Cinese</SelectItem>
            <SelectItem value="thai">Thailandese</SelectItem>
            <SelectItem value="mediterranean">Mediterranea</SelectItem>
            <SelectItem value="other">Altro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="logo">Logo del Ristorante</Label>
        <Input
          id="logo"
          name="logo"
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          disabled={uploading}
        />
        {logoUrl && (
          <div className="mt-2">
            <img
              src={logoUrl}
              alt="Logo del ristorante"
              className="h-20 w-20 object-contain rounded-lg"
            />
          </div>
        )}
      </div>
    </div>
  );
};