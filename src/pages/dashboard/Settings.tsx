import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { SettingsForm } from "@/components/dashboard/settings/SettingsForm";
import { NotificationSettings } from "@/components/dashboard/settings/NotificationSettings";
import { BackupSettings } from "@/components/dashboard/settings/BackupSettings";
import { useIsMobile } from "@/hooks/use-mobile";

const Settings = () => {
  const session = useSession();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />
      <main className="flex-1 overflow-y-auto p-8 md:pt-4 pt-24">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Impostazioni</h1>
          <p className="text-muted-foreground">
          Gestisci le impostazioni e le preferenze del tuo ristorante
          </p>
        </div>

        <div className="space-y-8">
          <SettingsForm />
          <NotificationSettings />
          <BackupSettings />
        </div>
      </main>
    </div>
  );
};

export default Settings;