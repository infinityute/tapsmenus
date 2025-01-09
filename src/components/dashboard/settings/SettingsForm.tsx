import { useEffect, useState } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";

interface RestaurantSettings {
  name: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  phone: string;
  email: string;
  language: string;
  currency: string;
}

export const SettingsForm = () => {
  const user = useUser();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState<RestaurantSettings>({
    name: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    phone: "",
    email: "",
    language: "it",
    currency: "EUR",
  });

  useEffect(() => {
    if (user) {
      fetchRestaurantSettings();
    }
  }, [user]);

  const fetchRestaurantSettings = async () => {
    try {
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error) throw error;

      if (data) {
        setSettings({
          name: data.name || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          postal_code: data.postal_code || "",
          phone: data.phone || "",
          email: data.email || "",
          language: "en",
          currency: "USD",
        });
      }
    } catch (error) {
      console.error("Error fetching restaurant settings:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("restaurants")
        .update({
          name: settings.name,
          address: settings.address,
          city: settings.city,
          state: settings.state,
          postal_code: settings.postal_code,
          phone: settings.phone,
          email: settings.email,
        })
        .eq("user_id", user?.id);

      if (error) throw error;

      toast({
        title: "Successo",
        description: "Impostazioni aggiornate con successo",
      });
    } catch (error) {
      console.error("Errore durante l'aggiornamento delle impostazioni:", error);
      toast({
        title: "Errore",
        description: "Impossibile aggiornare le impostazioni",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Impostazioni del ristorante</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome del ristorante</Label>
              <Input
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                placeholder="Nome del ristorante"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="Email"
              />
            </div>

            <div className="space-y-2">
              <Label>Telefono</Label>
              <Input
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="Telefono"
              />
            </div>

            <div className="space-y-2">
              <Label>Indirizzo</Label>
              <Input
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                placeholder="Indirizzo"
              />
            </div>

            <div className="space-y-2">
              <Label>Città</Label>
              <Input
                value={settings.city}
                onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                placeholder="Città"
              />
            </div>

            <div className="space-y-2">
              <Label>Stato</Label>
              <Input
                value={settings.state}
                onChange={(e) => setSettings({ ...settings, state: e.target.value })}
                placeholder="Stato"
              />
            </div>

            <div className="space-y-2">
              <Label>Codice Postale</Label>
              <Input
                value={settings.postal_code}
                onChange={(e) => setSettings({ ...settings, postal_code: e.target.value })}
                placeholder="Codice Postale"
              />
            </div>

            <div className="space-y-2">
              <Label>Lingua</Label>
              <Select
                value={settings.language}
                onValueChange={(value) => setSettings({ ...settings, language: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="it">Italiano</SelectItem>
                  <SelectItem value="en">Inglese</SelectItem>
                  <SelectItem value="es">Spagnolo</SelectItem>
                  <SelectItem value="fr">Francese</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Valuta</Label>
              <Select
                value={settings.currency}
                onValueChange={(value) => setSettings({ ...settings, currency: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleziona valuta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR (€)</SelectItem>
                  <SelectItem value="USD">USD ($)</SelectItem>
                  <SelectItem value="GBP">GBP (£)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" disabled={loading}>
            {loading ? "Salvataggio..." : "Salva modifiche"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};