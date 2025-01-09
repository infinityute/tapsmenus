import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { StaffReservationCard } from "./StaffReservationCard";

interface StaffReservationListProps {
  restaurantId: string;
}

export const StaffReservationList = ({ restaurantId }: StaffReservationListProps) => {
  const { data: reservations, isLoading, refetch } = useQuery({
    queryKey: ["staffReservations", restaurantId],
    queryFn: async () => {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      
      const { data, error } = await supabase
        .from("reservations")
        .select("*")
        .eq("restaurant_id", restaurantId)
        .gte("reservation_date", startOfDay.toISOString())
        .order("reservation_date", { ascending: true });

      if (error) throw error;
      return data;
    },
    enabled: !!restaurantId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (!reservations?.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Nessuna prenotazione per oggi</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reservations.map((reservation) => (
        <StaffReservationCard
          key={reservation.id}
          reservation={reservation}
          onSuccess={refetch}
        />
      ))}
    </div>
  );
};