import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { PieChart, Pie, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

export const PopularDishesChart = () => {
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

  const { data: popularItems, isLoading } = useQuery({
    queryKey: ["popular_items", restaurant?.id],
    queryFn: async () => {
      const startDate = format(new Date(new Date().setDate(new Date().getDate() - 30)), "yyyy-MM-dd");
      const endDate = format(new Date(), "yyyy-MM-dd");
      
      const { data } = await supabase.rpc("get_most_ordered_items", {
        p_restaurant_id: restaurant?.id,
        p_start_date: startDate,
        p_end_date: endDate,
        p_limit: 5,
      });
      return data || [];
    },
    enabled: !!restaurant?.id,
  });

  const COLORS = ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95'];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Piatti più popolari</h3>
          <p className="text-sm text-muted-foreground">Caricamento...</p>
        </div>
      </div>
    );
  }

  if (!popularItems || popularItems.length === 0) {
    return (
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Piatti più popolari</h3>
          <p className="text-sm text-muted-foreground">Nessun dato disponibile</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Piatti più popolari</h3>
        <p className="text-sm text-muted-foreground">Top 5 piatti ordinati</p>
      </div>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={popularItems}
              dataKey="order_count"
              nameKey="item_name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8B5CF6"
              label={({ name, value }) => `${name}: ${value}`}
            >
              {popularItems.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  stroke="rgba(255,255,255,0.1)"
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(0,0,0,0.8)',
                border: '1px solid rgba(255,255,255,0.2)'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};