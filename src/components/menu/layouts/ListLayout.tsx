import { MenuItem, MenuStyles } from "../types";

interface ListLayoutProps {
  items: MenuItem[];
  category: string;
  styles?: MenuStyles;
}

const getSpacing = (spacing?: "small" | "medium" | "large") => {
  switch (spacing) {
    case "small": return "space-y-2";
    case "large": return "space-y-6";
    default: return "space-y-4";
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

export const ListLayout = ({ items, styles }: ListLayoutProps) => {
  return (
    <div className={getSpacing(styles?.spacing)}>
      {items.map((item) => (
        <div key={item.id}>
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline">
                <h4 className={`font-semibold ${getTextSize(styles?.nameSize)}`}>
                  {item.name}
                </h4>
                {styles?.showDotLeaders && (
                  <div className="flex-1 mx-2 border-b-2 border-dotted border-gray-400" />
                )}
                <div className={`font-semibold whitespace-nowrap text-purple-600 ${getTextSize(styles?.priceSize)}`}>
                  €{item.price}
                </div>
              </div>
              <p className={`text-gray-600 mt-1 ${getTextSize(styles?.descriptionSize)} ${
                styles?.descriptionLines === "full" 
                  ? "" 
                  : `line-clamp-${styles?.descriptionLines || 2}`
              }`}>
                {item.description}
              </p>
            </div>
          </div>
          {styles?.showImages !== false && item.image && (
            <div className="mt-3 aspect-[16/9] w-full overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className={`w-full h-full object-cover ${getBorderRadius(styles?.imageBorderRadius)}`}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};