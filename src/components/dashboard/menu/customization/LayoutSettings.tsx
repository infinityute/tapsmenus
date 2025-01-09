import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MenuStyles } from "@/types/menu";
import { Grid, List, LayoutGrid, Wine } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { HeaderSettings } from "./HeaderSettings";

interface LayoutSettingsProps {
  styles: MenuStyles;
  onChange: (styles: MenuStyles) => void;
}

export const LayoutSettings = ({ styles, onChange }: LayoutSettingsProps) => {
  return (
    <div className="space-y-6">
      <HeaderSettings styles={styles} onChange={onChange} />

      <Separator />

      <div className="space-y-4">
        <Label>Stile di Layout</Label>
        <div className="grid grid-cols-4 gap-4">
          <Button
            type="button"
            variant={styles.layout === "card" ? "default" : "outline"}
            className="w-full flex items-center justify-center gap-2"
            onClick={() => onChange({ ...styles, layout: "card" })}
          >
            <Grid className="h-4 w-4" />
            <span className="hidden sm:inline">Card</span>
          </Button>
          <Button
            type="button"
            variant={styles.layout === "grid" ? "default" : "outline"}
            className="w-full flex items-center justify-center gap-2"
            onClick={() => onChange({ ...styles, layout: "grid" })}
          >
            <LayoutGrid className="h-4 w-4" />
            <span className="hidden sm:inline">Griglia</span>
          </Button>
          <Button
            type="button"
            variant={styles.layout === "list" ? "default" : "outline"}
            className="w-full flex items-center justify-center gap-2"
            onClick={() => onChange({ ...styles, layout: "list" })}
          >
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">Lista</span>
          </Button>
          <Button
            type="button"
            variant={styles.layout === "elegant" ? "default" : "outline"}
            className="w-full flex items-center justify-center gap-2"
            onClick={() => onChange({ ...styles, layout: "elegant" })}
          >
            <Wine className="h-4 w-4" />
            <span className="hidden sm:inline">Elegante</span>
          </Button>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <Label>Opzioni di Navigazione</Label>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="collapsible-categories">Categorie Comprimibili</Label>
            <Switch
              id="collapsible-categories"
              checked={styles.collapsibleCategories}
              onCheckedChange={(checked) =>
                onChange({ ...styles, collapsibleCategories: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="show-category-bar">Mostra Barra delle Categorie</Label>
            <Switch
              id="show-category-bar"
              checked={styles.showCategoryBar}
              onCheckedChange={(checked) =>
                onChange({ ...styles, showCategoryBar: checked })
              }
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <Label>Impostazioni Immagine</Label>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="show-images">Mostra Immagini</Label>
            <Switch
              id="show-images"
              checked={styles.showImages !== false}
              onCheckedChange={(checked) =>
                onChange({ ...styles, showImages: checked })
              }
            />
          </div>

          {styles.showImages !== false && (
            <>
              <div className="space-y-2">
                <Label>Dimensione dell'immagine</Label>
                <Select
                  value={styles.imageSize || "medium"}
                  onValueChange={(value) => onChange({ ...styles, imageSize: value as "small" | "medium" | "large" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Piccola</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Raggio del Bordo</Label>
                <Select
                  value={styles.imageBorderRadius || "medium"}
                  onValueChange={(value) => onChange({ ...styles, imageBorderRadius: value as "none" | "small" | "medium" | "large" | "full" })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select border radius" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Nessuno</SelectItem>
                    <SelectItem value="small">Piccola</SelectItem>
                    <SelectItem value="medium">Media</SelectItem>
                    <SelectItem value="large">Grande</SelectItem>
                    <SelectItem value="full">Full</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <Label>Impostazioni del Testo</Label>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Dimensione del Testo</Label>
            <Select
              value={styles.nameSize || "medium"}
              onValueChange={(value) => onChange({ ...styles, nameSize: value as "small" | "medium" | "large" })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Piccolo</SelectItem>
                <SelectItem value="medium">Medio</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Dimensione del Prezzo</Label>
            <Select
              value={styles.priceSize || "medium"}
              onValueChange={(value) => onChange({ ...styles, priceSize: value as "small" | "medium" | "large" })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Piccolo</SelectItem>
                <SelectItem value="medium">Medio</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Dimensione della Descrizione</Label>
            <Select
              value={styles.descriptionSize || "medium"}
              onValueChange={(value) => onChange({ ...styles, descriptionSize: value as "small" | "medium" | "large" })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Piccolo</SelectItem>
                <SelectItem value="medium">Media</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Linee della Descrizione</Label>
            <Select
              value={styles.descriptionLines?.toString() || "2"}
              onValueChange={(value) => onChange({ ...styles, descriptionLines: value === "full" ? "full" : parseInt(value) as 1 | 2 | 3 })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select lines" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Linea</SelectItem>
                <SelectItem value="2">2 Linee</SelectItem>
                <SelectItem value="3">3 Linee</SelectItem>
                <SelectItem value="full">Testo Completo</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <Label>Impostazioni di Layout</Label>
        <div className="space-y-4">
          {styles.layout === "grid" && (
            <div className="space-y-2">
              <Label>Colonne della Griglia</Label>
              <Select
                value={styles.gridColumns?.toString() || "3"}
                onValueChange={(value) => onChange({ ...styles, gridColumns: parseInt(value) as 2 | 3 | 4 })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona Colonne" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 Colonne</SelectItem>
                  <SelectItem value="3">3 Colonne</SelectItem>
                  <SelectItem value="4">4 Columns</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label>Spaziatura</Label>
            <Select
              value={styles.spacing || "medium"}
              onValueChange={(value) => onChange({ ...styles, spacing: value as "small" | "medium" | "large" })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select spacing" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Piccolo</SelectItem>
                <SelectItem value="medium">Medio</SelectItem>
                <SelectItem value="large">Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <Label htmlFor="show-dot-leaders">Mostra punti di collegamento</Label>
            <Switch
              id="show-dot-leaders"
              checked={styles.showDotLeaders}
              onCheckedChange={(checked) =>
                onChange({ ...styles, showDotLeaders: checked })
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};