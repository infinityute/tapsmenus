import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";

interface UpdateQRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  qrCodeName: string;
}

export const UpdateQRCodeDialog = ({
  open,
  onOpenChange,
  onConfirm,
  qrCodeName,
}: UpdateQRCodeDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Aggiorna Codice QR</AlertDialogTitle>
          <AlertDialogDescription>
            Sei sicuro di voler aggiornare {qrCodeName}? Questo genererà un nuovo URL per il codice QR.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annulla</AlertDialogCancel>
          <AlertDialogAction 
            className={buttonVariants({ variant: "default" })} 
            onClick={onConfirm}
          >
            Aggiorna
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};