import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, ExternalLink, RefreshCw } from "lucide-react";
import { MenuQRCode } from "./MenuQRCode";
import { Link } from "react-router-dom";
import { useState } from "react";
import { UpdateQRCodeDialog } from "../qr/UpdateQRCodeDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface MenuQRCodeSectionProps {
  menuUrl: string;
  menuName?: string;
  menuId: string;
}

export const MenuQRCodeSection = ({ menuUrl, menuName, menuId }: MenuQRCodeSectionProps) => {
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [currentUrl, setCurrentUrl] = useState(menuUrl);
  const { toast } = useToast();

  const handleUpdate = async () => {
    try {
      // Remove any trailing slashes and ensure clean URL construction
      const baseUrl = window.location.origin.replace(/\/$/, '');
      const newQrCodeUrl = `${baseUrl}/menudemo/${menuId}?v=${Date.now()}`;
      
      const { error } = await supabase
        .from("qr_codes")
        .update({ qr_code_url: newQrCodeUrl })
        .eq("menu_id", menuId);

      if (error) throw error;
      
      setCurrentUrl(newQrCodeUrl);
      toast({
        title: "Successo",
        description: "QR code aggiornato con successo",
      });
    } catch (error) {
      console.error("Error updating QR code:", error);
      toast({
        title: "Error",
        description: "Impossibile aggiornare QR code",
        variant: "destructive",
      });
    }
    setIsUpdateDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Menu QR Code</span>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsUpdateDialogOpen(true)}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Aggiorna QR Code
              </Button>
              <Button variant="outline" size="sm" asChild>
                <Link to={`/dashboard/qr-codes?menu=${menuId}`}>
                  <QrCode className="mr-2 h-4 w-4" />
                  Gestisci QR Codes
                </Link>
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Questo è un codice QR di base per una condivisione rapida. Per funzionalità avanzate come codici specifici per tabella e tracciamento, usa la sezione Gestione codice QR.
          </p>
          <MenuQRCode menuUrl={currentUrl} menuName={menuName} />
          <Button variant="outline" className="w-full" asChild>
            <Link to={currentUrl} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Anteprima del Menu
            </Link>
          </Button>
        </CardContent>
      </Card>

      <UpdateQRCodeDialog
        open={isUpdateDialogOpen}
        onOpenChange={setIsUpdateDialogOpen}
        onConfirm={handleUpdate}
        qrCodeName={menuName || "this QR code"}
      />
    </div>
  );
};