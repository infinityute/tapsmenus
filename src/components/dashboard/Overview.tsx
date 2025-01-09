import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "./DashboardHeader";
import { DashboardStats } from "./stats/DashboardStats";
import { Notifications } from "./stats/Notifications";
import { ManageAnalyticsDialog } from "./analytics/ManageAnalyticsDialog";
import { Card, CardContent } from "@/components/ui/card";
import { format, subMonths } from "date-fns";
import { RevenueChart } from "./stats/RevenueChart";
import { PopularDishesChart } from "./stats/PopularDishesChart";

interface DailyAnalytics {
  total_reservations: number;
  total_covers: number;
  total_revenue: number;
  most_ordered_item: string;
  most_ordered_category: string;
  notes: string;
  notifications: Array<{
    title: string;
    description: string;
  }>;
}

interface AnalyticsResponse {
  total_reservations: number;
  total_covers: number;
  total_revenue: number;
  most_ordered_item: string;
  most_ordered_category: string;
  notes: string;
  notifications: any;
}

export const Overview = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [isManageAnalyticsOpen, setIsManageAnalyticsOpen] = useState(false);

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

  const { data: currentMonthAnalytics } = useQuery<DailyAnalytics | null>({
    queryKey: ["analytics", restaurant?.id, date],
    queryFn: async () => {
      if (!date || !restaurant?.id) return null;
      
      const { data } = await supabase.rpc('get_daily_analytics', {
        p_restaurant_id: restaurant.id,
        p_date: format(date, 'yyyy-MM-dd')
      });

      const result = data?.[0] as AnalyticsResponse | undefined;
      if (!result) return null;

      return {
        total_reservations: result.total_reservations,
        total_covers: result.total_covers,
        total_revenue: result.total_revenue,
        most_ordered_item: result.most_ordered_item,
        most_ordered_category: result.most_ordered_category,
        notes: result.notes,
        notifications: Array.isArray(result.notifications) 
          ? result.notifications.map((n: any) => ({
              title: String(n.title || ''),
              description: String(n.description || '')
            }))
          : []
      };
    },
    enabled: !!restaurant?.id && !!date,
  });

  const { data: lastMonthAnalytics } = useQuery<DailyAnalytics | null>({
    queryKey: ["analytics", restaurant?.id, "lastMonth", date],
    queryFn: async () => {
      if (!date || !restaurant?.id) return null;
      
      const lastMonthDate = subMonths(date, 1);
      const { data } = await supabase.rpc('get_daily_analytics', {
        p_restaurant_id: restaurant.id,
        p_date: format(lastMonthDate, 'yyyy-MM-dd')
      });

      const result = data?.[0] as AnalyticsResponse | undefined;
      if (!result) return null;

      return {
        total_reservations: result.total_reservations || 0,
        total_covers: result.total_covers || 0,
        total_revenue: result.total_revenue || 0,
        most_ordered_item: result.most_ordered_item,
        most_ordered_category: result.most_ordered_category,
        notes: result.notes,
        notifications: []
      };
    },
    enabled: !!restaurant?.id && !!date,
  });

  const stats = {
    orders: {
      value: currentMonthAnalytics?.total_reservations || 0,
      percentageChange: lastMonthAnalytics?.total_reservations ? 
        ((currentMonthAnalytics?.total_reservations || 0) - lastMonthAnalytics.total_reservations) / lastMonthAnalytics.total_reservations * 100 : 0
    },
    customers: {
      value: currentMonthAnalytics?.total_covers || 0,
      percentageChange: lastMonthAnalytics?.total_covers ? 
        ((currentMonthAnalytics?.total_covers || 0) - lastMonthAnalytics.total_covers) / lastMonthAnalytics.total_covers * 100 : 0
    },
    revenue: {
      value: currentMonthAnalytics?.total_revenue || 0,
      percentageChange: lastMonthAnalytics?.total_revenue ? 
        ((currentMonthAnalytics?.total_revenue || 0) - lastMonthAnalytics.total_revenue) / lastMonthAnalytics.total_revenue * 100 : 0
    },
    averageOrder: {
      value: currentMonthAnalytics?.total_revenue && currentMonthAnalytics?.total_reservations 
        ? Number((currentMonthAnalytics.total_revenue / currentMonthAnalytics.total_reservations).toFixed(2))
        : 0,
      percentageChange: lastMonthAnalytics?.total_revenue && lastMonthAnalytics?.total_reservations ? 
        (((currentMonthAnalytics?.total_revenue && currentMonthAnalytics?.total_reservations 
          ? (currentMonthAnalytics.total_revenue / currentMonthAnalytics.total_reservations)
          : 0) - (lastMonthAnalytics.total_revenue / lastMonthAnalytics.total_reservations)) / 
          (lastMonthAnalytics.total_revenue / lastMonthAnalytics.total_reservations)) * 100 : 0
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-background">
      <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-8">
        <DashboardHeader 
          date={date}
          setDate={setDate}
          onManageAnalytics={() => setIsManageAnalyticsOpen(true)}
        />

        <DashboardStats stats={stats} />

        <div className="grid gap-6 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardContent className="p-6">
              <RevenueChart />
            </CardContent>
          </Card>
          <Card className="lg:col-span-3">
            <CardContent className="p-6">
              <PopularDishesChart />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <Notifications notifications={currentMonthAnalytics?.notifications || []} />
          </CardContent>
        </Card>

        <ManageAnalyticsDialog 
          open={isManageAnalyticsOpen}
          onOpenChange={setIsManageAnalyticsOpen}
          date={date || new Date()}
        />
      </div>
    </div>
  );
};