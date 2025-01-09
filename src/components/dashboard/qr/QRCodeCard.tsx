import { useState } from "react";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { Download, Mail, RefreshCw } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UpdateQRCodeDialog } from "./UpdateQRCodeDialog";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

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

interface QRCodeCardProps {
  qrCode: QRCode;
  onUpdate: (id: string, newUrl: string) => void;
  onEmailShare: (qrCode: QRCode) => void;
}

export const QRCodeCard = ({ qrCode, onUpdate, onEmailShare }: QRCodeCardProps) => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleUpdate = async () => {
    try {
      // Remove any trailing slashes and ensure clean URL construction
      const baseUrl = window.location.origin.replace(/\/$/, '');
      const newQrCodeUrl = `${baseUrl}/menudemo/${qrCode.menu.id}?v=${Date.now()}`;
      
      const { error } = await supabase
        .from("qr_codes")
        .update({ qr_code_url: newQrCodeUrl })
        .eq("menu_id", qrCode.menu.id);

      if (error) throw error;
      
      onUpdate(qrCode.id, newQrCodeUrl);
      toast({
        title: "Codice QR aggiornato",
        description: "Tutti i codici QR per questo menu sono stati aggiornati con successo.",
      });
    } catch (error) {
      console.error("Errore durante l'aggiornamento del codice QR:", error);
      toast({
        title: "Errore",
        description: "Impossibile aggiornare il codice QR. Riprova.",
        variant: "destructive",
      });
    }
    setIsUpdateDialogOpen(false);
  };

  const downloadQRCode = () => {
    const canvas = document.createElement("canvas");
    const svg = document.getElementById(`qr-code-${qrCode.id}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      canvas.width = 240;
      canvas.height = 240;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 20, 20, 200, 200);

      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = `menu-qr-${qrCode.name || "code"}.png`;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      URL.revokeObjectURL(svgUrl);
    };
    img.src = svgUrl;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle>{qrCode.name || "Codice QR senza nome"}</CardTitle>
              <p className="text-sm text-muted-foreground">{qrCode.menu.name}</p>
            </div>
            <Badge variant={qrCode.is_active ? "default" : "secondary"}>
              {qrCode.is_active ? "Attivo" : "Inattivo"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 space-y-2">
            <div className="flex justify-center bg-white p-4 rounded-lg">
              <QRCodeSVG
                id={`qr-code-${qrCode.id}`}
                value={qrCode.qr_code_url}
                size={150}
                level="H"
                includeMargin
              />
            </div>
            {qrCode.table_number && <p className="text-sm">Tavolo: {qrCode.table_number}</p>}
            {qrCode.location && <p className="text-sm">Posizione: {qrCode.location}</p>}
            <p className="text-sm">Creato: {format(new Date(qrCode.created_at), "PPP", { locale: it })}</p>
            <p className="text-sm">
              Scansioni: {qrCode.scan_count || 0}
              {qrCode.last_scanned_at && (
                <span className="text-muted-foreground">
                  {" "}
                  (Ultima: {format(new Date(qrCode.last_scanned_at), "PPP", { locale: it })})
                </span>
              )}
            </p>
          </div>
          <div className="flex justify-between gap-2">
            <Button variant="outline" className="flex-1" onClick={downloadQRCode}>
              <Download className="mr-2 h-4 w-4" />
              Scarica
            </Button>
            <Button variant="outline" size="icon" className="flex-1" onClick={() => onEmailShare(qrCode)}>
              <Mail className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="flex-1"
              onClick={() => setIsUpdateDialogOpen(true)}
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <UpdateQRCodeDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        onConfirm={handleUpdate}
        qrCodeName={qrCode.name || "questo codice QR"}
      />
    </>
  );
};