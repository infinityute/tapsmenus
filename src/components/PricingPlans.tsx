import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useToast } from "./ui/use-toast";

export const PricingPlans = () => {
  const session = useSession();
  const supabase = useSupabaseClient();
  const navigate = useNavigate();
  const { toast } = useToast();

  const plans = [
    {
      name: "Base",
      price: "19",
      period: "/mese",
      description: "Perfetto per piccoli ristoranti e caffè",
      features: [
        "Fino a 50 elementi di menu",
        "1 codice QR",
        "Aggiornamenti illimitati del menu",
        "Supporto email"
      ],
      buttonText: "Inizia Gratis",
      buttonVariant: "outline",
      type: "base"
    },
    {
      name: "Pro",
      price: "49",
      period: "/mese",
      description: "Ideale per ristoranti in crescita",
      features: [
        "Fino a 200 elementi di menu",
        "5 codici QR",
        "Analisi base delle prestazioni",
        "Supporto prioritario",
        "Personalizzazione del brand"
      ],
      buttonText: "Prova Gratuita di 14 Giorni",
      buttonVariant: "default",
      popular: true,
      type: "pro"
    },
    {
      name: "Enterprise",
      price: "99",
      period: "/mese",
      description: "Per grandi catene e franchising",
      features: [
        "Elementi di menu illimitati",
        "Codici QR illimitati",
        "Analisi avanzate",
        "Account manager dedicato",
        "API per integrazioni personalizzate",
        "Formazione e onboarding"
      ],
      buttonText: "Contattaci",
      buttonVariant: "outline",
      type: "enterprise"
    }
  ];

  const handleSubscribe = async (planType: string) => {
    if (!session) {
      navigate("/register");
      return;
    }

    try {
      const { data, error } = await supabase.functions.invoke('create-checkout-session', {
        body: { planType }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Errore",
        description: error.message || "Si è verificato un errore durante il processo di abbonamento",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 animate-fade-in">
          <h2 className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
            Piani Semplici e Trasparenti
          </h2>
          <p className="text-base text-gray-600">
            Scegli il piano più adatto alle tue esigenze. Cambia o cancella in qualsiasi momento.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={cn(
                "relative rounded-xl p-6 transition-all duration-200 animate-scale-in flex flex-col",
                plan.popular
                  ? "bg-white shadow-xl scale-105 border-2 border-secondary"
                  : "bg-white/50 shadow-md hover:shadow-lg"
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-28">
                  <div className="bg-secondary text-white text-xs py-1 px-2 rounded-full text-center animate-bounce">
                    Più Popolare
                  </div>
                </div>
              )}

              <div className="text-center mb-4">
                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <div className="flex items-end justify-center gap-1 mb-1">
                  <span className="text-4xl font-bold">€{plan.price}</span>
                  <span className="text-gray-600 mb-1 text-sm">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-2 mb-6 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2 text-sm">
                    <div className="mt-1">
                      <Check className="h-3 w-3 text-secondary flex-shrink-0" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Button
                  variant={plan.buttonVariant as "default" | "outline"}
                  className={cn(
                    "w-full text-sm h-9 transition-transform hover:scale-105",
                    plan.popular
                      ? "bg-secondary hover:bg-secondary/90"
                      : ""
                  )}
                  onClick={() => handleSubscribe(plan.type)}
                >
                  {!session ? "Registrati per iniziare" : plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};