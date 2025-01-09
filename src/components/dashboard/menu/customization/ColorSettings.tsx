import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuStyles } from "@/types/menu";

interface ColorSettingsProps {
  styles: MenuStyles;
  onChange: (styles: MenuStyles) => void;
}

export const ColorSettings = ({ styles, onChange }: ColorSettingsProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="primaryColor">Colore primario</Label>
        <Input
          id="primaryColor"
          type="color"
          value={styles.primaryColor || "#2C1810"}
          onChange={(e) =>
            onChange({ ...styles, primaryColor: e.target.value })
          }
          className="h-10 p-1"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="secondaryColor">Colore contrastante</Label>
        <Input
          id="secondaryColor"
          type="color"
          value={styles.secondaryColor || "#B45309"}
          onChange={(e) =>
            onChange({ ...styles, secondaryColor: e.target.value })
          }
          className="h-10 p-1"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="backgroundColor">Colore di sfondo</Label>
        <Input
          id="backgroundColor"
          type="color"
          value={styles.backgroundColor || "#FFFBF5"}
          onChange={(e) =>
            onChange({ ...styles, backgroundColor: e.target.value })
          }
          className="h-10 p-1"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="textColor">Colore del testo</Label>
        <Input
          id="textColor"
          type="color"
          value={styles.textColor || "#2C1810"}
          onChange={(e) =>
            onChange({ ...styles, textColor: e.target.value })
          }
          className="h-10 p-1"
        />
      </div>
    </div>
  );
};