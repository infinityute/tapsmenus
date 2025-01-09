import { useState, useEffect } from "react";
import { useUser } from "@supabase/auth-helpers-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Label } from "@/components/ui/label";
import { TimePicker } from "@/components/ui/time-picker";

interface OpeningHours {
  [key: string]: {
    open: string;
    close: string;
    closed: boolean;
  };
}

interface RestaurantData {
  name: string;
  description: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  country: string;
  phone: string;
  email: string;
  website: string;
  cuisine_type: string;
  price_range: string;
  logo_url?: string;
  banner_url?: string;
}

export const RestaurantForm = () => {
  const user = useUser();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [restaurant, setRestaurant] = useState<RestaurantData>({
    name: "",
    description: "",
    address: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    phone: "",
    email: "",
    website: "",
    cuisine_type: "",
    price_range: "",
  });

  const [openingHours, setOpeningHours] = useState<OpeningHours>({
    monday: { open: "09:00", close: "22:00", closed: false },
    tuesday: { open: "09:00", close: "22:00", closed: false },
    wednesday: { open: "09:00", close: "22:00", closed: false },
    thursday: { open: "09:00", close: "22:00", closed: false },
    friday: { open: "09:00", close: "22:00", closed: false },
    saturday: { open: "09:00", close: "23:00", closed: false },
    sunday: { open: "09:00", close: "22:00", closed: false },
  });

  useEffect(() => {
    if (user) {
      fetchRestaurantDetails();
    }
  }, [user]);

  const fetchRestaurantDetails = async () => {
    try {
      const { data, error } = await supabase
        .from("restaurants")
        .select("*")
        .eq("user_id", user?.id)
        .single();

      if (error) throw error;

      if (data) {
        setRestaurant(data);
        if (data.opening_hours) {
          setOpeningHours(data.opening_hours as OpeningHours);
        }
      }
    } catch (error) {
      console.error("Error fetching restaurant:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("restaurants")
        .upsert({
          ...restaurant,
          user_id: user?.id,
          opening_hours: openingHours,
        })
        .select()
        .single();

      if (error) throw error;

      toast({
        title: "Success",
        description: "Restaurant details saved successfully",
      });
    } catch (error) {
      console.error("Error saving restaurant:", error);
      toast({
        title: "Error",
        description: "Failed to save restaurant details",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
    try {
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const filePath = `${user?.id}/${type}-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('restaurant-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('restaurant-images')
        .getPublicUrl(filePath);

      const updateData = type === 'logo' 
        ? { logo_url: publicUrl }
        : { banner_url: publicUrl };

      const { error: updateError } = await supabase
        .from('restaurants')
        .update(updateData)
        .eq('user_id', user?.id);

      if (updateError) throw updateError;

      setRestaurant(prev => ({ ...prev, ...updateData }));
      toast({
        title: "Success",
        description: `Restaurant ${type} uploaded successfully`,
      });
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      toast({
        title: "Error",
        description: `Failed to upload ${type}`,
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dettagli del Ristorante</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nome del Ristorante</Label>
              <Input
                value={restaurant.name}
                onChange={(e) => setRestaurant({ ...restaurant, name: e.target.value })}
                placeholder="Nome del ristorante"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Tipo di Cucina</Label>
              <Input
                value={restaurant.cuisine_type}
                onChange={(e) => setRestaurant({ ...restaurant, cuisine_type: e.target.value })}
                placeholder="Tipo di cucina"
              />
            </div>

            <div className="space-y-2">
              <Label>Descrizione</Label>
              <Textarea
                value={restaurant.description}
                onChange={(e) => setRestaurant({ ...restaurant, description: e.target.value })}
                placeholder="Descrizione del Ristorante"
              />
            </div>

            <div className="space-y-2">
              <Label>Indirizzo</Label>
              <Input
                value={restaurant.address}
                onChange={(e) => setRestaurant({ ...restaurant, address: e.target.value })}
                placeholder="Indirizzo"
              />
            </div>

            <div className="space-y-2">
              <Label>Città</Label>
              <Input
                value={restaurant.city}
                onChange={(e) => setRestaurant({ ...restaurant, city: e.target.value })}
                placeholder="Città"
              />
            </div>

            <div className="space-y-2">
              <Label>Stato</Label>
              <Input
                value={restaurant.state}
                onChange={(e) => setRestaurant({ ...restaurant, state: e.target.value })}
                placeholder="Stato"
              />
            </div>

            <div className="space-y-2">
              <Label>Codice Postale</Label>
              <Input
                value={restaurant.postal_code}
                onChange={(e) => setRestaurant({ ...restaurant, postal_code: e.target.value })}
                placeholder="Codice Postale"
              />
            </div>

            <div className="space-y-2">
              <Label>Paese</Label>
              <Input
                value={restaurant.country}
                onChange={(e) => setRestaurant({ ...restaurant, country: e.target.value })}
                placeholder="Paese"
              />
            </div>

            <div className="space-y-2">
              <Label>Telefono</Label>
              <Input
                value={restaurant.phone}
                onChange={(e) => setRestaurant({ ...restaurant, phone: e.target.value })}
                placeholder="Telefono"
              />
            </div>

            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={restaurant.email}
                onChange={(e) => setRestaurant({ ...restaurant, email: e.target.value })}
                placeholder="Email"
              />
            </div>

            <div className="space-y-2">
              <Label>Sito web</Label>
              <Input
                value={restaurant.website}
                onChange={(e) => setRestaurant({ ...restaurant, website: e.target.value })}
                placeholder="Sito web"
              />
            </div>

            <div className="space-y-2">
              <Label>Fascia di prezzo</Label>
              <select
                className="w-full border rounded-md p-2"
                value={restaurant.price_range}
                onChange={(e) => setRestaurant({ ...restaurant, price_range: e.target.value })}
              >
                <option value="">Select Price Range</option>
                <option value="€">€ (Budget)</option>
                <option value="€€">€€ (Moderate)</option>
                <option value="€€€">€€€ (Expensive)</option>
                <option value="€€€€">€€€€ (Luxury)</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Orari di apertura</h3>
            {Object.entries(openingHours).map(([day, hours]) => (
              <div key={day} className="flex items-center space-x-4">
                <Label className="w-24 capitalize">{day}</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="time"
                    value={hours.open}
                    onChange={(e) =>
                      setOpeningHours({
                        ...openingHours,
                        [day]: { ...hours, open: e.target.value },
                      })
                    }
                    disabled={hours.closed}
                  />
                  <span>a</span>
                  <Input
                    type="time"
                    value={hours.close}
                    onChange={(e) =>
                      setOpeningHours({
                        ...openingHours,
                        [day]: { ...hours, close: e.target.value },
                      })
                    }
                    disabled={hours.closed}
                  />
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={hours.closed}
                      onChange={(e) =>
                        setOpeningHours({
                          ...openingHours,
                          [day]: { ...hours, closed: e.target.checked },
                        })
                      }
                    />
                    <span>Chiusura</span>
                  </label>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'logo')}
                />
                {restaurant.logo_url && (
                  <img
                    src={restaurant.logo_url}
                    alt="Ristorante Logo"
                    className="mt-2 h-32 w-32 object-cover rounded"
                  />
                )}
              </div>
              <div>
                <Label>Banner</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'banner')}
                />
                {restaurant.banner_url && (
                  <img
                    src={restaurant.banner_url}
                    alt="Banner del Ristorante"
                    className="mt-2 h-32 w-full object-cover rounded"
                  />
                )}
              </div>
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
