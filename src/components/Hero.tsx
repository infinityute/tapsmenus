import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white pt-[72px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-primary sm:text-5xl md:text-6xl">
                <span className="block animate-on-scroll" style={{ animationDelay: '200ms' }}>
                  Trasforma il tuo menu
                </span>
                <span className="block text-secondary animate-on-scroll" style={{ animationDelay: '400ms' }}>
                  in un'esperienza digitale
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 animate-on-scroll" style={{ animationDelay: '600ms' }}>
                Crea menu digitali con codici QR. Migliora l'esperienza dei tuoi clienti e ottimizza le tue operazioni.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4 animate-on-scroll" style={{ animationDelay: '800ms' }}>
                <Button className="w-full sm:w-auto flex items-center justify-center px-8 py-3 text-base font-medium bg-secondary hover:bg-secondary/90 transition-transform hover:scale-105">
                  Inizia Ora
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="mt-3 sm:mt-0 w-full sm:w-auto flex items-center justify-center px-8 py-3 text-base font-medium transition-transform hover:scale-105">
                  Vedi Demo
                </Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};