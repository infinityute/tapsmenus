import { createContext, useContext, useState } from "react";
import { MenuItem } from "./types";

interface OrderItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

interface OrderContextType {
  orders: Record<string, OrderItem>;
  updateOrder: (itemId: string, quantity: number, item: MenuItem) => void;
  totalItems: number;
  totalPrice: number;
}

const OrderContext = createContext<OrderContextType>({
  orders: {},
  updateOrder: () => {},
  totalItems: 0,
  totalPrice: 0,
});

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Record<string, OrderItem>>({});

  const updateOrder = (itemId: string, quantity: number, item: MenuItem) => {
    setOrders(prev => {
      if (quantity === 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [itemId]: {
          id: itemId,
          name: item.name,
          price: item.price,
          quantity
        }
      };
    });
  };

  const totalItems = Object.values(orders).reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = Object.values(orders).reduce(
    (sum, item) => sum + (parseFloat(item.price) * item.quantity), 
    0
  );

  return (
    <OrderContext.Provider value={{ orders, updateOrder, totalItems, totalPrice }}>
      {children}
    </OrderContext.Provider>
  );
};