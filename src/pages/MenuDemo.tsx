import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { MenuPreview } from "@/components/MenuPreview";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { parseMenuStyles } from "@/types/menu";

const MenuDemo = () => {
  const { menuId } = useParams();

  const { data: menuData, isLoading } = useQuery({
    queryKey: ["menu", menuId],
    queryFn: async () => {
      if (!menuId) return null;

      const { data: menu, error: menuError } = await supabase
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
        .eq("id", menuId)
        .single();

      if (menuError) throw menuError;
      return menu;
    },
    enabled: !!menuId,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!menuData && menuId) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-500">Menu non trovato</p>
      </div>
    );
  }

  // If no menuId is provided, show the default sample menu
  if (!menuId) {
    return <MenuPreview />;
  }

  // Transform the menu items to match the MenuPreview format
  const transformedItems = menuData.menu_items.map((item) => ({
    id: item.id,
    name: item.name,
    description: item.description || "",
    price: item.price.toString(),
    category: item.category?.name.toLowerCase() || "other",
    image: item.image_url || "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=500"
  }));

  return (
    <MenuPreview
      items={transformedItems}
      styles={parseMenuStyles(menuData.styles)}
    />
  );
};

export default MenuDemo;