import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BarChart3, Home, Menu, Settings, Calendar, QrCode, ChevronLeft, LogOut, Users } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const menuItems = [
  { 
    icon: Home, 
    label: "Panoramica", 
    path: "/dashboard",
    description: "Visualizza le metriche chiave del tuo ristorante, l'attività recente e le notifiche importanti in un'unica vista."
  },
  { 
    icon: Menu, 
    label: "Menu", 
    path: "/dashboard/menus",
    description: "Crea e gestisci i tuoi menu digitali, aggiungi elementi e organizzali in categorie."
  },
  { 
    icon: Calendar, 
    label: "Prenotazioni", 
    path: "/dashboard/reservations",
    description: "Gestisci le prenotazioni dei tavoli, visualizza le prenotazioni in arrivo e gestisci le richieste dei clienti."
  },
  { 
    icon: QrCode, 
    label: "Codici QR", 
    path: "/dashboard/qr-codes",
    description: "Genera e gestisci i codici QR per i tuoi menu da posizionare sui tavoli o sui materiali di marketing."
  },
  { 
    icon: Users, 
    label: "Staff", 
    path: "/dashboard/staff",
    description: "Gestisci il tuo staff, invia inviti e controlla gli accessi del personale."
  },
  { 
    icon: BarChart3, 
    label: "Analisi", 
    path: "/dashboard/analytics",
    description: "Monitora le prestazioni del tuo ristorante con dettagli approfonditi su vendite, elementi popolari e tendenze dei clienti."
  },
  { 
    icon: Settings, 
    label: "Impostazioni", 
    path: "/dashboard/settings",
    description: "Configura il profilo del tuo ristorante, le preferenze di notifica e le impostazioni dell'account."
  },
];

interface DashboardSidebarProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export const DashboardSidebar = ({ isOpen, onOpenChange }: DashboardSidebarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isMobile) {
      onOpenChange(false);
    } else {
      onOpenChange(true);
    }
  }, [isMobile, onOpenChange]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <TooltipProvider>
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b bg-background/80 backdrop-blur-sm transition-all duration-300 md:relative md:inset-x-auto md:top-auto md:border-r",
          isMobile ? (
            isOpen ? "h-[100dvh]" : "h-16"
          ) : (
            isOpen ? "w-64" : "w-20"
          )
        )}
      >
        <div className={cn(
          "flex h-full flex-col",
          isMobile && !isOpen && "h-16 flex-row items-center px-4"
        )}>
          <div className="flex items-center justify-between border-b p-4">
            <span className={cn(
              "font-semibold",
              !isOpen && "hidden",
              isMobile && !isOpen && "block"
            )}>
              Dashboard
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(!isOpen)}
              className={cn(
                "md:flex",
                isOpen && !isMobile && "rotate-180",
                isMobile && "ml-auto"
              )}
            >
              <ChevronLeft className={cn(
                "h-5 w-5",
                isMobile && "rotate-90",
                isMobile && isOpen && "-rotate-90"
              )} />
            </Button>
          </div>
          
          <nav className={cn(
            "flex-1 space-y-1 p-2",
            isMobile && !isOpen && "hidden"
          )}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Tooltip key={item.path} delayDuration={300}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.path}
                      onClick={() => isMobile && onOpenChange(false)}
                      className={cn(
                        "flex items-center space-x-2 rounded-lg px-3 py-2 text-sm transition-colors relative group",
                        isActive 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:bg-accent hover:text-foreground",
                        !isOpen && "justify-center md:justify-center"
                      )}
                    >
                      <item.icon className={cn(
                        "h-5 w-5 transition-colors",
                        isActive && "text-primary"
                      )} />
                      {isOpen && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-[200px]">
                    <p className="font-medium">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </nav>
          <div className={cn(
            "p-2 border-t",
            isMobile && !isOpen && "hidden"
          )}>
            <Button
              variant="ghost"
              className={cn(
                "w-full flex items-center space-x-2",
                !isOpen && "justify-center"
              )}
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              {isOpen && <span>Esci</span>}
            </Button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};