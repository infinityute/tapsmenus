import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const FAQ = () => {
  const faqs = [
    {
      question: "Come funziona MenuQR?",
      answer: "MenuQR è una piattaforma semplice che ti permette di creare menu digitali accessibili tramite codici QR. Basta caricare il tuo menu, personalizzarlo e generare il codice QR da mostrare ai tuoi clienti."
    },
    {
      question: "È difficile aggiornare il menu?",
      answer: "No, aggiornare il menu è semplicissimo! Puoi modificare prezzi, piatti e descrizioni in tempo reale attraverso il nostro intuitivo pannello di controllo."
    },
    {
      question: "MenuQR funziona offline?",
      answer: "Sì, una volta che i clienti hanno caricato il menu, possono visualizzarlo anche senza connessione internet. Tuttavia, per vedere gli aggiornamenti è necessaria una connessione."
    },
    {
      question: "Posso personalizzare l'aspetto del mio menu digitale?",
      answer: "Assolutamente sì! Puoi personalizzare colori, font, layout e aggiungere il tuo logo per mantenere l'identità del tuo brand."
    },
    {
      question: "Che tipo di supporto offrite?",
      answer: "Offriamo supporto via email per tutti i piani, supporto prioritario per il piano Pro e un account manager dedicato per il piano Enterprise."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12">Domande Frequenti</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};