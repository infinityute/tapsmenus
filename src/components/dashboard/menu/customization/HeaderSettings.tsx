import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MenuStyles } from "@/types/menu";
import { Separator } from "@/components/ui/separator";

interface HeaderSettingsProps {
  styles: MenuStyles;
  onChange: (styles: MenuStyles) => void;
}

export const HeaderSettings = ({ styles, onChange }: HeaderSettingsProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="show-header">Mostra intestazione</Label>
          <Switch
            id="show-header"
            checked={styles.showHeader !== false}
            onCheckedChange={(checked) =>
              onChange({ ...styles, showHeader: checked })
            }
          />
        </div>

        {styles.showHeader !== false && (
          <>
            <div className="space-y-2">
              <Label htmlFor="header-title">Titolo dell'intestazione</Label>
              <Input
                id="header-title"
                value={styles.headerTitle || ""}
                onChange={(e) =>
                  onChange({ ...styles, headerTitle: e.target.value })
                }
                placeholder="Enter header title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="header-subtitle">Sottotitolo dell'intestazione</Label>
              <Input
                id="header-subtitle"
                value={styles.headerSubtitle || ""}
                onChange={(e) =>
                  onChange({ ...styles, headerSubtitle: e.target.value })
                }
                placeholder="Enter header subtitle"
              />
            </div>

            <div className="space-y-2">
              <Label>Allineamento dell'intestazione</Label>
              <Select
                value={styles.headerAlignment || "center"}
                onValueChange={(value) => onChange({ ...styles, headerAlignment: value as "left" | "center" | "right" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona allineamento" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Sinistra</SelectItem>
                  <SelectItem value="center">Centrale</SelectItem>
                  <SelectItem value="right">Destra</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Riempimento dell'intestazione</Label>
              <Select
                value={styles.headerPadding || "medium"}
                onValueChange={(value) => onChange({ ...styles, headerPadding: value as "small" | "medium" | "large" })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select padding" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Piccolo</SelectItem>
                  <SelectItem value="medium">Medio</SelectItem>
                  <SelectItem value="large">Grande</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="show-search">Mostra barra di ricerca</Label>
          <Switch
            id="show-search"
            checked={styles.showSearchBar !== false}
            onCheckedChange={(checked) =>
              onChange({ ...styles, showSearchBar: checked })
            }
          />
        </div>
      </div>
    </div>
  );
};