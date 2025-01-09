import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableStatus } from "./types";

interface ManageTableDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  table: Table | null;
  onSuccess: () => void;
}

export const ManageTableDialog = ({
  open,
  onOpenChange,
  table,
  onSuccess,
}: ManageTableDialogProps) => {
  const { toast } = useToast();
  const [status, setStatus] = useState<TableStatus>(table?.status || "available");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!table) return;
    
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from('tables')
        .update({ status })
        .eq('id', table.id);

      if (error) throw error;

      toast({
        title: "Successo",
        description: "Stato del tavolo aggiornato con successo",
      });

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Errore durante l'aggiornamento del tavolo:", error);
      toast({
        title: "Errore",
        description: "Impossibile aggiornare lo stato del tavolo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!table) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gestisci {table.name}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Informazioni Tavolo</Label>
            <div className="text-sm text-gray-600">
              <p>Capacità: {table.capacity} persone</p>
              <p>Posizione: {table.location === "indoor" ? "Interno" : "Esterno"}</p>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Stato</Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as Table["status"])}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="available">Disponibile</SelectItem>
                <SelectItem value="reserved">Prenotato</SelectItem>
                <SelectItem value="on-dine">Occupato</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annulla
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Aggiornamento..." : "Aggiorna Stato"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};