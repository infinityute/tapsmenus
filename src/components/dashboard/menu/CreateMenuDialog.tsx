import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

interface CreateMenuDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CreateMenuDialog = ({ open, onOpenChange }: CreateMenuDialogProps) => {
  const session = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;

    setIsLoading(true);
    try {
      const { data: restaurant } = await supabase
        .from("restaurants")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (!restaurant) throw new Error("Ristorante non trovato");

      const { data: menuData, error: menuError } = await supabase
        .from("menus")
        .insert({
          restaurant_id: restaurant.id,
          name,
          description,
          is_active: true,
        })
        .select()
        .single();

      if (menuError) throw menuError;

      const qrCodeUrl = `https://preview--tapmenu.lovable.app/menudemo/${menuData.id}`;

      const { error: qrError } = await supabase.from("qr_codes").insert({
        restaurant_id: restaurant.id,
        menu_id: menuData.id,
        name: `Codice QR Predefinito - ${name}`,
        qr_code_url: qrCodeUrl,
        is_active: true,
      });

      if (qrError) throw qrError;

      toast({
        title: "Successo",
        description: "Menu e codice QR creati con successo",
      });

      queryClient.invalidateQueries({ queryKey: ["menus"] });
      queryClient.invalidateQueries({ queryKey: ["qr-codes"] });
      onOpenChange(false);
      setName("");
      setDescription("");
    } catch (error) {
      console.error("Error creating menu:", error);
      toast({
        title: "Errore",
        description: "Impossibile creare il menu",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crea Nuovo Menu</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome Menu</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="es., Menu Pranzo"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrizione</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Descrivi il tuo menu..."
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annulla
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creazione..." : "Crea Menu"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};