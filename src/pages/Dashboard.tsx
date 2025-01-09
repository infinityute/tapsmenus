import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { Overview } from "@/components/dashboard/Overview";
import { useSession } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const session = useSession();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [isStaffMember, setIsStaffMember] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkUserRole = async () => {
      if (session?.user?.id) {
        const { data: staffMember, error } = await supabase
          .from("staff_members")
          .select("*")
          .eq("user_id", session.user.id)
          .maybeSingle();

        if (error) {
          console.error("Error checking staff status:", error);
          toast({
            title: "Errore",
            description: "Si è verificato un errore durante il controllo del ruolo.",
            variant: "destructive",
          });
        }

        setIsStaffMember(!!staffMember);
        setIsLoading(false);
      }
    };

    checkUserRole();
  }, [session, toast]);

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <div>Caricamento...</div>;
  }

  // Redirect staff members to staff portal
  if (isStaffMember) {
    return <Navigate to="/staff" replace />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <DashboardSidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />
      <main className="flex-1 overflow-y-auto transition-all duration-200">
        <Overview />
      </main>
    </div>
  );
};

export default Dashboard;