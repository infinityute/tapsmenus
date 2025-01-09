import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { QrCode } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { QRCodeCard } from "./QRCodeCard";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

interface Menu {
  id: string;
  name: string;
  description: string | null;
}

interface QRCode {
  id: string;
  name: string | null;
  description: string | null;
  qr_code_url: string;
  table_number: string | null;
  location: string | null;
  is_active: boolean | null;
  scan_count: number | null;
  last_scanned_at: string | null;
  created_at: string;
  menu: Menu;
}

interface QRCodeListProps {
  qrCodes: QRCode[];
  isLoading: boolean;
}

export const QRCodeList = ({ qrCodes: initialQRCodes, isLoading: initialLoading }: QRCodeListProps) => {
  const session = useSession();
  const { toast } = useToast();
  const [selectedQRCode, setSelectedQRCode] = useState<QRCode | null>(null);
  const [emailAddress, setEmailAddress] = useState("");
  const [isEmailDialogOpen, setIsEmailDialogOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // If no session, redirect to login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  const { data: qrCodes, refetch, isLoading } = useQuery({
    queryKey: ["qr-codes", session.user.id],
    queryFn: async () => {
      const { data: restaurant } = await supabase
        .from("restaurants")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (!restaurant) {
        toast({
          title: "Errore",
          description: "Ristorante non trovato",
          variant: "destructive",
        });
        return [];
      }

      const { data, error } = await supabase
        .from("qr_codes")
        .select(`
          *,
          menu:menus (
            id,
            name,
            description
          )
        `)
        .eq("restaurant_id", restaurant.id);

      if (error) {
        console.error("Error fetching QR codes:", error);
        toast({
          title: "Errore",
          description: "Impossibile caricare i codici QR",
          variant: "destructive",
        });
        return [];
      }

      return data || [];
    },
    initialData: initialQRCodes,
    enabled: !!session?.user?.id,
  });

  const handleUpdate = async (updatedId: string, newUrl: string) => {
    await refetch();
  };

  const shareQRCode = async () => {
    if (!selectedQRCode || !emailAddress || !session?.user?.id) return;

    setIsSending(true);
    try {
      const { data: restaurant } = await supabase
        .from("restaurants")
        .select("name")
        .eq("user_id", session.user.id)
        .single();

      const response = await fetch("/api/share-qr-code", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: [emailAddress],
          menuName: selectedQRCode.menu.name,
          qrCodeUrl: selectedQRCode.qr_code_url,
          restaurantName: restaurant?.name || "il nostro ristorante",
        }),
      });

      if (!response.ok) {
        throw new Error("Impossibile inviare l'email");
      }

      toast({
        title: "Successo",
        description: "Codice QR condiviso con successo",
      });
      setIsEmailDialogOpen(false);
      setEmailAddress("");
    } catch (error) {
      console.error("Errore durante la condivisione del codice QR:", error);
      toast({
        title: "Errore",
        description: "Impossibile condividere il codice QR",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
      setSelectedQRCode(null);
    }
  };

  if (isLoading || initialLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-muted-foreground">Caricamento codici QR...</p>
      </div>
    );
  }

  if (!qrCodes || qrCodes.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center p-6">
          <QrCode className="mb-4 h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">Nessun codice QR trovato</p>
          <p className="text-sm text-muted-foreground">
            Crea il tuo primo codice QR per iniziare
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {qrCodes.map((qrCode) => (
          <QRCodeCard
            key={qrCode.id}
            qrCode={qrCode}
            onUpdate={handleUpdate}
            onEmailShare={(qrCode) => {
              setSelectedQRCode(qrCode);
              setIsEmailDialogOpen(true);
            }}
          />
        ))}
      </div>

      <Dialog open={isEmailDialogOpen} onOpenChange={setIsEmailDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Condividi Codice QR</DialogTitle>
            <DialogDescription>
              Inserisci l'indirizzo email con cui condividere questo codice QR.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Indirizzo Email</Label>
              <Input
                id="email"
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="Inserisci l'email del destinatario"
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEmailDialogOpen(false)}>
                Annulla
              </Button>
              <Button onClick={shareQRCode} disabled={isSending}>
                {isSending ? "Invio in corso..." : "Invia"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};