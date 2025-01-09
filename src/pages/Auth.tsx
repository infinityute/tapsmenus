import { useEffect } from "react";
import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { RegistrationSteps } from "@/components/auth/RegistrationSteps";
import { StaffRegistrationForm } from "@/components/auth/StaffRegistrationForm";
import { ArrowLeft } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const isLogin = location.pathname === "/login";
  const isStaffJoin = location.pathname === "/staff/join";

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/dashboard");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session) {
          toast({
            title: "Benvenuto!",
            description: "Accesso effettuato con successo.",
          });
          navigate("/dashboard");
        }
        if (event === "SIGNED_OUT") {
          navigate("/login");
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <Link 
        to="/" 
        className="absolute top-4 left-4 inline-flex items-center text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Torna alla Home
      </Link>
      
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {isStaffJoin 
              ? "Registrazione Staff" 
              : isLogin 
                ? "Bentornato" 
                : "Crea il tuo account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {isStaffJoin 
              ? "Completa la registrazione per accedere al portale staff"
              : isLogin 
                ? "Accedi per gestire il menu del tuo ristorante" 
                : "Inizia a gestire il tuo ristorante"}
          </p>
        </div>

        {isStaffJoin ? (
          <StaffRegistrationForm />
        ) : isLogin ? (
          <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <SupabaseAuth
              supabaseClient={supabase}
              appearance={{ 
                theme: ThemeSupa,
                style: {
                  button: { background: '#10B981', color: 'white' },
                  anchor: { color: '#10B981' },
                  container: { width: '100%' },
                  message: { color: 'rgb(239 68 68)' },
                },
              }}
              localization={{
                variables: {
                  sign_in: {
                    email_label: "Email",
                    password_label: "Password",
                    button_label: "Accedi",
                    loading_button_label: "Accesso in corso...",
                    social_provider_text: "Accedi con {{provider}}",
                    link_text: "Hai già un account? Accedi",
                  },
                  sign_up: {
                    email_label: "Email",
                    password_label: "Password",
                    button_label: "Registrati",
                    loading_button_label: "Registrazione in corso...",
                    social_provider_text: "Registrati con {{provider}}",
                    link_text: "Non hai un account? Registrati",
                  },
                  forgotten_password: {
                    email_label: "Email",
                    password_label: "Password",
                    button_label: "Invia istruzioni",
                    loading_button_label: "Invio istruzioni in corso...",
                    link_text: "Password dimenticata?",
                  },
                },
              }}
              theme="light"
              providers={[]}
              redirectTo={window.location.origin}
            />
            <div className="mt-4 text-center">
              <Link 
                to="/register" 
                className="text-sm text-[#10B981] hover:text-[#059669]"
              />
            </div>
          </div>
        ) : (
          <>
            <RegistrationSteps />
            <div className="text-center">
              <Link 
                to="/login" 
                className="text-sm text-[#10B981] hover:text-[#059669]"
              >
                Hai già un account? Accedi
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Auth;