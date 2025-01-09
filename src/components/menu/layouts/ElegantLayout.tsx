import { MenuItem, MenuStyles } from "../types";

interface ElegantLayoutProps {
  items: MenuItem[];
  category: string;
  styles?: MenuStyles;
}

const getSpacing = (spacing?: "small" | "medium" | "large") => {
  switch (spacing) {
    case "small": return "space-y-4";
    case "large": return "space-y-12";
    default: return "space-y-8";
  }
};

const getTextSize = (size?: "small" | "medium" | "large") => {
  switch (size) {
    case "small": return "text-sm";
    case "large": return "text-2xl";
    default: return "text-xl";
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

export const ElegantLayout = ({ items, styles }: ElegantLayoutProps) => {
  return (
    <div className={getSpacing(styles?.spacing)}>
      {items.map((item) => (
        <div key={item.id}>
          <div className="flex justify-between items-start gap-4 mb-2">
            <div className="flex-1">
              <div className="flex items-baseline">
                <h4 className={`font-serif mb-1 ${getTextSize(styles?.nameSize)}`}>
                  {item.name}
                </h4>
                {styles?.showDotLeaders && (
                  <div className="flex-1 mx-2 border-b-2 border-dotted border-gray-300" />
                )}
                <div className={`font-serif whitespace-nowrap pl-4 text-amber-800 ${getTextSize(styles?.priceSize)}`}>
                  €{item.price}
                </div>
              </div>
              <p className={`text-gray-600 leading-relaxed ${getTextSize(styles?.descriptionSize)} ${
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