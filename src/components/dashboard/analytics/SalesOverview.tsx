import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Utensils, Users, DollarSign, TrendingUp } from "lucide-react";

export const SalesOverview = () => {
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

  const { data: analytics } = useQuery({
    queryKey: ["analytics", restaurant?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("analytics")
        .select("*")
        .eq("restaurant_id", restaurant?.id)
        .order("date", { ascending: false })
        .limit(30);
      return data;
    },
    enabled: !!restaurant?.id,
  });

  const calculateTotals = () => {
    if (!analytics) return { orders: 0, customers: 0, revenue: 0, average: 0 };

    const totals = analytics.reduce(
      (acc, curr) => {
        acc.orders += curr.total_reservations || 0;
        acc.customers += curr.total_covers || 0;
        acc.revenue += Number(curr.total_revenue) || 0;
        return acc;
      },
      { orders: 0, customers: 0, revenue: 0 }
    );

    return {
      ...totals,
      average: totals.orders ? totals.revenue / totals.orders : 0,
    };
  };

  const totals = calculateTotals();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Totale Ordini</CardTitle>
          <Utensils className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totals.orders}</div>
          <p className="text-xs text-muted-foreground">Ultimi 30 giorni</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Totale Clienti</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totals.customers}</div>
          <p className="text-xs text-muted-foreground">Ultimi 30 giorni</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ricavo Totale</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            €{totals.revenue.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">Ultimi 30 giorni</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Valore Medio Ordine
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            €{totals.average.toFixed(2)}
          </div>
          <p className="text-xs text-muted-foreground">Ultimi 30 giorni</p>
        </CardContent>
      </Card>
    </div>
  );
};