import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { StaffRegistrationFields, formSchema, type StaffRegistrationFormData } from "./forms/StaffRegistrationFields";
import { verifyInvitation, registerStaffMember } from "./services/staffRegistration";

export const StaffRegistrationForm = () => {
  const [searchParams] = useSearchParams();
  const accessCode = searchParams.get("code");
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const form = useForm<StaffRegistrationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = async (formData: StaffRegistrationFormData) => {
    if (!accessCode) {
      toast({
        title: "Codice mancante",
        description: "Il link di invito non è valido.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Verify invitation
      const verificationResult = await verifyInvitation(accessCode);
      
      if (!verificationResult.isValid || !verificationResult.invitation) {
        throw new Error(verificationResult.error || "Invito non valido");
      }

      // Register staff member
      await registerStaffMember(
        formData,
        verificationResult.invitation.restaurant_id,
        verificationResult.invitation.role,
        accessCode
      );

      toast({
        title: "Registrazione completata!",
        description: "Il tuo account è stato creato con successo.",
      });

      // Redirect to staff portal instead of dashboard
      navigate("/staff");
    } catch (error) {
      console.error("Errore durante la registrazione:", error);
      toast({
        title: "Registrazione fallita",
        description: error instanceof Error ? error.message : "Si è verificato un errore durante la registrazione.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <StaffRegistrationFields form={form} />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Registrazione in corso..." : "Registrati"}
        </Button>
      </form>
    </Form>
  );
};

export default StaffRegistrationForm;