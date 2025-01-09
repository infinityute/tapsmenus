import { useSession } from "@supabase/auth-helpers-react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const StaffReservations = () => {
  const session = useSession();
  const navigate = useNavigate();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-4"
          onClick={() => navigate("/staff")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Torna al portale
        </Button>
        <h1 className="text-2xl font-bold">Gestione Prenotazioni</h1>
      </div>
    </div>
  );
};

export default StaffReservations;