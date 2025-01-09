import { Card, CardContent } from "@/components/ui/card";
import { StatsCards } from "./StatsCards";
import { RevenueChart } from "./RevenueChart";
import { PopularDishesChart } from "./PopularDishesChart";

interface DashboardStatsProps {
  stats: {
    orders: { value: number; percentageChange: number };
    customers: { value: number; percentageChange: number };
    revenue: { value: number; percentageChange: number };
    averageOrder: { value: number; percentageChange: number };
  };
}

export const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="space-y-6">
      <StatsCards stats={stats} />
      <div className="grid gap-6 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardContent className="p-6">
            <RevenueChart />
          </CardContent>
        </Card>
        <Card className="lg:col-span-3 flex justify-center">
          <CardContent className="p-6 w-full">
            <PopularDishesChart />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};