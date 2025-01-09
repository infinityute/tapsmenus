import { supabase } from "@/integrations/supabase/client";
import { StaffRegistrationFormData } from "../forms/StaffRegistrationFields";

type UserRole = "admin" | "manager" | "waiter";

interface VerifyInvitationResult {
  isValid: boolean;
  invitation?: {
    restaurant_id: string;
    role: UserRole;
  };
  error?: string;
}

export const verifyInvitation = async (accessCode: string): Promise<VerifyInvitationResult> => {
  console.log("Verifying invitation access code:", accessCode);
  
  try {
    const { data: invitations, error: invitationError } = await supabase
      .from("staff_invitations")
      .select("*")
      .eq("access_code", accessCode)
      .is("accepted_at", null); // Only non-accepted invitations

    console.log("Query result:", { invitations, invitationError });

    if (invitationError) {
      console.error("Invitation verification error:", invitationError);
      return { isValid: false, error: "Invito non valido" };
    }

    if (!invitations || invitations.length === 0) {
      console.log("No invitation found for access code:", accessCode);
      return { isValid: false, error: "Invito non trovato" };
    }

    const invitation = invitations[0];
    console.log("Found invitation:", invitation);

    // Validate that the role is one of the allowed values
    if (!isValidRole(invitation.role)) {
      console.error("Invalid role in invitation:", invitation.role);
      return { isValid: false, error: "Ruolo non valido nell'invito" };
    }

    return {
      isValid: true,
      invitation: {
        restaurant_id: invitation.restaurant_id,
        role: invitation.role as UserRole,
      },
    };
  } catch (error) {
    console.error("Unexpected error during invitation verification:", error);
    return { isValid: false, error: "Errore durante la verifica dell'invito" };
  }
};

const isValidRole = (role: string): role is UserRole => {
  return ["admin", "manager", "waiter"].includes(role);
};

export const registerStaffMember = async (
  formData: StaffRegistrationFormData,
  restaurantId: string,
  role: UserRole,
  accessCode: string
) => {
  console.log("Starting staff registration process");
  console.log("Role being registered:", role);
  
  // Create user account
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: formData.email,
    password: formData.password,
    options: {
      data: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
      },
    },
  });

  if (authError) {
    console.error("Auth error during registration:", authError);
    throw authError;
  }

  if (!authData.user) {
    console.error("No user data returned from auth signup");
    throw new Error("Errore durante la creazione dell'account");
  }

  console.log("User account created successfully");

  try {
    // Create profile record first
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: authData.user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
      });

    if (profileError) {
      console.error("Profile creation error:", profileError);
      throw profileError;
    }

    console.log("Profile record created successfully");

    // Create staff member record
    const { error: staffError } = await supabase
      .from("staff_members")
      .insert({
        user_id: authData.user.id,
        restaurant_id: restaurantId,
        role: role,
        is_active: true,
      });

    if (staffError) {
      console.error("Staff member creation error:", staffError);
      throw staffError;
    }

    console.log("Staff member record created successfully");

    // Update invitation status
    const { error: updateError } = await supabase
      .from("staff_invitations")
      .update({ accepted_at: new Date().toISOString() })
      .eq("access_code", accessCode);

    if (updateError) {
      console.error("Invitation update error:", updateError);
      throw updateError;
    }

    console.log("Invitation status updated successfully");
    return authData.user;
  } catch (error) {
    // If any error occurs after user creation, we should handle cleanup
    console.error("Error during staff registration:", error);
    throw error;
  }
};