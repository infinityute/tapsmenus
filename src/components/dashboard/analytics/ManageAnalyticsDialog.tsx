import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";

interface ManageAnalyticsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  date: Date;
}

export const ManageAnalyticsDialog = ({ 
  open, 
  onOpenChange, 
  date 
}: ManageAnalyticsDialogProps) => {
  const session = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    totalOrders: "",
    totalCovers: "",
    totalRevenue: "",
    mostOrderedItem: "",
    mostOrderedCategory: "",
    notes: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) return;

    setIsLoading(true);
    try {
      const { data: restaurant } = await supabase
        .from("restaurants")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (!restaurant) throw new Error("Ristorante non trovato");

      const { error } = await supabase.rpc("upsert_daily_analytics", {
        p_restaurant_id: restaurant.id,
        p_date: format(date, "yyyy-MM-dd"),
        p_total_orders: parseInt(formData.totalOrders) || 0,
        p_total_covers: parseInt(formData.totalCovers) || 0,
        p_total_revenue: parseFloat(formData.totalRevenue) || 0,
        p_most_ordered_item: formData.mostOrderedItem || null,
        p_most_ordered_category: formData.mostOrderedCategory || null,
        p_notes: formData.notes || null,
      });

      if (error) throw error;

      toast({
        title: "Successo",
        description: "Dati analytics aggiornati con successo",
      });

      queryClient.invalidateQueries({ queryKey: ["analytics"] });
      onOpenChange(false);
      
      // Resetta i dati del form
      setFormData({
        totalOrders: "",
        totalCovers: "",
        totalRevenue: "",
        mostOrderedItem: "",
        mostOrderedCategory: "",
        notes: "",
      });
    } catch (error) {
      console.error("Errore nell'aggiornamento degli analytics:", error);
      toast({
        title: "Errore",
        description: "Impossibile aggiornare i dati analytics",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Aggiorna Dati Analisi</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="totalOrders">Totale Ordini</Label>
            <Input
              id="totalOrders"
              type="number"
              value={formData.totalOrders}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, totalOrders: e.target.value }))
              }
              placeholder="Inserisci totale ordini"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalCovers">Totale Coperti</Label>
            <Input
              id="totalCovers"
              type="number"
              value={formData.totalCovers}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, totalCovers: e.target.value }))
              }
              placeholder="Inserisci totale coperti"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalRevenue">Ricavo Totale</Label>
            <Input
              id="totalRevenue"
              type="number"
              step="0.01"
              value={formData.totalRevenue}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, totalRevenue: e.target.value }))
              }
              placeholder="Inserisci ricavo totale"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mostOrderedItem">Piatto Più Ordinato</Label>
            <Input
              id="mostOrderedItem"
              value={formData.mostOrderedItem}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  mostOrderedItem: e.target.value,
                }))
              }
              placeholder="Inserisci il piatto più ordinato"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mostOrderedCategory">Categoria Più Ordinata</Label>
            <Input
              id="mostOrderedCategory"
              value={formData.mostOrderedCategory}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  mostOrderedCategory: e.target.value,
                }))
              }
              placeholder="Inserisci la categoria più ordinata"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Note</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, notes: e.target.value }))
              }
              placeholder="Inserisci eventuali note aggiuntive"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annulla
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Aggiornamento..." : "Aggiorna Dati"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};