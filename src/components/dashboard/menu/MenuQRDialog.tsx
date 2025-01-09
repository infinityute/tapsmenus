import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MenuQRCode } from "./MenuQRCode";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

interface MenuQRDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  menuId: string;
  menuName?: string;
}

export const MenuQRDialog = ({ open, onOpenChange, menuId, menuName }: MenuQRDialogProps) => {
  // Remove any trailing slashes and ensure clean URL construction
  const baseUrl = window.location.origin.replace(/\/$/, '');
  const menuUrl = menuId ? `${baseUrl}/menudemo/${menuId}` : '';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Menu QR Code</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <MenuQRCode menuUrl={menuUrl} menuName={menuName} />
          <Button variant="outline" className="w-full" asChild>
            <Link to={menuUrl} target="_blank">
              <ExternalLink className="mr-2 h-4 w-4" />
              Anteprima del menu
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};