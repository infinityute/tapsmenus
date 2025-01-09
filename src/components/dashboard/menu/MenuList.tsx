import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, QrCode, Trash, Palette } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteMenuDialog } from "./DeleteMenuDialog";
import { MenuCustomizationForm } from "./MenuCustomizationForm";
import { MenuQRDialog } from "./MenuQRDialog";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Menu } from "@/types/menu";

interface MenuListProps {
  menus: Menu[];
  isLoading: boolean;
  onDelete?: (id: string) => void;
}

export const MenuList = ({ menus, isLoading, onDelete }: MenuListProps) => {
  const [menuToDelete, setMenuToDelete] = useState<Menu | null>(null);
  const [menuToCustomize, setMenuToCustomize] = useState<Menu | null>(null);
  const [menuForQR, setMenuForQR] = useState<Menu | null>(null);
  const { toast } = useToast();

  const handleDelete = async () => {
    if (!menuToDelete) return;

    try {
      const { error } = await supabase
        .from("menus")
        .delete()
        .eq("id", menuToDelete.id);

      if (error) throw error;

      onDelete?.(menuToDelete.id);
      toast({
        title: "Menu eliminato",
        description: "Il menu è stato eliminato con successo.",
      });
    } catch (error) {
      console.error("Error deleting menu:", error);
      toast({
        title: "Errore",
        description: "Impossibile eliminare il menu. Riprova.",
        variant: "destructive",
      });
    }
    setMenuToDelete(null);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <p className="text-muted-foreground">Caricamento menu...</p>
        </CardContent>
      </Card>
    );
  }

  if (!menus || menus.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <p className="text-muted-foreground">Nessun menu trovato</p>
          <p className="text-sm text-muted-foreground">
            Crea il tuo primo menu per iniziare
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {menus.map((menu) => (
          <Card key={menu.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <CardTitle>{menu.name}</CardTitle>
                  <CardDescription>{menu.description}</CardDescription>
                </div>
                <Badge variant={menu.is_active ? "default" : "secondary"}>
                  {menu.is_active ? "Attivo" : "Inattivo"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <Link to={`/dashboard/menus/${menu.id}`}>
                    <Edit2 className="mr-2 h-4 w-4" />
                    Modifica
                  </Link>
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setMenuToCustomize(menu)}
                >
                  <Palette className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setMenuForQR(menu)}
                >
                  <QrCode className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setMenuToDelete(menu)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <DeleteMenuDialog
        open={!!menuToDelete}
        onOpenChange={(open) => !open && setMenuToDelete(null)}
        onConfirm={handleDelete}
        menuName={menuToDelete?.name || ""}
      />

      {menuToCustomize && (
        <MenuCustomizationForm
          open={!!menuToCustomize}
          onOpenChange={(open) => !open && setMenuToCustomize(null)}
          menuId={menuToCustomize.id}
          currentStyles={menuToCustomize.styles}
          onSuccess={() => {
            setMenuToCustomize(null);
          }}
        />
      )}

      <MenuQRDialog
        open={!!menuForQR}
        onOpenChange={(open) => !open && setMenuForQR(null)}
        menuId={menuForQR?.id || ""}
        menuName={menuForQR?.name}
      />
    </>
  );
};