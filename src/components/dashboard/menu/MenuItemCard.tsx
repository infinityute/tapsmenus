import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, GripVertical } from "lucide-react";
import { Draggable } from "@hello-pangea/dnd";
import { DeleteMenuItemDialog } from "./DeleteMenuItemDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface MenuItem {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: { name: string } | null;
  image_url: string | null;
}

interface MenuItemCardProps {
  item: MenuItem;
  index: number;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>, itemId: string) => void;
}

export const MenuItemCard = ({ 
  item, 
  index, 
  onEdit, 
  onDelete,
  onImageUpload 
}: MenuItemCardProps) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleImageRemove = async () => {
    try {
      const { error } = await supabase
        .from('menu_items')
        .update({ image_url: null })
        .eq('id', item.id);

      if (error) throw error;

      toast({
        title: "Successo",
        description: "Immagine rimossa con successo",
      });
    } catch (error) {
      console.error('Error removing image:', error);
      toast({
        title: "Error",
        description: "Impossibile rimuovere l'immagine",
        variant: "destructive",
      });
    }
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className="mb-4"
        >
          <Card className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-4">
              <div className="flex gap-4">
                {/* Image Section */}
                <div className="relative w-32 h-32 flex-shrink-0">
                  {item.image_url ? (
                    <div className="relative w-full h-full">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <Button
                        variant="destructive"
                        size="sm"
                        className="absolute top-1 right-1 h-6 w-6 p-0 rounded-full"
                        onClick={handleImageRemove}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => onImageUpload(e, item.id)}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <span className="text-xs text-gray-500">Aggiungi foto</span>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-medium text-gray-900 text-lg">{item.name}</h4>
                        <div className="text-emerald-600 font-semibold whitespace-nowrap text-lg">
                          €{item.price.toFixed(2)}
                        </div>
                      </div>
                      {item.description && (
                        <p className="text-gray-600 mt-2 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      {item.category && (
                        <Badge variant="outline" className="mt-2">
                          {item.category.name}
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end gap-2 mt-4">
                    <div 
                      {...provided.dragHandleProps}
                      className="p-2 hover:bg-gray-50 rounded-lg cursor-grab transition-colors"
                    >
                      <GripVertical className="h-4 w-4 text-gray-400" />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(item)}
                      className="h-8 px-3 rounded-lg hover:bg-emerald-50 hover:text-emerald-600"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsDeleteDialogOpen(true)}
                      className="h-8 px-3 rounded-lg hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <DeleteMenuItemDialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
            onConfirm={() => {
              onDelete(item.id);
              setIsDeleteDialogOpen(false);
            }}
            itemName={item.name}
          />
        </div>
      )}
    </Draggable>
  );
};