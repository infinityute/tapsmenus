import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";

interface Category {
  id: string;
  name: string;
  description: string | null;
  display_order: number;
}

interface CategoriesSectionProps {
  categories: Category[];
  onReorderCategories: (categories: Category[]) => void;
  onAddCategory: () => void;
}

export const CategoriesSection = ({ 
  categories,
  onReorderCategories,
  onAddCategory,
}: CategoriesSectionProps) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(categories);
    const [removed] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, removed);

    // Update display_order for all items
    const reorderedCategories = items.map((item, index) => ({
      ...item,
      display_order: index
    }));

    onReorderCategories(reorderedCategories);
  };

  // Sort categories by display_order before rendering
  const sortedCategories = [...categories].sort((a, b) => 
    (a.display_order ?? 0) - (b.display_order ?? 0)
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Categorie</h2>
        <Button onClick={onAddCategory}>Aggiungi categorie</Button>
      </div>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {sortedCategories.map((category, index) => (
                <Draggable 
                  key={category.id} 
                  draggableId={category.id} 
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <Card>
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            <div
                              {...provided.dragHandleProps}
                              className="p-2 hover:bg-gray-100 rounded cursor-grab"
                            >
                              <GripVertical className="h-5 w-5 text-gray-500" />
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium">{category.name}</h3>
                              {category.description && (
                                <p className="text-sm text-muted-foreground">
                                  {category.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {categories.length === 0 && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center p-6">
            <p className="text-muted-foreground">Nessuna categoria</p>
            <p className="text-sm text-muted-foreground">
            Aggiungi la tua prima categoria per organizzare le voci del tuo menu
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};