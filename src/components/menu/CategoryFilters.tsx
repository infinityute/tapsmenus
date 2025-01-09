import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MenuStyles } from "./types";

interface CategoryFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
  styles?: MenuStyles;
}

export const CategoryFilters = ({
  searchTerm,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
  styles
}: CategoryFiltersProps) => {
  const normalizeCategory = (category: string) => {
    switch(category.toLowerCase()) {
      case "all":
      case "tutti":
        return "all";
      default:
        return category.toLowerCase();
    }
  };

  return (
    <div className="mb-8 space-y-4 max-w-xl mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
        <Input
          className="pl-10 bg-white/10 border-0 text-inherit placeholder:text-gray-400 h-12"
          placeholder="Cerca nel menu..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {styles?.showCategoryBar && (
        <div className="flex gap-3 overflow-x-auto pb-2 justify-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(normalizeCategory(category))}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                normalizeCategory(selectedCategory) === normalizeCategory(category)
                  ? "bg-emerald-600 text-white"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {category === "all" ? "Tutti" : 
               category === "antipasto" ? "Antipasti" :
               category === "primo" ? "Primi Piatti" :
               category === "pizza" ? "Pizze" :
               category === "dolce" ? "Dolci" :
               category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};