import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Palette, Image, Layout, Type, Text } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MenuStyles, stringifyMenuStyles } from "@/types/menu";
import { ColorSettings } from "./customization/ColorSettings";
import { ImageSettings } from "./customization/ImageSettings";
import { LayoutSettings } from "./customization/LayoutSettings";
import { FontSettings } from "./customization/FontSettings";
import { TextSettings } from "./customization/TextSettings";
import { MenuPreview } from "@/components/MenuPreview";
import { useIsMobile } from "@/hooks/use-mobile";

interface MenuCustomizationFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menuId: string;
  currentStyles?: MenuStyles;
  onSuccess: () => void;
}

export const MenuCustomizationForm = ({
  open,
  onOpenChange,
  menuId,
  currentStyles,
  onSuccess,
}: MenuCustomizationFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [styles, setStyles] = useState<MenuStyles>(currentStyles || {});
  const isMobile = useIsMobile();

  // Helper function to clean undefined values and complex objects
  const cleanStyleValue = (value: any) => {
    if (value && typeof value === 'object' && '_type' in value && 'value' in value) {
      return value.value === 'undefined' ? undefined : value.value;
    }
    return value;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Pulisci l'oggetto styles prima del salvataggio
      const cleanedStyles = Object.entries(styles).reduce((acc, [key, value]) => {
        const cleanedValue = cleanStyleValue(value);
        if (cleanedValue !== undefined) {
          acc[key] = cleanedValue;
        }
        return acc;
      }, {} as MenuStyles);

      console.log("Salvataggio stili puliti:", cleanedStyles);

      const { error } = await supabase
        .from("menus")
        .update({ styles: stringifyMenuStyles(cleanedStyles) })
        .eq("id", menuId);

      if (error) throw error;

      toast({
        title: "Successo",
        description: "Stili del menu aggiornati con successo",
      });

      onSuccess();
      onOpenChange(false);
      
      // Aggiorna la pagina dopo il salvataggio
      window.location.reload();
    } catch (error) {
      console.error("Errore nell'aggiornamento degli stili del menu:", error);
      toast({
        title: "Errore",
        description: "Impossibile aggiornare gli stili del menu",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Personalizza Aspetto Menu</DialogTitle>
        </DialogHeader>

        <div className={`grid gap-6 ${isMobile ? '' : 'md:grid-cols-2'}`}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Tabs defaultValue="colors" className="w-full">
              <TabsList className="w-full grid grid-cols-5">
                <TabsTrigger value="colors" className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <span className="hidden sm:inline">Colori</span>
                </TabsTrigger>
                <TabsTrigger value="images" className="flex items-center gap-2">
                  <Image className="h-4 w-4" />
                  <span className="hidden sm:inline">Immagini</span>
                </TabsTrigger>
                <TabsTrigger value="layout" className="flex items-center gap-2">
                  <Layout className="h-4 w-4" />
                  <span className="hidden sm:inline">Layout</span>
                </TabsTrigger>
                <TabsTrigger value="fonts" className="flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  <span className="hidden sm:inline">Font</span>
                </TabsTrigger>
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <Text className="h-4 w-4" />
                  <span className="hidden sm:inline">Testo</span>
                </TabsTrigger>
              </TabsList>

              <div className="mt-4 p-4 border rounded-lg bg-background">
                <TabsContent value="colors">
                  <ColorSettings styles={styles} onChange={setStyles} />
                </TabsContent>

                <TabsContent value="images">
                  <ImageSettings 
                    styles={styles} 
                    menuId={menuId} 
                    onChange={setStyles} 
                  />
                </TabsContent>

                <TabsContent value="layout">
                  <LayoutSettings styles={styles} onChange={setStyles} />
                </TabsContent>

                <TabsContent value="fonts">
                  <FontSettings styles={styles} onChange={setStyles} />
                </TabsContent>

                <TabsContent value="text">
                  <TextSettings styles={styles} onChange={setStyles} />
                </TabsContent>
              </div>
            </Tabs>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Annulla
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvataggio..." : "Salva Modifiche"}
              </Button>
            </div>
          </form>

          {!isMobile && (
            <div className="border rounded-lg overflow-hidden">
              <MenuPreview styles={styles} />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};