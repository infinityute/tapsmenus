import { Button } from "@/components/ui/button";
import { ArrowLeft, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MenuEditorHeaderProps {
  menuName: string | undefined;
  onToggleSidebar: () => void;
  onAddCategory?: () => void;  // Made optional since it's not always needed
}

export const MenuEditorHeader = ({ 
  menuName, 
  onToggleSidebar,
}: MenuEditorHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="mb-8">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/dashboard/menus")}
          className="hidden md:flex"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight">
            {menuName ? `Editing: ${menuName}` : "Menu non trovato"}
          </h1>
        </div>
      </div>
    </div>
  );
};