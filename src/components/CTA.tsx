import { Button } from "./ui/button";

export const CTA = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-4">
          Pronto a Trasformare il Tuo Menu?
        </h2>
        <p className="text-white/90 text-lg mb-8">
          Inizia oggi stesso e porta la tua attività nel futuro della ristorazione digitale.
        </p>
        <Button variant="default" className="bg-white text-secondary hover:bg-white/90">
          Inizia la Prova Gratuita
        </Button>
      </div>
    </section>
  );
};