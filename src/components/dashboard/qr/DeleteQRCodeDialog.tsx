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

interface DeleteQRCodeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  qrCodeName: string;
}

export const DeleteQRCodeDialog = ({
  open,
  onOpenChange,
  onConfirm,
  qrCodeName,
}: DeleteQRCodeDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Elimina QR Code</AlertDialogTitle>
          <AlertDialogDescription>
          Sei sicuro di voler eliminare {qrCodeName || "this QR code"}? Questa azione non può essere annullata.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancellare</AlertDialogCancel>
          <AlertDialogAction 
            className={buttonVariants({ variant: "destructive" })} 
            onClick={onConfirm}
          >
            Elimina
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};