import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactDetailsProps {
  phone: string;
  website: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ContactDetails = ({ phone, website, onChange }: ContactDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="phone">Numero di Telefono</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={phone}
          onChange={onChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="website">Sito Web (Opzionale)</Label>
        <Input
          id="website"
          name="website"
          type="url"
          value={website}
          onChange={onChange}
        />
      </div>
    </div>
  );
};