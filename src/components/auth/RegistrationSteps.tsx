import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { AccountDetails } from "./steps/AccountDetails";
import { RestaurantDetails } from "./steps/RestaurantDetails";
import { LocationDetails } from "./steps/LocationDetails";
import { ContactDetails } from "./steps/ContactDetails";

interface RegistrationData {
  email: string;
  password: string;
  restaurantName: string;
  description: string;
  cuisineType: string;
  logoUrl: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  phone: string;
  website: string;
}

export const RegistrationSteps = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<RegistrationData>({
    email: "",
    password: "",
    restaurantName: "",
    description: "",
    cuisineType: "",
    logoUrl: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    phone: "",
    website: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string, field: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (step === 1) {
      if (!formData.email || !formData.password) {
        toast({
          title: "Errore di validazione",
          description: "Email e password sono obbligatori",
          variant: "destructive",
        });
        return false;
      }
      if (formData.password.length < 6) {
        toast({
          title: "Errore di validazione",
          description: "La password deve essere di almeno 6 caratteri",
          variant: "destructive",
        });
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: restaurantError } = await supabase
          .from("restaurants")
          .insert({
            user_id: authData.user.id,
            name: formData.restaurantName,
            description: formData.description,
            cuisine_type: formData.cuisineType,
            logo_url: formData.logoUrl,
            address: formData.address,
            city: formData.city,
            state: formData.state,
            postal_code: formData.postalCode,
            phone: formData.phone,
            website: formData.website,
          });

        if (restaurantError) throw restaurantError;

        toast({
          title: "Registrazione completata!",
          description: "Controlla la tua email per verificare l'account.",
        });

        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      toast({
        title: "Registrazione fallita",
        description: "Per favore riprova.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AccountDetails
            email={formData.email}
            password={formData.password}
            onChange={handleInputChange}
          />
        );
      case 2:
        return (
          <RestaurantDetails
            name={formData.restaurantName}
            description={formData.description}
            cuisineType={formData.cuisineType}
            logoUrl={formData.logoUrl}
            onChange={handleInputChange}
            onSelectChange={handleSelectChange}
          />
        );
      case 3:
        return (
          <LocationDetails
            address={formData.address}
            city={formData.city}
            state={formData.state}
            postalCode={formData.postalCode}
            onChange={handleInputChange}
          />
        );
      case 4:
        return (
          <ContactDetails
            phone={formData.phone}
            website={formData.website}
            onChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep((prev) => prev + 1);
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>Registrazione Ristorante</CardTitle>
        <CardDescription>
          Step {step} di 4: {" "}
          {step === 1
            ? "Dettagli Account"
            : step === 2
            ? "Informazioni Ristorante"
            : step === 3
            ? "Posizione"
            : "Informazioni di Contatto"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {renderStep()}
          <div className="flex justify-between">
            {step > 1 && (
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep((prev) => prev - 1)}
              >
                Indietro
              </Button>
            )}
            {step < 4 ? (
              <Button
                type="button"
                onClick={handleNext}
                className="ml-auto bg-[#10B981] hover:bg-[#059669]"
              >
                Avanti
              </Button>
            ) : (
              <Button 
                type="submit" 
                disabled={loading} 
                className="ml-auto bg-[#10B981] hover:bg-[#059669]"
              >
                {loading ? "Creazione Account..." : "Completa Registrazione"}
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};