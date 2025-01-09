import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format, subMonths } from "date-fns";

export const RevenueChart = () => {
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

  const { data: revenueData } = useQuery({
    queryKey: ["revenue_data", restaurant?.id],
    queryFn: async () => {
      const endDate = new Date();
      const startDate = subMonths(endDate, 6);
      
      const { data } = await supabase.rpc("get_reservation_stats", {
        p_restaurant_id: restaurant?.id,
        p_start_date: format(startDate, "yyyy-MM-dd"),
        p_end_date: format(endDate, "yyyy-MM-dd"),
      });

      return data || [];
    },
    enabled: !!restaurant?.id,
  });

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Panoramica di entrate e coperti</h3>
        <p className="text-sm text-muted-foreground">Andamento negli ultimi 6 mesi</p>
      </div>
      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }}
              stroke="rgba(255,255,255,0.5)"
            />
            <YAxis 
              yAxisId="left" 
              tick={{ fontSize: 12 }}
              stroke="rgba(255,255,255,0.5)"
            />
            <YAxis 
              yAxisId="right" 
              orientation="right" 
              tick={{ fontSize: 12 }}
              stroke="rgba(255,255,255,0.5)"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="total_revenue"
              stroke="#8B5CF6"
              strokeWidth={2}
              dot={false}
              name="Revenue (€)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="total_covers"
              stroke="#D946EF"
              strokeWidth={2}
              dot={false}
              name="Covers"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};