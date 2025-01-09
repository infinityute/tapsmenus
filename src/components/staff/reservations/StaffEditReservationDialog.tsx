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

interface StaffEditReservationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reservation: any;
  onSuccess: () => void;
}

export const StaffEditReservationDialog = ({
  open,
  onOpenChange,
  reservation,
  onSuccess,
}: StaffEditReservationDialogProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [customerName, setCustomerName] = useState(reservation?.customer_name || "");
  const [customerEmail, setCustomerEmail] = useState(reservation?.customer_email || "");
  const [customerPhone, setCustomerPhone] = useState(reservation?.customer_phone || "");
  const [guests, setGuests] = useState(reservation?.guests?.toString() || "");
  const [reservationDate, setReservationDate] = useState(
    reservation?.reservation_date
      ? new Date(reservation.reservation_date).toISOString().split("T")[0]
      : ""
  );
  const [reservationTime, setReservationTime] = useState(
    reservation?.reservation_date
      ? new Date(reservation.reservation_date).toTimeString().slice(0, 5)
      : ""
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const dateTime = new Date(`${reservationDate}T${reservationTime}`);

      const { error } = await supabase
        .from("reservations")
        .update({
          customer_name: customerName,
          customer_email: customerEmail || null,
          customer_phone: customerPhone || null,
          reservation_date: dateTime.toISOString(),
          guests: parseInt(guests),
        })
        .eq("id", reservation.id);

      if (error) throw error;

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