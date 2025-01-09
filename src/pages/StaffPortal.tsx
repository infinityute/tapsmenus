import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, CalendarDays, Menu, UserCircle, ClipboardList } from "lucide-react";

const StaffPortal = () => {
  const session = useSession();
  const navigate = useNavigate();
  const supabase = useSupabaseClient();
  const { toast } = useToast();
  const [staffRole, setStaffRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkStaffAccess = async () => {
      if (!session?.user?.id) {
        navigate("/login");
        return;
      }

      const { data: staffMember, error } = await supabase
        .from("staff_members")
        .select("*")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (error) {
        console.error("Error checking staff access:", error);
        toast({
          title: "Errore",
          description: "Si è verificato un errore durante la verifica dell'accesso.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      if (!staffMember) {
        toast({
          title: "Accesso negato",
          description: "Non hai i permessi per accedere al portale staff.",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setStaffRole(staffMember.role);
      setIsLoading(false);
    };

    checkStaffAccess();
  }, [session, navigate, supabase, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Portale Staff</h1>
            <p className="text-sm text-gray-600">Ruolo: {staffRole}</p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Esci
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Prenotazioni
              </CardTitle>
              <CardDescription>Gestisci le prenotazioni dei clienti</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full" 
                onClick={() => navigate("/staff/reservations")}
              >
                Vai alle prenotazioni
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Menu className="h-5 w-5" />
                Menu
              </CardTitle>
              <CardDescription>Visualizza il menu del ristorante</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                onClick={() => navigate("/staff/menu")}
              >
                Visualizza menu
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Ordinazioni
              </CardTitle>
              <CardDescription>Gestisci le ordinazioni dei clienti</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                onClick={() => navigate("/staff/menu-ordering")}
              >
                Nuova ordinazione
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCircle className="h-5 w-5" />
                Il mio profilo
              </CardTitle>
              <CardDescription>Gestisci le tue informazioni</CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                className="w-full"
                onClick={() => navigate("/staff/profile")}
              >
                Vai al profilo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StaffPortal;