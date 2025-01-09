import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOrder } from "./OrderContext";

export const OrderSummary = () => {
  const { totalItems, totalPrice } = useOrder();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
      <div className="max-w-3xl mx-auto">
        <Button 
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          size="lg"
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Ordina ({totalItems} {totalItems === 1 ? 'item' : 'items'}) - €{totalPrice.toFixed(2)}
        </Button>
      </div>
    </div>
  );
};