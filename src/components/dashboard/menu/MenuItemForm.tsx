import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface Category {
  id: string;
  name: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category_id: string | null;
}

interface MenuItemFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menuId: string;
  categories: Category[];
  onSuccess: () => void;
  initialData?: MenuItem;
}

export const MenuItemForm = ({ 
  open, 
  onOpenChange, 
  menuId, 
  categories,
  onSuccess,
  initialData 
}: MenuItemFormProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("new");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [selectedExistingItem, setSelectedExistingItem] = useState<string | null>(null);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || "");
      setPrice(initialData.price.toString());
      setCategoryId(initialData.category_id);
      setActiveTab("new");
    }
  }, [initialData]);

  // Fetch existing menu items
  const { data: existingItems } = useQuery({
    queryKey: ["existing-menu-items"],
    queryFn: async () => {
      const { data: restaurant } = await supabase
        .from("restaurants")
        .select("id")
        .single();

      if (!restaurant) return [];

      const { data: menus } = await supabase
        .from("menus")
        .select("id")
        .eq("restaurant_id", restaurant.id);

      if (!menus?.length) return [];

      const menuIds = menus.map(m => m.id);
      
      const { data: items } = await supabase
        .from("menu_items")
        .select(`
          id,
          name,
          description,
          price,
          category_id
        `)
        .in("menu_id", menuIds);

      return items || [];
    },
  });

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setCategoryId(null);
    setSelectedExistingItem(null);
    setActiveTab("new");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (activeTab === "existing" && selectedExistingItem) {
        const existingItem = existingItems?.find(item => item.id === selectedExistingItem);
        if (!existingItem) throw new Error("Selected item not found");

        const { error } = await supabase
          .from("menu_items")
          .insert({
            menu_id: menuId,
            name: existingItem.name,
            description: existingItem.description,
            price: existingItem.price,
            category_id: existingItem.category_id,
          });

        if (error) throw error;
      } else {
        const menuItemData = {
          menu_id: menuId,
          category_id: categoryId,
          name,
          description,
          price: parseFloat(price),
        };

        if (initialData) {
          const { error } = await supabase
            .from("menu_items")
            .update(menuItemData)
            .eq("id", initialData.id);

          if (error) throw error;
        } else {
          const { error } = await supabase
            .from("menu_items")
            .insert(menuItemData);

          if (error) throw error;
        }
      }

      toast({
        title: "Success",
        description: `Menu item ${initialData ? 'updated' : 'created'} successfully`,
      });

      onSuccess();
      onOpenChange(false);
      resetForm();
    } catch (error) {
      console.error("Error saving menu item:", error);
      toast({
        title: "Error",
        description: `Failed to ${initialData ? 'update' : 'create'} menu item`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{initialData ? 'Edit' : 'Add New'} Articoli Menu</DialogTitle>
          {!initialData && (
            <DialogDescription>
              Crea un nuovo articolo o aggiungine uno esistente dagli altri menu.
            </DialogDescription>
          )}
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="new">Crea nuovo</TabsTrigger>
            {!initialData && (
              <TabsTrigger value="existing">Usa esistente</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="new">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome dell'articolo</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Classic Burger"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrizione</Label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe this item..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Prezzo</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select 
                  value={categoryId || ""} 
                  onValueChange={(value) => setCategoryId(value || null)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona una categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    onOpenChange(false);
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (initialData ? "Aggiornamento..." : "Creazione...") : (initialData ? "Aggiorna": "Crea")} Item
                </Button>
              </div>
            </form>
          </TabsContent>

          {!initialData && (
            <TabsContent value="existing">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="existingItem">Seleziona articolo esistente</Label>
                  <Select 
                    value={selectedExistingItem || ""} 
                    onValueChange={setSelectedExistingItem}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Scegli un articolo" />
                    </SelectTrigger>
                    <SelectContent>
                      {existingItems?.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name} - ${item.price}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      onOpenChange(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isLoading || !selectedExistingItem}
                  >
                    {isLoading ? "Aggiunta..." : "Aggiungi elemento"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};