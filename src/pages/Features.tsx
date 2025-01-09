import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { QrCode, Smartphone, Database, ChartBar, Shield, MessageSquare } from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "Creazione Menu Digitale",
      description: "Crea bellissimi menu digitali interattivi facili da aggiornare e gestire.",
      icon: QrCode,
    },
    {
      title: "Ottimizzazione Mobile",
      description: "Perfettamente ottimizzato per tutti i dispositivi, garantendo una grande esperienza per i tuoi clienti.",
      icon: Smartphone,
    },
    {
      title: "Aggiornamenti in Tempo Reale",
      description: "Aggiorna il tuo menu istantaneamente, aggiungi specialità o modifica i prezzi con pochi clic.",
      icon: Database,
    },
    {
      title: "Dashboard Analitica",
      description: "Monitora visualizzazioni, elementi popolari e coinvolgimento dei clienti con analisi dettagliate.",
      icon: ChartBar,
    },
    {
      title: "Piattaforma Sicura",
      description: "Sicurezza di livello enterprise per proteggere i dati del tuo ristorante e dei clienti.",
      icon: Shield,
    },
    {
      title: "Supporto 24/7",
      description: "Team di supporto dedicato pronto ad aiutarti a avere successo con il tuo menu digitale.",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Funzionalità Potenti per il Tuo Ristorante</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tutto ciò di cui hai bisogno per trasformare il tuo menu in un'esperienza digitale
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-secondary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center bg-secondary/5 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-primary mb-4">Pronto per Iniziare?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Unisciti a migliaia di ristoranti che già utilizzano la nostra piattaforma per migliorare l'esperienza dei loro clienti
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <Button className="bg-secondary hover:bg-secondary/90 w-full sm:w-auto">
                  Prova Gratuita
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" className="w-full sm:w-auto">
                  Vedi Prezzi
                </Button>
              </Link>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-4">Hai domande?</p>
            <Link to="/contact" className="text-secondary hover:underline">
              Contatta il nostro team di supporto
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;