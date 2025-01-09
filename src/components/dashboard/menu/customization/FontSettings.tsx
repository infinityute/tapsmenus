import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MenuStyles } from "@/types/menu";

interface FontSettingsProps {
  styles: MenuStyles;
  onChange: (styles: MenuStyles) => void;
}

const fontOptions = [
  { value: "inter", label: "Inter" },
  { value: "helvetica", label: "Helvetica" },
  { value: "arial", label: "Arial" },
  { value: "georgia", label: "Georgia" },
  { value: "times-new-roman", label: "Times New Roman" },
  { value: "roboto", label: "Roboto" },
];

export const FontSettings = ({ styles, onChange }: FontSettingsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="fontFamily">Font</Label>
        <Select
          value={styles.fontFamily || "inter"}
          onValueChange={(value) => onChange({ ...styles, fontFamily: value })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Seleziona un font" />
          </SelectTrigger>
          <SelectContent>
            {fontOptions.map((font) => (
              <SelectItem key={font.value} value={font.value}>
                {font.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};