import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MenuStyles } from "@/types/menu";

interface TextSettingsProps {
  styles: MenuStyles;
  onChange: (styles: MenuStyles) => void;
}

export const TextSettings = ({ styles, onChange }: TextSettingsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="headerTitle">Titolo dell'intestazione</Label>
        <Input
          id="headerTitle"
          value={styles.headerTitle || "Menu Preview"}
          onChange={(e) =>
            onChange({ ...styles, headerTitle: e.target.value })
          }
          placeholder="Inserisci il titolo dell'intestazione"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="headerSubtitle">Sottotitolo dell'intestazione</Label>
        <Input
          id="headerSubtitle"
          value={styles.headerSubtitle || "Prova le nostre deliziose offerte"}
          onChange={(e) =>
            onChange({ ...styles, headerSubtitle: e.target.value })
          }
          placeholder="Inserisci il sottotitolo dell'intestazione"
        />
      </div>
    </div>
  );
};