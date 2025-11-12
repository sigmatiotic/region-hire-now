import { Button } from "@/components/ui/button";
import { Briefcase, Home, Package, Sparkles, Wrench, Users } from "lucide-react";

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: "all", label: "All Jobs", icon: Briefcase },
  { id: "home", label: "Home Help", icon: Home },
  { id: "event", label: "Events", icon: Sparkles },
  { id: "delivery", label: "Delivery", icon: Package },
  { id: "repair", label: "Repairs", icon: Wrench },
  { id: "others", label: "Others", icon: Users },
];

export const CategoryFilter = ({
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => {
        const Icon = category.icon;
        const isSelected = selectedCategory === category.id;
        
        return (
          <Button
            key={category.id}
            variant={isSelected ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className="flex items-center gap-2 whitespace-nowrap"
          >
            <Icon className="w-4 h-4" />
            {category.label}
          </Button>
        );
      })}
    </div>
  );
};
