import { useState } from "react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { EditReservationDialog } from "./EditReservationDialog";

interface ReservationCardProps {
  reservation: any;
  onSuccess: () => void;
  restaurantId: string;
}

export const ReservationCard = ({ 
  reservation, 
  onSuccess,
  restaurantId 
}: ReservationCardProps) => {
  const { toast } = useToast();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      // If there's a table assigned, update its status
      if (reservation.table_number) {
        await supabase
          .from('tables')
          .update({ status: 'available' })
          .eq('name', reservation.table_number)
          .eq('restaurant_id', restaurantId);
      }

      const { error } = await supabase
        .from('reservations')
        .delete()
        .eq('id', reservation.id);

      if (error) throw error;

      toast({
        title: "Successo",
        description: "Prenotazione eliminata con successo",
      });
      onSuccess();
    } catch (error) {
      console.error('Errore durante l\'eliminazione della prenotazione:', error);
      toast({
        title: "Errore",
        description: "Impossibile eliminare la prenotazione",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded-lg shadow-sm border">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-medium">{reservation.customer_name}</h3>
            <p className="text-sm text-gray-600">
              {format(new Date(reservation.reservation_date), "HH:mm", { locale: it })}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-100"
              onClick={() => setIsEditDialogOpen(true)}
            >
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-100"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          <p>{reservation.guests} persone</p>
          {reservation.table_number && (
            <p>Tavolo: {reservation.table_number}</p>
          )}
          {reservation.special_requests && (
            <p className="mt-1 text-gray-500">{reservation.special_requests}</p>
          )}
        </div>
      </div>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Conferma eliminazione</AlertDialogTitle>
            <AlertDialogDescription>
              Sei sicuro di voler eliminare questa prenotazione? Questa azione non può essere annullata.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annulla</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
              disabled={isDeleting}
            >
              {isDeleting ? "Eliminazione..." : "Elimina"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <EditReservationDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        reservation={reservation}
        onSuccess={onSuccess}
        restaurantId={restaurantId}
      />
    </>
  );
};