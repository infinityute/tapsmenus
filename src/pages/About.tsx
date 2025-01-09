import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary mb-4">Chi Siamo</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Stiamo rivoluzionando l'esperienza della ristorazione portando i menu nell'era digitale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">La Nostra Missione</h2>
              <p className="text-gray-600 mb-4">
                In MenuQR, ci dedichiamo ad aiutare i ristoranti ad abbracciare la trasformazione digitale. 
                La nostra piattaforma rende facile creare, gestire e condividere menu digitali che migliorano 
                l'esperienza culinaria sia per i ristoranti che per i loro clienti.
              </p>
              <p className="text-gray-600">
                Crediamo nelle pratiche sostenibili e nell'aiutare i ristoranti a ridurre il loro impatto 
                ambientale offrendo allo stesso tempo un'esperienza moderna e interattiva per i loro ospiti.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-primary mb-4">I Nostri Valori</h2>
              <ul className="space-y-4 text-gray-600">
                <li>✨ Innovazione nella tecnologia della ristorazione</li>
                <li>🌱 Sostenibilità ambientale</li>
                <li>💪 Supporto alle imprese locali</li>
                <li>🤝 Assistenza clienti eccezionale</li>
              </ul>
            </div>
          </div>

          <div className="bg-secondary/5 rounded-lg p-8 mb-16">
            <h2 className="text-2xl font-semibold text-primary mb-6 text-center">Contattaci</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex items-center justify-center">
                <Mail className="h-6 w-6 text-secondary mr-3" />
                <span className="text-gray-600">supporto@menuqr.com</span>
              </div>
              <div className="flex items-center justify-center">
                <Phone className="h-6 w-6 text-secondary mr-3" />
                <span className="text-gray-600">+39 02 1234567</span>
              </div>
              <div className="flex items-center justify-center">
                <MapPin className="h-6 w-6 text-secondary mr-3" />
                <span className="text-gray-600">Milano, Italia</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to="/register">
              <Button className="bg-secondary hover:bg-secondary/90">Inizia Oggi</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;