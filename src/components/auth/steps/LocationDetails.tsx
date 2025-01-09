import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LocationDetailsProps {
  address: string;
  city: string;
  state: string;
  postalCode: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LocationDetails = ({
  address,
  city,
  state,
  postalCode,
  onChange,
}: LocationDetailsProps) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="address">Indirizzo</Label>
        <Input
          id="address"
          name="address"
          value={address}
          onChange={onChange}
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">Città</Label>
          <Input
            id="city"
            name="city"
            value={city}
            onChange={onChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">Provincia</Label>
          <Input
            id="state"
            name="state"
            value={state}
            onChange={onChange}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="postalCode">CAP</Label>
        <Input
          id="postalCode"
          name="postalCode"
          value={postalCode}
          onChange={onChange}
          required
        />
      </div>
    </div>
  );
};