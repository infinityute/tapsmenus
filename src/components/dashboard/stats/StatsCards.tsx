import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDownIcon, ArrowUpIcon, CircleCheck, CirclePlus, Star, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface Stat {
  value: number;
  percentageChange: number;
}

interface StatsCardsProps {
  stats: {
    orders: Stat;
    customers: Stat;
    revenue: Stat;
    averageOrder: Stat;
  };
}

export const StatsCards = ({ stats }: StatsCardsProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
    }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ordini totali</CardTitle>
          <CircleCheck className="h-5 w-5 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{stats.orders.value}</div>
            <div className={cn(
              "flex items-center text-xs",
              stats.orders.percentageChange > 0 ? "text-green-500" : "text-red-500"
            )}>
              {stats.orders.percentageChange > 0 ? (
                <ArrowUpIcon className="h-4 w-4" />
              ) : (
                <ArrowDownIcon className="h-4 w-4" />
              )}
              {formatPercentage(stats.orders.percentageChange)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Clienti totali</CardTitle>
          <Heart className="h-5 w-5 text-rose-500" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{stats.customers.value}</div>
            <div className={cn(
              "flex items-center text-xs",
              stats.customers.percentageChange > 0 ? "text-green-500" : "text-red-500"
            )}>
              {stats.customers.percentageChange > 0 ? (
                <ArrowUpIcon className="h-4 w-4" />
              ) : (
                <ArrowDownIcon className="h-4 w-4" />
              )}
              {formatPercentage(stats.customers.percentageChange)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ricavi totali</CardTitle>
          <Star className="h-5 w-5 text-yellow-500" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{formatCurrency(stats.revenue.value)}</div>
            <div className={cn(
              "flex items-center text-xs",
              stats.revenue.percentageChange > 0 ? "text-green-500" : "text-red-500"
            )}>
              {stats.revenue.percentageChange > 0 ? (
                <ArrowUpIcon className="h-4 w-4" />
              ) : (
                <ArrowDownIcon className="h-4 w-4" />
              )}
              {formatPercentage(stats.revenue.percentageChange)}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Medio Costo Ordini</CardTitle>
          <CirclePlus className="h-5 w-5 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold">{formatCurrency(stats.averageOrder.value)}</div>
            <div className={cn(
              "flex items-center text-xs",
              stats.averageOrder.percentageChange > 0 ? "text-green-500" : "text-red-500"
            )}>
              {stats.averageOrder.percentageChange > 0 ? (
                <ArrowUpIcon className="h-4 w-4" />
              ) : (
                <ArrowDownIcon className="h-4 w-4" />
              )}
              {formatPercentage(stats.averageOrder.percentageChange)}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};