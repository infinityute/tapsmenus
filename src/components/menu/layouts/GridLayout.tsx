import { MenuItem, MenuStyles } from "../types";

interface GridLayoutProps {
  items: MenuItem[];
  category: string;
  styles?: MenuStyles;
}

const getGridColumns = (columns?: 2 | 3 | 4) => {
  switch (columns) {
    case 2: return "grid-cols-1 sm:grid-cols-2";
    case 4: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
    default: return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  }
};

const getSpacing = (spacing?: "small" | "medium" | "large") => {
  switch (spacing) {
    case "small": return "gap-2";
    case "large": return "gap-6";
    default: return "gap-4";
  }
};

const getTextSize = (size?: "small" | "medium" | "large") => {
  switch (size) {
    case "small": return "text-sm";
    case "large": return "text-xl";
    default: return "text-base";
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

export const GridLayout = ({ items, styles }: GridLayoutProps) => {
  return (
    <div className={`grid ${getGridColumns(styles?.gridColumns)} ${getSpacing(styles?.spacing)}`}>
      {items.map((item) => (
        <div 
          key={item.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
        >
          {styles?.showImages !== false && item.image && (
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className={`w-full h-full object-cover ${getBorderRadius(styles?.imageBorderRadius)}`}
              />
            </div>
          )}
          <div className="p-4 flex flex-col flex-1">
            <div className="flex-1">
              <h4 className={`font-semibold ${getTextSize(styles?.nameSize)} break-words`}>
                {item.name}
              </h4>
              <p className={`text-gray-600 mt-2 ${getTextSize(styles?.descriptionSize)} ${
                styles?.descriptionLines === "full" 
                  ? "" 
                  : `line-clamp-${styles?.descriptionLines || 2}`
              }`}>
                {item.description}
              </p>
            </div>
            <div className={`text-purple-600 font-semibold mt-4 ${getTextSize(styles?.priceSize)}`}>
              €{item.price}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};