import { useState } from "react";
import { useSession } from "@supabase/auth-helpers-react";
import { useNavigate, Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserPlus, Copy, RefreshCw } from "lucide-react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const StaffManagement = () => {
  const session = useSession();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState("");
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  const generateInviteLink = async () => {
    setIsLoading(true);

    try {
      const { data: restaurant } = await supabase
        .from("restaurants")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (!restaurant) {
        toast({
          title: "Errore",
          description: "Non hai un ristorante associato al tuo account.",
          variant: "destructive",
        });
        return;
      }

      const accessCode = crypto.randomUUID();
      const tempEmail = `temp_${accessCode}@placeholder.com`;
      
      const { data: invitation, error } = await supabase
        .from("staff_invitations")
        .insert({
          restaurant_id: restaurant.id,
          role: "waiter",
          email: tempEmail,
          access_code: accessCode
        })
        .select()
        .single();

      if (error) throw error;

      const newInviteLink = `${window.location.origin}/staff/join?code=${invitation.access_code}`;
      setInviteLink(newInviteLink);

      toast({
        title: "Link generato",
        description: "Il link di invito è stato generato con successo",
      });
    } catch (error) {
      console.error("Error generating invite link:", error);
      toast({
        title: "Errore",
        description: "Si è verificato un errore durante la generazione del link.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      toast({
        title: "Copiato",
        description: "Link copiato negli appunti",
      });
    } catch (error) {
      console.error("Error copying to clipboard:", error);
      toast({
        title: "Errore",
        description: "Impossibile copiare il link negli appunti",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <DashboardSidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />
      <main className="flex-1 overflow-y-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Gestione Staff</h1>
        
        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Invita Nuovo Staff</CardTitle>
              <CardDescription>
                Genera un link di invito per permettere al nuovo staff di registrarsi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button 
                  onClick={generateInviteLink} 
                  disabled={isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <UserPlus className="mr-2 h-4 w-4" />
                  )}
                  Genera Link di Invito
                </Button>

                {inviteLink && (
                  <div className="flex flex-col sm:flex-row gap-2 items-start sm:items-center mt-4">
                    <div className="flex-1 w-full sm:w-auto">
                      <input
                        type="text"
                        value={inviteLink}
                        readOnly
                        className="w-full px-3 py-2 border rounded-md bg-gray-50"
                      />
                    </div>
                    <Button
                      variant="outline"
                      onClick={copyToClipboard}
                      className="w-full sm:w-auto"
                    >
                      <Copy className="mr-2 h-4 w-4" />
                      Copia Link
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StaffManagement;