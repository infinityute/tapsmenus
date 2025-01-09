import { UtensilsCrossed, Coffee, Pizza, Beef, CircleDot, LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CategoryCardProps {
  name: string;
  itemCount: number;
  isSelected: boolean;
  onClick: () => void;
}

const getCategoryIcon = (category: string): LucideIcon => {
  const normalizedCategory = category.toLowerCase();
  if (normalizedCategory.includes("antipasto")) return UtensilsCrossed;
  if (normalizedCategory.includes("primo")) return Coffee;
  if (normalizedCategory.includes("dolce")) return Beef;
  if (normalizedCategory.includes("pizza")) return Pizza;
  return CircleDot;
};

export const CategoryCard = ({ name, itemCount, isSelected, onClick }: CategoryCardProps) => {
  const Icon = getCategoryIcon(name);
  
  return (
    <Card
      className={`p-4 cursor-pointer transition-all hover:shadow-md ${
        isSelected 
          ? "border-2 border-emerald-500 bg-emerald-50" 
          : "hover:border-emerald-200"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-lg ${
          isSelected ? "bg-emerald-100" : "bg-gray-100"
        }`}>
          <Icon className={`h-5 w-5 ${
            isSelected ? "text-emerald-600" : "text-gray-600"
          }`} />
        </div>
        <div>
          <h3 className="font-medium capitalize">{name}</h3>
          <p className="text-sm text-gray-500">{itemCount} articoli</p>
        </div>
      </div>
    </Card>
  );
};