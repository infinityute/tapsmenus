import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { MenuItemCard } from "./MenuItemCard";
import { CategoryCard } from "./CategoryCard";

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: { name: string } | null;
  image_url: string | null;
}

interface MenuItemsSectionProps {
  items: MenuItem[];
  onAddItem: () => void;
  onEditItem: (item: MenuItem) => void;
  onDeleteItem: (id: string) => void;
  onReorderItems: (items: MenuItem[]) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>, itemId: string) => void;
}

export const MenuItemsSection = ({ 
  items = [], 
  onAddItem,
  onEditItem,
  onDeleteItem,
  onReorderItems,
  onImageUpload,
}: MenuItemsSectionProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const reorderedItems = Array.from(items);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);

    onReorderItems(reorderedItems);
  };

  // Group items by category
  const categories = items.reduce((acc, item) => {
    const categoryName = item.category?.name || "Senza categoria";
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const filteredItems = selectedCategory 
    ? categories[selectedCategory] || []
    : items;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Articoli del Menu</h2>
          <p className="text-sm text-gray-500 mt-1">
            Gestisci e organizza gli articoli del tuo menu
          </p>
        </div>
        <Button 
          onClick={onAddItem}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          Aggiungi Articolo
        </Button>
      </div>

      {/* Categories Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <CategoryCard
          name="Tutti"
          itemCount={items.length}
          isSelected={selectedCategory === null}
          onClick={() => setSelectedCategory(null)}
        />
        {Object.entries(categories).map(([category, categoryItems]) => (
          <CategoryCard
            key={category}
            name={category}
            itemCount={categoryItems.length}
            isSelected={selectedCategory === category}
            onClick={() => setSelectedCategory(category)}
          />
        ))}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="menu-items">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredItems.map((item, index) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  index={index}
                  onEdit={onEditItem}
                  onDelete={onDeleteItem}
                  onImageUpload={onImageUpload}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {items.length === 0 && (
        <Card className="border border-dashed border-gray-200 bg-gray-50">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <div className="rounded-full bg-gray-100 p-3 mb-4">
              <Plus className="h-6 w-6 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">Nessun articolo in questo menu</p>
            <p className="text-sm text-gray-500 mt-1">
              Aggiungi il tuo primo articolo per iniziare
            </p>
            <Button 
              onClick={onAddItem} 
              variant="outline" 
              className="mt-4"
            >
              Aggiungi Articolo
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};