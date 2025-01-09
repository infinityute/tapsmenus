import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SalesOverview } from "@/components/dashboard/analytics/SalesOverview";
import { ReservationsGraph } from "@/components/dashboard/analytics/ReservationsGraph";
import { TrendAnalysis } from "@/components/dashboard/analytics/TrendAnalysis";
import { DateRangePicker } from "@/components/dashboard/analytics/DateRangePicker";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Analytics = () => {
  const session = useSession();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />
      <main className="flex-1 overflow-y-auto p-6 md:pt-4 pt-24">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <h1 className="text-2xl font-bold">Analisi e report</h1>
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 w-full md:w-auto">
              <DateRangePicker />
              <Button variant="outline" className="w-full md:w-auto">
                <Download className="mr-2 h-4 w-4" />
                Esporta Report
              </Button>
            </div>
          </div>

          <SalesOverview />

          <div className="grid gap-6 lg:grid-cols-7">
            <div className="lg:col-span-4">
              <ReservationsGraph />
            </div>
            <div className="lg:col-span-3">
              <TrendAnalysis />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;