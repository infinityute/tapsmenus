import { Card, CardContent } from "@/components/ui/card";
import { MenuItem, MenuStyles } from "../types";
import { OrderButton } from "../OrderButton";
import { useOrder } from "../OrderContext";

interface CardLayoutProps {
  items: MenuItem[];
  category: string;
  styles?: MenuStyles;
}

const getImageSize = (size?: "small" | "medium" | "large") => {
  switch (size) {
    case "small": return "w-12 h-12";
    case "large": return "w-24 h-24";
    default: return "w-16 h-16";
  }
};

const getBorderRadius = (radius?: "none" | "small" | "medium" | "large" | "full") => {
  switch (radius) {
    case "none": return "rounded-none";
    case "small": return "rounded";
    case "large": return "rounded-xl";
    case "full": return "rounded-full";
    default: return "rounded-lg";
  }
};

const getTextSize = (size?: "small" | "medium" | "large") => {
  switch (size) {
    case "small": return "text-sm";
    case "large": return "text-xl";
    default: return "text-base";
  }
};

const getSpacing = (spacing?: "small" | "medium" | "large") => {
  switch (spacing) {
    case "small": return "space-y-2";
    case "large": return "space-y-6";
    default: return "space-y-4";
  }
};

export const CardLayout = ({ items, styles }: CardLayoutProps) => {
  const { updateOrder } = useOrder();

  return (
    <div className={getSpacing(styles?.spacing)}>
      {items.map((item) => (
        <Card key={item.id} className="overflow-hidden bg-white rounded-lg border-0">
          <CardContent className="p-0">
            <div className="flex items-center p-4 gap-4">
              {styles?.showImages !== false && (
                <div className={`relative ${getImageSize(styles?.imageSize)} flex-shrink-0 overflow-hidden ${getBorderRadius(styles?.imageBorderRadius)}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <h4 className={`font-semibold text-gray-900 ${getTextSize(styles?.nameSize)}`}>
                    {item.name}
                  </h4>
                  {styles?.showDotLeaders && (
                    <div className="flex-1 border-b-2 border-dotted border-gray-300" />
                  )}
                  <div className={`text-purple-600 font-semibold whitespace-nowrap ${getTextSize(styles?.priceSize)}`}>
                    €{item.price}
                  </div>
                </div>
                <p className={`text-gray-500 ${getTextSize(styles?.descriptionSize)} ${
                  styles?.descriptionLines === "full" 
                    ? "" 
                    : `line-clamp-${styles?.descriptionLines || 2}`
                } mt-1`}>
                  {item.description}
                </p>
                <div className="mt-3">
                  <OrderButton
                    itemId={item.id}
                    name={item.name}
                    price={item.price}
                    onOrderChange={(itemId, quantity) => updateOrder(itemId, quantity, item)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};