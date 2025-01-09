import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import About from "./pages/About";
import Pricing from "./pages/Pricing";
import Auth from "./pages/Auth";
import Features from "./pages/Features";
import MenuDemo from "./pages/MenuDemo";
import Support from "./pages/Support";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MenuManagement from "./pages/dashboard/MenuManagement";
import MenuEditor from "./pages/dashboard/MenuEditor";
import Reservations from "./pages/dashboard/Reservations";
import Analytics from "./pages/dashboard/Analytics";
import Settings from "./pages/dashboard/Settings";
import QRCodeManagement from "./pages/dashboard/QRCodeManagement";
import StaffManagement from "./pages/dashboard/StaffManagement";
import StaffPortal from "./pages/StaffPortal";
import MenuOrdering from "./pages/staff/MenuOrdering";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionContextProvider supabaseClient={supabase}>
        <BrowserRouter>
          <TooltipProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/features" element={<Features />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/register" element={<Auth />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/menudemo" element={<MenuDemo />} />
              <Route path="/menudemo/:menuId" element={<MenuDemo />} />
              <Route path="/support" element={<Support />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/dashboard/menus" element={<MenuManagement />} />
              <Route path="/dashboard/menus/:menuId" element={<MenuEditor />} />
              <Route path="/dashboard/reservations" element={<Reservations />} />
              <Route path="/dashboard/analytics" element={<Analytics />} />
              <Route path="/dashboard/settings" element={<Settings />} />
              <Route path="/dashboard/qr-codes" element={<QRCodeManagement />} />
              <Route path="/dashboard/staff" element={<StaffManagement />} />
              <Route path="/staff" element={<StaffPortal />} />
              <Route path="/staff/join" element={<Auth />} />
              <Route path="/staff/reservations" element={<Reservations />} />
              <Route path="/staff/menu" element={<MenuDemo />} />
              <Route path="/staff/menu-ordering" element={<MenuOrdering />} />
              <Route path="/staff/profile" element={<Profile />} />
            </Routes>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </BrowserRouter>
      </SessionContextProvider>
    </QueryClientProvider>
  );
};

export default App;