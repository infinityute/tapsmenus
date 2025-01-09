import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  firstName: z.string().min(2, {
    message: "Il nome deve contenere almeno 2 caratteri",
  }),
  lastName: z.string().min(2, {
    message: "Il cognome deve contenere almeno 2 caratteri",
  }),
  email: z.string().email({
    message: "Inserisci un indirizzo email valido",
  }),
  phone: z.string().min(6, {
    message: "Inserisci un numero di telefono valido",
  }),
  password: z.string().min(6, {
    message: "La password deve contenere almeno 6 caratteri",
  }),
});

export type StaffRegistrationFormData = z.infer<typeof formSchema>;

interface StaffRegistrationFieldsProps {
  form: UseFormReturn<StaffRegistrationFormData>;
}

export const StaffRegistrationFields = ({ form }: StaffRegistrationFieldsProps) => {
  return (
    <>
      <FormField
        control={form.control}
        name="firstName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome</FormLabel>
            <FormControl>
              <Input placeholder="Mario" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="lastName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Cognome</FormLabel>
            <FormControl>
              <Input placeholder="Rossi" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email</FormLabel>
            <FormControl>
              <Input placeholder="mario.rossi@example.com" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Telefono</FormLabel>
            <FormControl>
              <Input placeholder="+39 123 456 7890" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export { formSchema };