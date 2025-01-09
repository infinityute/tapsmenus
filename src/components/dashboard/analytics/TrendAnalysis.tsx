import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { format } from "date-fns";

export const TrendAnalysis = () => {
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

  const { data: analytics, isLoading } = useQuery({
    queryKey: ["most_ordered_items", restaurant?.id],
    queryFn: async () => {
      const { data } = await supabase.rpc("get_most_ordered_items", {
        p_restaurant_id: restaurant?.id,
        p_start_date: format(new Date(new Date().setDate(new Date().getDate() - 30)), "yyyy-MM-dd"),
        p_end_date: format(new Date(), "yyyy-MM-dd"),
        p_limit: 5,
      });
      return data || [];
    },
    enabled: !!restaurant?.id,
  });

  // Colors for the pie chart segments
  const COLORS = ['#10B981', '#059669', '#047857', '#065F46', '#064E3B'];

  if (isLoading) {
    return (
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Piatti Più Popolari</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-[300px]">
            <p>Caricamento...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analytics || analytics.length === 0) {
    return (
      <Card className="col-span-1">
        <CardHeader>
          <CardTitle>Piatti Più Popolari</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-[300px]">
            <p>Nessun dato disponibile</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Piatti Più Popolari</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center items-center h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={analytics}
                dataKey="order_count"
                nameKey="item_name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={({ name, value }) => `${name}: ${value}`}
              >
                {analytics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};