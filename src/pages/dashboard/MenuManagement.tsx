import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { CreateMenuDialog } from "@/components/dashboard/menu/CreateMenuDialog";
import { MenuList } from "@/components/dashboard/menu/MenuList";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { Menu, parseMenuStyles } from "@/types/menu";

const MenuManagement = () => {
  const session = useSession();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  // Fetch restaurant ID for the current user
  const { data: restaurant } = useQuery({
    queryKey: ["restaurant"],
    queryFn: async () => {
      const { data } = await supabase
        .from("restaurants")
        .select("*")
        .eq("user_id", session?.user?.id)
        .single();
      return data;
    },
    enabled: !!session?.user?.id,
  });

  // Fetch menus for the restaurant
  const { data: menus, isLoading, refetch } = useQuery({
    queryKey: ["menus", restaurant?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("menus")
        .select("*")
        .eq("restaurant_id", restaurant?.id)
        .order("created_at", { ascending: false });

      return (data || []).map(menu => ({
        ...menu,
        styles: parseMenuStyles(menu.styles)
      })) as Menu[];
    },
    enabled: !!restaurant?.id,
  });

  const handleMenuDelete = () => {
    refetch();
  };

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <DashboardSidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />
      <main className="flex-1 overflow-y-auto p-8 md:pt-4 pt-24">
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight">Gestione Menu</h1>
          <p className="text-muted-foreground">
            Crea e gestisci i menu del tuo ristorante
          </p>
        </div>

        <div className="mb-4">
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Crea Menu
          </Button>
        </div>

        <MenuList 
          menus={menus || []} 
          isLoading={isLoading} 
          onDelete={handleMenuDelete}
        />
        <CreateMenuDialog
          open={isCreateDialogOpen}
          onOpenChange={setIsCreateDialogOpen}
        />
      </main>
    </div>
  );
};

export default MenuManagement;