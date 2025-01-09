import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { MenuPreview } from "@/components/MenuPreview";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Loader2 } from "lucide-react";
import { parseMenuStyles } from "@/types/menu";

const MenuOrdering = () => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);

  // If not authenticated, redirect to login
  if (!session) {
    navigate("/login");
    return <></>;  // Return empty fragment while redirecting
  }

  // Fetch staff member's restaurant
  const { data: staffMember } = useQuery({
    queryKey: ["staffMember", session?.user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("staff_members")
        .select("restaurant_id")
        .eq("user_id", session?.user?.id)
        .single();
      return data;
    },
    enabled: !!session?.user?.id,
  });

  // Fetch available menus
  const { data: menus, isLoading: isLoadingMenus } = useQuery({
    queryKey: ["menus", staffMember?.restaurant_id],
    queryFn: async () => {
      const { data } = await supabase
        .from("menus")
        .select("*")
        .eq("restaurant_id", staffMember?.restaurant_id)
        .eq("is_active", true)
        .order("name");
      return data;
    },
    enabled: !!staffMember?.restaurant_id,
  });

  // Fetch selected menu with items
  const { data: selectedMenu, isLoading: isLoadingMenu } = useQuery({
    queryKey: ["menu", selectedMenuId],
    queryFn: async () => {
      const { data: menu } = await supabase
        .from("menus")
        .select(`
          *,
          menu_items (
            id,
            name,
            description,
            price,
            image_url,
            category_id,
            category:categories (
              id,
              name
            )
          )
        `)
        .eq("id", selectedMenuId)
        .single();

      if (!menu) return null;

      // Transform menu items to match MenuPreview format
      const transformedItems = menu.menu_items.map((item) => ({
        id: item.id,
        name: item.name,
        description: item.description || "",
        price: item.price.toString(),
        category: item.category?.name.toLowerCase() || "other",
        image: item.image_url || "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500",
      }));

      return {
        ...menu,
        items: transformedItems,
      };
    },
    enabled: !!selectedMenuId,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/staff")}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold">Menu Ordinazioni</h1>
          </div>
        </div>

        <div className="mb-8 w-full max-w-xs">
          <Select
            value={selectedMenuId || ""}
            onValueChange={(value) => setSelectedMenuId(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleziona un menu" />
            </SelectTrigger>
            <SelectContent>
              {menus?.map((menu) => (
                <SelectItem key={menu.id} value={menu.id}>
                  {menu.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {(isLoadingMenus || isLoadingMenu) && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
          </div>
        )}

        {selectedMenu && (
          <MenuPreview
            items={selectedMenu.items}
            styles={parseMenuStyles(selectedMenu.styles)}
          />
        )}
      </div>
    </div>
  );
};

export default MenuOrdering;