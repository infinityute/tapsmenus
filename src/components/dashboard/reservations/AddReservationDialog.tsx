import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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

interface AddReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  restaurantId: string;
  onSuccess: () => void;
}

export const AddReservationDialog = ({
  open,
  onOpenChange,
  restaurantId,
  onSuccess,
}: AddReservationDialogProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [guests, setGuests] = useState("");
  const [reservationDate, setReservationDate] = useState("");
  const [reservationTime, setReservationTime] = useState("");
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
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
        
        setAvailableTables(typedTables);
      }
    } catch (error) {
      console.error("Error fetching tables:", error);
    }
  };

  const resetForm = () => {
    setCustomerName("");
    setCustomerEmail("");
    setCustomerPhone("");
    setGuests("");
    setReservationDate("");
    setReservationTime("");
    setSelectedTable(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const dateTime = new Date(`${reservationDate}T${reservationTime}`);

      const { error } = await supabase.from("reservations").insert({
        restaurant_id: restaurantId,
        customer_name: customerName,
        customer_email: customerEmail || null,
        customer_phone: customerPhone || null,
        reservation_date: dateTime.toISOString(),
        guests: parseInt(guests),
        table_number: selectedTable,
        status: "in attesa",
      });

      if (error) throw error;

      // Update table status if a table was selected
      if (selectedTable) {
        await supabase
          .from("tables")
          .update({ status: "reserved" as TableStatus })
          .eq("name", selectedTable)
          .eq("restaurant_id", restaurantId);
      }

      toast({
        title: "Successo",
        description: "Prenotazione creata con successo",
      });

      onSuccess();
      onOpenChange(false);
      resetForm();
    } catch (error) {
      console.error("Errore durante la creazione della prenotazione:", error);
      toast({
        title: "Errore",
        description: "Impossibile creare la prenotazione",
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
          <DialogTitle>Aggiungi nuova prenotazione</DialogTitle>
          <DialogDescription>
            Crea una nuova prenotazione per il tuo ristorante
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Nome del cliente</Label>
            <Input
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerEmail">Email</Label>
            <Input
              id="customerEmail"
              type="email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerPhone">Telefono</Label>
            <Input
              id="customerPhone"
              type="tel"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="guests">Numero di ospiti</Label>
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
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reservationDate">Data</Label>
              <Input
                id="reservationDate"
                type="date"
                value={reservationDate}
                onChange={(e) => setReservationDate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reservationTime">Ora</Label>
              <Input
                id="reservationTime"
                type="time"
                value={reservationTime}
                onChange={(e) => setReservationTime(e.target.value)}
                required
              />
            </div>
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
              Cancella
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Creazione..." : "Crea prenotazione"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};