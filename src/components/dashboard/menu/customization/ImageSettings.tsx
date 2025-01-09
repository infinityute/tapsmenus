import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { MenuStyles } from "@/types/menu";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

interface ImageSettingsProps {
  styles: MenuStyles;
  menuId: string;
  onChange: (styles: MenuStyles) => void;
}

export const ImageSettings = ({ styles, menuId, onChange }: ImageSettingsProps) => {
  const { toast } = useToast();

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'header' | 'background') => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const filePath = `${menuId}/${type}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('menu-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('menu-images')
        .getPublicUrl(filePath);

      if (type === 'header') {
        onChange({ ...styles, headerImage: publicUrl });
      } else {
        onChange({ ...styles, backgroundImage: publicUrl });
      }

      toast({
        title: "Successo",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} immagine caricata con successo`,
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Errore",
        description: "Impossibile caricare l'immagine",
        variant: "destructive",
      });
    }
  };

  const handleRemoveImage = (type: 'header' | 'background') => {
    if (type === 'header') {
      onChange({ ...styles, headerImage: undefined });
    } else {
      onChange({ ...styles, backgroundImage: undefined });
    }

    toast({
      title: "Successo",
      description: `${type.charAt(0).toUpperCase() + type.slice(1)} immagine rimossa con successo`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Label>Immagine di intestazione</Label>
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, 'header')}
            className="cursor-pointer"
          />
          {styles.headerImage && (
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleRemoveImage('header')}
              title="Rimuovi immagine intestazione"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        {styles.headerImage && (
          <div className="mt-2 relative aspect-video">
            <img
              src={styles.headerImage}
              alt="Anteprima dell'intestazione"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}
      </div>

      <Separator />

      <div className="space-y-4">
        <Label>Page Background Image</Label>
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, 'background')}
            className="cursor-pointer"
          />
          {styles.backgroundImage && (
            <Button
              variant="destructive"
              size="icon"
              onClick={() => handleRemoveImage('background')}
              title="Anteprima dell'intestazione"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
        {styles.backgroundImage && (
          <div className="mt-2 relative aspect-video">
            <img
              src={styles.backgroundImage}
              alt="Anteprima dello sfondo"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}
      </div>
    </div>
  );
};