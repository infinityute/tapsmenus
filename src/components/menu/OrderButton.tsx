import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Minus } from "lucide-react";

interface OrderButtonProps {
  itemId: string;
  name: string;
  price: string;
  onOrderChange: (itemId: string, quantity: number) => void;
}

export const OrderButton = ({ itemId, name, price, onOrderChange }: OrderButtonProps) => {
  const [quantity, setQuantity] = useState(0);

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onOrderChange(itemId, newQuantity);
  };

  const decrement = () => {
    if (quantity > 0) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onOrderChange(itemId, newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {quantity === 0 ? (
        <Button 
          onClick={increment}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          Aggiungi
        </Button>
      ) : (
        <div className="flex items-center gap-2 bg-purple-100 rounded-lg p-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={decrement}
            className="h-8 w-8 text-purple-600 hover:text-purple-700 hover:bg-purple-200"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-purple-600 font-medium min-w-[20px] text-center">
            {quantity}
          </span>
          <Button
            size="icon"
            variant="ghost"
            onClick={increment}
            className="h-8 w-8 text-purple-600 hover:text-purple-700 hover:bg-purple-200"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};