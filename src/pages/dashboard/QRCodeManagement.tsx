import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { QRCodeList } from "@/components/dashboard/qr/QRCodeList";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/components/ui/use-toast";

const QRCodeManagement = () => {
  const session = useSession();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const { toast } = useToast();

  const { data: qrCodes, isLoading } = useQuery({
    queryKey: ["qr-codes"],
    queryFn: async () => {
      const { data: restaurant } = await supabase
        .from("restaurants")
        .select("id")
        .eq("user_id", session?.user?.id)
        .single();

      if (!restaurant) throw new Error("Ristorante non trovato");

      const { data: menus } = await supabase
        .from("menus")
        .select("id, name")
        .eq("restaurant_id", restaurant.id);

      if (!menus) return [];

      const qrCodesPromises = menus.map(async (menu) => {
        const { data: existingQRCodes } = await supabase
          .from("qr_codes")
          .select(`
            *,
            menu:menus (
              id,
              name,
              description
            )
          `)
          .eq("menu_id", menu.id)
          .eq("restaurant_id", restaurant.id);

        if (!existingQRCodes || existingQRCodes.length === 0) {
          const qrCodeUrl = `${window.location.origin}/menu/${menu.id}`;
          const { data: newQRCode, error } = await supabase
            .from("qr_codes")
            .insert({
              restaurant_id: restaurant.id,
              menu_id: menu.id,
              name: `Codice QR per ${menu.name}`,
              qr_code_url: qrCodeUrl,
            })
            .select(`
              *,
              menu:menus (
                id,
                name,
                description
              )
            `)
            .single();

          if (error) {
            toast({
              title: "Errore",
              description: "Impossibile creare il codice QR per il menu",
              variant: "destructive",
            });
            return null;
          }

          return newQRCode;
        }

        return existingQRCodes[0];
      });

      const qrCodes = await Promise.all(qrCodesPromises);
      return qrCodes.filter(Boolean);
    },
    enabled: !!session?.user,
  });

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />
      <main className="flex-1 overflow-y-auto p-8 md:pt-4 pt-24">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Gestione Codici QR</h1>
          <p className="text-muted-foreground">
            Gestisci i codici QR dei tuoi menu e monitora il loro utilizzo. I codici QR vengono generati automaticamente quando crei un menu.
          </p>
        </div>

        <QRCodeList qrCodes={qrCodes || []} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default QRCodeManagement;