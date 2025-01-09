import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { User, Clock, Users } from "lucide-react";

export const ReservationCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const { data: restaurant } = useQuery({
    queryKey: ["restaurant"],
    queryFn: async () => {
      const { data } = await supabase
        .from("restaurants")
        .select("*")
        .single();
      return data;
    },
  });

  const { data: reservations } = useQuery({
    queryKey: ["reservations", restaurant?.id, selectedDate],
    queryFn: async () => {
      if (!selectedDate) return [];
      
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const { data } = await supabase
        .from("reservations")
        .select("*")
        .eq("restaurant_id", restaurant?.id)
        .gte("reservation_date", startOfDay.toISOString())
        .lte("reservation_date", endOfDay.toISOString())
        .order("reservation_date", { ascending: true });
      
      return data || [];
    },
    enabled: !!restaurant?.id && !!selectedDate,
  });

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-6">
      <Card className="p-4 md:p-6">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={setSelectedDate}
          className="rounded-md"
        />
      </Card>
      
      <Card className="p-4 md:p-6">
        <h3 className="font-semibold mb-4 text-base md:text-lg">
          Prenotazioni per {selectedDate ? format(selectedDate, "PPP") : ""}
        </h3>
        <div className="space-y-3 md:space-y-4">
          {reservations?.map((reservation) => (
            <Card key={reservation.id} className="p-3 md:p-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span className="font-medium truncate">{reservation.customer_name}</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 shrink-0" />
                      {format(new Date(reservation.reservation_date), "p")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4 shrink-0" />
                      {reservation.guests} ospiti
                    </div>
                  </div>
                </div>
                <Badge 
                  variant={getStatusBadgeVariant(reservation.status)}
                  className="self-start md:self-center"
                >
                  {reservation.status}
                </Badge>
              </div>
            </Card>
          ))}
          {(!reservations || reservations.length === 0) && (
            <div className="text-center py-6 text-muted-foreground">
              Nessuna prenotazione per questo giorno
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};