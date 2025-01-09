import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { ReservationList } from "@/components/dashboard/reservations/ReservationList";

const Reservations = () => {
  const session = useSession();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />
      <main className="flex-1 overflow-y-auto">
        <ReservationList />
      </main>
    </div>
  );
};

export default Reservations;