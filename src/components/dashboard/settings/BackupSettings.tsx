import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const BackupSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [backupFrequency, setBackupFrequency] = useState("daily");

  const handleBackup = async () => {
    setLoading(true);
    try {
      // TODO: Implement backup logic
      toast({
        title: "Successo",
        description: "Backup avviato con successo",
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile avviare il backup",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Backup e gestione dei dati</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Frequenza di backup automatico</Label>
            <Select value={backupFrequency} onValueChange={setBackupFrequency}>
              <SelectTrigger>
                <SelectValue placeholder="Select backup frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Quotidiano</SelectItem>
                <SelectItem value="weekly">Settimanale</SelectItem>
                <SelectItem value="monthly">Mensile</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Button onClick={handleBackup} disabled={loading} className="w-full">
              {loading ? "Elaborazione..." : "Crea backup manuale"}
            </Button>

            <Button variant="outline" className="w-full">
            Scarica l'ultimo backup
            </Button>

            <Button variant="outline" className="w-full">
            Esportazione dati del ristorante
            </Button>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>Ultimo backup: Mai</p>
            <p>Prossimo backup programmato: in base alle impostazioni di frequenza</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};