import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { format } from "date-fns";

export const ReservationsGraph = () => {
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
    queryKey: ["reservations", restaurant?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("reservations")
        .select("*")
        .eq("restaurant_id", restaurant?.id)
        .order("reservation_date", { ascending: true });
      return data || [];
    },
    enabled: !!restaurant?.id,
  });

  const chartData = reservations?.map((reservation) => ({
    date: format(new Date(reservation.reservation_date), "MMM dd"),
    reservations: 1,
    guests: reservation.guests,
  }));

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Panoramica Prenotazioni</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[300px]" config={{}}>
          <LineChart data={chartData}>
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="reservations"
              stroke="#10B981"
              name="Prenotazioni"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="guests"
              stroke="#6366F1"
              name="Ospiti"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};