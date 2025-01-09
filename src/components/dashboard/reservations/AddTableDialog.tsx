import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TableLocation } from "./types";

interface AddTableDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  location: TableLocation | null;
  onSuccess: () => void;
  restaurantId: string;
}

export const AddTableDialog = ({
  open,
  onOpenChange,
  location,
  onSuccess,
  restaurantId,
}: AddTableDialogProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState("");

  const resetForm = () => {
    setName("");
    setCapacity("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { error } = await supabase.from('tables').insert({
        restaurant_id: restaurantId,
        name,
        capacity: parseInt(capacity),
        location: location,
        status: 'available'
      });

      if (error) throw error;

      toast({
        title: "Successo",
        description: "Tavolo creato con successo",
      });

      onSuccess();
      resetForm();
      onOpenChange(false);
    } catch (error) {
      console.error("Errore durante la creazione del tavolo:", error);
      toast({
        title: "Errore",
        description: "Impossibile creare il tavolo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!location) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Aggiungi nuovo tavolo {location === "indoor" ? "interno" : "esterno"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nome del tavolo</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="capacity">Capacità</Label>
            <Input
              id="capacity"
              type="number"
              min="1"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                onOpenChange(false);
                resetForm();
              }}
            >
              Annulla
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creazione..." : "Crea tavolo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};