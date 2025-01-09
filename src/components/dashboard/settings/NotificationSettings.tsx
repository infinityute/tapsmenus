import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export const NotificationSettings = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newReservations: true,
    cancelledReservations: true,
    lowInventory: true,
    dailyReports: false,
  });

  const handleSave = async () => {
    setLoading(true);
    try {
      // TODO: Implement notification settings save logic
      toast({
        title: "Successo",
        description: "Impostazioni di notifica aggiornate correttamente",
      });
    } catch (error) {
      toast({
        title: "Errore",
        description: "Impossibile aggiornare le impostazioni di notifica",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Preferenze di notifica</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="emailNotifications">Notifiche Email</Label>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, emailNotifications: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="smsNotifications">Notifiche SMS</Label>
              <Switch
                id="smsNotifications"
                checked={settings.smsNotifications}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, smsNotifications: checked })
                }
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium">Tipi di notifica</h3>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="newReservations">Nuove Prenotazioni</Label>
              <Switch
                id="newReservations"
                checked={settings.newReservations}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, newReservations: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="cancelledReservations">Prenotazioni annullate</Label>
              <Switch
                id="cancelledReservations"
                checked={settings.cancelledReservations}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, cancelledReservations: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="lowInventory">Avvisi di inventario basso</Label>
              <Switch
                id="lowInventory"
                checked={settings.lowInventory}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, lowInventory: checked })
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="dailyReports">Rapporti giornalieri</Label>
              <Switch
                id="dailyReports"
                checked={settings.dailyReports}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, dailyReports: checked })
                }
              />
            </div>
          </div>

          <Button onClick={handleSave} disabled={loading} className="w-full">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};