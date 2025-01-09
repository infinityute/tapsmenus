import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { useQuery } from "@tanstack/react-query";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { CategoryForm } from "@/components/dashboard/menu/CategoryForm";
import { MenuItemForm } from "@/components/dashboard/menu/MenuItemForm";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useIsMobile } from "@/hooks/use-mobile";
import { MenuEditorHeader } from "@/components/dashboard/menu/MenuEditorHeader";
import { MenuItemsSection } from "@/components/dashboard/menu/MenuItemsSection";
import { CategoriesSection } from "@/components/dashboard/menu/CategoriesSection";

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: { id: string; name: string } | null;
  category_id: string | null;
  image_url: string | null;
  display_order: number;
  menu_id: string;
}

interface Category {
  id: string;
  name: string;
  description: string | null;
  display_order: number;
}

const MenuEditor = () => {
  const params = useParams<{ menuId: string }>();
  const menuId = params.menuId;
  const session = useSession();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);
  const [isCategoryFormOpen, setIsCategoryFormOpen] = useState(false);
  const [isMenuItemFormOpen, setIsMenuItemFormOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const { data: menuData, isLoading, refetch } = useQuery({
    queryKey: ["menu", menuId],
    queryFn: async () => {
      if (!menuId) {
        throw new Error("Menu ID is required");
      }

      const { data: menuData, error: menuError } = await supabase
        .from("menus")
        .select(`
          id,
          name,
          description,
          restaurant_id,
          restaurant:restaurants (
            id,
            name
          ),
          menu_items (
            id,
            name,
            description,
            price,
            image_url,
            display_order,
            menu_id,
            category_id,
            category:categories (
              id,
              name
            )
          )
        `)
        .eq("id", menuId)
        .maybeSingle();

      if (menuError) {
        console.error("Error fetching menu:", menuError);
        throw menuError;
      }

      if (!menuData) {
        toast({
          title: "Error",
          description: "Menu not found",
          variant: "destructive",
        });
        return null;
      }

      return menuData;
    },
    enabled: !!menuId && !!session?.user,
  });

  const { data: categories } = useQuery({
    queryKey: ["categories", menuData?.restaurant_id],
    queryFn: async () => {
        if (!menuData?.restaurant_id) return [];

        const { data, error } = await supabase
            .from("categories")
            .select("*")
            .eq("restaurant_id", menuData.restaurant_id);

        if (error) {
            console.error("Errore durante il recupero delle categorie:", error);
            throw error;
        }

        return data || [];
    },
    enabled: !!menuData?.restaurant_id,
});

  const handleReorderItems = async (reorderedItems: MenuItem[]) => {
    try {
      const updates = reorderedItems.map((item) => ({
        id: item.id,
        menu_id: item.menu_id,
        name: item.name,
        price: item.price,
        display_order: item.display_order,
        description: item.description,
        category_id: item.category_id,
        image_url: item.image_url
      }));

      const { error } = await supabase
        .from('menu_items')
        .upsert(updates, { onConflict: 'id' });

      if (error) throw error;

      toast({
        title: "Successo",
        description: "Menu riordinato con successo",
      });

      refetch();
    } catch (error) {
      console.error("Errore durante il riordinamento del menu:", error);
      toast({
        title: "Errore",
        description: "Impossibile riordinare il menu",
        variant: "destructive",
      });
    }
  };

const handleReorderCategories = async (reorderedCategories: Category[]) => {
    try {
        console.log("Riordinamento delle categorie:", reorderedCategories);
        
        const updates = reorderedCategories.map((category) => ({
            id: category.id,
            name: category.name,
            restaurant_id: menuData?.restaurant_id,
            display_order: category.display_order,
            description: category.description
        }));

        console.log("Aggiornamenti da inviare:", updates);

        const { error } = await supabase
            .from('categories')
            .upsert(updates, { 
                onConflict: 'id'
            });

        if (error) {
            console.error("Errore durante l'aggiornamento delle categorie:", error);
            throw error;
        }

        toast({
            title: "Successo",
            description: "Categorie riordinate con successo",
        });

        refetch();
    } catch (error) {
        console.error("Errore durante il riordinamento delle categorie:", error);
        toast({
            title: "Errore",
            description: "Impossibile riordinare le categorie",
            variant: "destructive",
        });
    }
};

const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    try {
        const file = event.target.files?.[0];
        if (!file) return;

        const fileExt = file.name.split('.').pop();
        const filePath = `${session?.user?.id}/${itemId}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
            .from('menu-images')
            .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
            .from('menu-images')
            .getPublicUrl(filePath);

        const { error: updateError } = await supabase
            .from('menu_items')
            .update({ image_url: publicUrl })
            .eq('id', itemId);

        if (updateError) throw updateError;

        toast({
            title: "Successo",
            description: "Immagine caricata con successo",
        });

        refetch();
    } catch (error) {
        console.error("Errore durante il caricamento dell'immagine:", error);
        toast({
            title: "Errore",
            description: "Impossibile caricare l'immagine",
            variant: "destructive",
        });
    }
};

const handleEditItem = (item: MenuItem) => {
    setSelectedItem(item);
    setIsMenuItemFormOpen(true);
};


  const handleDeleteItem = async (id: string) => {
    try {
        const { error } = await supabase
            .from('menu_items')
            .delete()
            .eq('id', id);

        if (error) throw error;

        toast({
            title: "Successo",
            description: "Elemento del menu eliminato con successo",
        });

        refetch();
    } catch (error) {
        console.error("Errore durante l'eliminazione dell'elemento del menu:", error);
        toast({
            title: "Errore",
            description: "Impossibile eliminare l'elemento del menu",
            variant: "destructive",
        });
    }
};

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-500">Caricamento del menu in corso...</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="flex flex-1 overflow-hidden">
        <DashboardSidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-8 md:pt-4 pt-24 pb-0">
          <MenuEditorHeader 
            menuName={menuData?.name} 
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
          
          <div className="space-y-6">
            <CategoriesSection 
              categories={categories || []}
              onReorderCategories={handleReorderCategories}
              onAddCategory={() => setIsCategoryFormOpen(true)}
            />
            
            <MenuItemsSection 
              items={menuData?.menu_items || []}
              onAddItem={() => {
                setSelectedItem(null);
                setIsMenuItemFormOpen(true);
              }}
              onEditItem={handleEditItem}
              onDeleteItem={handleDeleteItem}
              onReorderItems={handleReorderItems}
              onImageUpload={handleImageUpload}
            />
          </div>

          {menuData?.restaurant_id && (
            <CategoryForm
              open={isCategoryFormOpen}
              onOpenChange={setIsCategoryFormOpen}
              restaurantId={menuData.restaurant_id}
              onSuccess={() => {
                refetch();
              }}
            />
          )}

          {menuId && categories && (
            <MenuItemForm
              open={isMenuItemFormOpen}
              onOpenChange={setIsMenuItemFormOpen}
              menuId={menuId}
              categories={categories}
              onSuccess={() => {
                refetch();
                setSelectedItem(null);
              }}
              initialData={selectedItem}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default MenuEditor;
