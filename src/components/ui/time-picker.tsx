import * as React from "react";
import { Input } from "./input";

interface TimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
}

export const TimePicker: React.FC<TimePickerProps> = ({
  value,
  onChange,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Input
      type="time"
      value={value}
      onChange={handleChange}
      {...props}
    />
  );
};