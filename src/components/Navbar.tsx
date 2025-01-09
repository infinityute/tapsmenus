import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSession } from "@supabase/auth-helpers-react";
import { UserMenu } from "./UserMenu";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const session = useSession();

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-secondary rounded-lg grid grid-cols-2 gap-1 p-1.5">
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
                <div className="bg-white rounded-sm transform rotate-45"></div>
              </div>
              <span className="text-2xl font-bold text-primary">MenuQR</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/features" className="text-gray-600 hover:text-primary">
              Funzionalità
            </Link>
            <Link to="/pricing" className="text-gray-600 hover:text-primary">
              Prezzi
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-primary">
              Chi Siamo
            </Link>
            <Link to="/support" className="text-gray-600 hover:text-primary">
              Supporto
            </Link>
            {session ? (
              <UserMenu user={session.user} />
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="mr-2">
                    Accedi
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-secondary hover:bg-secondary/90">
                    Inizia Ora
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            {session && <UserMenu user={session.user} />}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-secondary ml-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
            <Link
              to="/features"
              className="block px-3 py-2 text-gray-600 hover:text-primary"
            >
              Funzionalità
            </Link>
            <Link
              to="/pricing"
              className="block px-3 py-2 text-gray-600 hover:text-primary"
            >
              Prezzi
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-600 hover:text-primary"
            >
              Chi Siamo
            </Link>
            <Link
              to="/support"
              className="block px-3 py-2 text-gray-600 hover:text-primary"
            >
              Supporto
            </Link>
            {!session && (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 text-gray-600 hover:text-primary"
                >
                  Accedi
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 text-gray-600 hover:text-primary"
                >
                  Inizia Ora
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};