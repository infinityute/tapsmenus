import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Mail, MessageCircle, Phone } from "lucide-react";

const Support = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({
      title: "Messaggio inviato",
      description: "Ti risponderemo il prima possibile.",
    });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Centro Assistenza</h1>
            <p className="text-lg text-gray-600">Siamo qui per aiutarti con qualsiasi domanda o dubbio</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  Supporto Telefonico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Chiamaci dal lunedì al venerdì</p>
                <p className="font-semibold">9:00 - 18:00 CET</p>
                <p className="text-primary font-bold mt-2">+39 02 1234567</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Supporto Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Inviaci una email in qualsiasi momento</p>
                <p className="font-semibold">Risposta entro 24 ore</p>
                <p className="text-primary font-bold mt-2">supporto@menuqr.com</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Chat dal Vivo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Chatta con il nostro team</p>
                <p className="font-semibold">Disponibile 24/7</p>
                <Button className="mt-2 w-full">Inizia Chat</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Modulo di Contatto</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input placeholder="Il Tuo Nome" required />
                  </div>
                  <div>
                    <Input type="email" placeholder="La Tua Email" required />
                  </div>
                </div>
                <div>
                  <Input placeholder="Oggetto" required />
                </div>
                <div>
                  <Textarea placeholder="Il Tuo Messaggio" className="min-h-[150px]" required />
                </div>
                <Button type="submit" className="w-full">Invia Messaggio</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Support;