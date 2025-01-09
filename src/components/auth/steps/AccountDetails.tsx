import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form";
import { useState } from "react";

interface AccountDetailsProps {
  email: string;
  password: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AccountDetails = ({ email, password, onChange }: AccountDetailsProps) => {
  const [errors, setErrors] = useState<{ password?: string }>({});

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length < 6) {
      setErrors({ password: "La password deve essere di almeno 6 caratteri" });
    } else {
      setErrors({});
    }
    onChange(e);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={email}
          onChange={onChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
          required
          minLength={6}
        />
        {errors.password && (
          <FormMessage>{errors.password}</FormMessage>
        )}
      </div>
    </div>
  );
};