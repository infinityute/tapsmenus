import { Check } from "lucide-react";

export const Features = () => {
  const features = [
    {
      title: "Facile da Usare",
      description: "Crea e aggiorna i tuoi menu in pochi clic, senza bisogno di competenze tecniche."
    },
    {
      title: "Risparmio sui Costi",
      description: "Elimina le spese di stampa e aggiorna i tuoi menu istantaneamente senza costi aggiuntivi."
    },
    {
      title: "Esperienza Cliente Migliorata",
      description: "Offri ai tuoi clienti un'esperienza moderna e interattiva con menu ricchi di dettagli e immagini."
    },
    {
      title: "Analisi Dettagliate",
      description: "Ottieni informazioni preziose sulle preferenze dei clienti per ottimizzare il tuo menu."
    },
    {
      title: "Integrazione Semplice",
      description: "Si integra facilmente con i sistemi POS esistenti per una gestione fluida."
    },
    {
      title: "Supporto Multilingua",
      description: "Offri menu in diverse lingue per accogliere una clientela internazionale."
    }
  ];

  return (
    <section className="py-16 bg-[#f9fafb]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Perché Scegliere MenuQR?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="p-6 rounded-lg bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)] transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 bg-secondary/10 p-2 rounded-full">
                  <Check className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};