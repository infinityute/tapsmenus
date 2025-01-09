import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableStatus, TableLocation } from "./types";

interface EditReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: any;
  onSuccess: () => void;
  restaurantId: string;
}

export const EditReservationDialog = ({
  open,
  onOpenChange,
  reservation,
  onSuccess,
  restaurantId,
}: EditReservationDialogProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [customerName, setCustomerName] = useState(reservation?.customer_name || "");
  const [guests, setGuests] = useState(reservation?.guests?.toString() || "");
  const [selectedTable, setSelectedTable] = useState(reservation?.table_number || null);
  const [availableTables, setAvailableTables] = useState<Table[]>([]);

  useEffect(() => {
    if (open && restaurantId) {
      fetchAvailableTables();
    }
  }, [open, restaurantId]);

  const fetchAvailableTables = async () => {
    try {
      const { data: tables } = await supabase
        .from("tables")
        .select("*")
        .eq("restaurant_id", restaurantId)
        .eq("status", "available")
        .order("name", { ascending: true });

      if (tables) {
        const typedTables = tables.map(table => ({
          ...table,
          status: table.status as TableStatus,
          location: table.location as TableLocation
        })) as Table[];
        
        // Include the currently selected table in the available tables list
        if (reservation?.table_number) {
          const currentTable = await supabase
            .from("tables")
            .select("*")
            .eq("restaurant_id", restaurantId)
            .eq("name", reservation.table_number)
            .single();

          if (currentTable.data && !typedTables.find(t => t.name === currentTable.data.name)) {
            typedTables.push({
              ...currentTable.data,
              status: currentTable.data.status as TableStatus,
              location: currentTable.data.location as TableLocation
            });
          }
        }
        
        setAvailableTables(typedTables);
      }
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update reservation
      const { error } = await supabase
        .from("reservations")
        .update({
          customer_name: customerName,
          guests: parseInt(guests),
          table_number: selectedTable,
        })
        .eq("id", reservation.id);

      if (error) throw error;

      // Update table status
      if (selectedTable) {
        await supabase
          .from("tables")
          .update({ status: "reserved" as TableStatus })
          .eq("name", selectedTable)
          .eq("restaurant_id", restaurantId);
      }

      // If the table was changed, set the old table as available
      if (reservation.table_number && reservation.table_number !== selectedTable) {
        await supabase
          .from("tables")
          .update({ status: "available" as TableStatus })
          .eq("name", reservation.table_number)
          .eq("restaurant_id", restaurantId);
      }

      toast({
        title: "Successo",
        description: "Prenotazione aggiornata con successo",
      });

      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error("Errore durante l'aggiornamento della prenotazione:", error);
      toast({
        title: "Errore",
        description: "Impossibile aggiornare la prenotazione",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter tables based on guest count
  const filteredTables = availableTables.filter(
    table => table.capacity >= parseInt(guests || "0")
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifica Prenotazione</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Nome Cliente</Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="guests">Numero Ospiti</Label>
            <Input
              id="guests"
              type="number"
              min="1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              required
            />
          </div>
          {guests && parseInt(guests) > 0 && (
            <div className="space-y-2">
              <Label htmlFor="table">Tavolo</Label>
              <Select 
                value={selectedTable || undefined}
                onValueChange={setSelectedTable}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona un tavolo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no_table">Nessun tavolo</SelectItem>
                  {filteredTables.map((table) => (
                    <SelectItem key={table.id} value={table.name}>
                      {table.name} (Capacità: {table.capacity})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {filteredTables.length === 0 && guests && (
                <p className="text-sm text-yellow-600 mt-1">
                  Non ci sono tavoli disponibili per {guests} ospiti
                </p>
              )}
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annulla
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Aggiornamento..." : "Aggiorna"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};