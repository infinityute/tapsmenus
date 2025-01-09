import { useState } from "react";
import { Armchair, Sun, Home, CircleHelp, Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Table, TableStatus } from "./types";

interface TableLayoutProps {
  tables: Table[];
  onTableClick: (tableId: string) => void;
  onAddTable: (location: "indoor" | "outdoor") => void;
  onDeleteTable: (tableId: string) => void;
  refetchTables: () => void;
}

export const TableLayout = ({ 
  tables, 
  onTableClick, 
  onAddTable,
  onDeleteTable,
  refetchTables 
}: TableLayoutProps) => {
  const { toast } = useToast();
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const getTableColor = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return "bg-emerald-100 border-emerald-200 hover:bg-emerald-200";
      case "reserved":
        return "bg-amber-100 border-amber-200 hover:bg-amber-200";
      case "on-dine":
        return "bg-rose-100 border-rose-200 hover:bg-rose-200";
      default:
        return "bg-gray-100 border-gray-200";
    }
  };

  const getTableStatus = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return "Disponibile";
      case "reserved":
        return "Prenotato";
      case "on-dine":
        return "Occupato";
      default:
        return status;
    }
  };

  const handleDeleteTable = async (tableId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setIsDeleting(tableId);

    try {
      const { error } = await supabase
        .from('tables')
        .delete()
        .eq('id', tableId);

      if (error) throw error;

      toast({
        title: "Successo",
        description: "Tavolo eliminato con successo",
      });
      
      refetchTables();
    } catch (error) {
      console.error('Errore durante l\'eliminazione del tavolo:', error);
      toast({
        title: "Errore",
        description: "Impossibile eliminare il tavolo",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(null);
    }
  };

  const indoorTables = tables.filter((table) => table.location === "indoor");
  const outdoorTables = tables.filter((table) => table.location === "outdoor");

  return (
    <div className="space-y-8">
      {/* Legenda */}
      <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-emerald-100">
            Disponibile
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-amber-100">
            Prenotato
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-rose-100">
            Occupato
          </Badge>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CircleHelp className="h-5 w-5 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Clicca su un tavolo per gestire le prenotazioni</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Sezione Interna */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Home className="h-5 w-5" />
            <h2>Sala Interna</h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddTable("indoor")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Aggiungi Tavolo
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {indoorTables.map((table) => (
            <div
              key={table.id}
              onClick={() => onTableClick(table.id)}
              className={cn(
                "relative p-4 rounded-lg border-2 cursor-pointer transition-colors",
                getTableColor(table.status)
              )}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{table.name}</span>
                <span className="text-sm text-gray-600">
                  {getTableStatus(table.status)}
                </span>
              </div>
              <div className="flex flex-wrap justify-around gap-2">
                {Array.from({ length: table.capacity }).map((_, index) => (
                  <Armchair
                    key={index}
                    className={cn(
                      "h-5 w-5",
                      table.status === "available"
                        ? "text-emerald-600"
                        : table.status === "reserved"
                        ? "text-amber-600"
                        : "text-rose-600"
                    )}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Capacità: {table.capacity} persone
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-100"
                  onClick={(e) => handleDeleteTable(table.id, e)}
                  disabled={isDeleting === table.id}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sezione Esterna */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <Sun className="h-5 w-5" />
            <h2>Dehors</h2>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onAddTable("outdoor")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Aggiungi Tavolo
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {outdoorTables.map((table) => (
            <div
              key={table.id}
              onClick={() => onTableClick(table.id)}
              className={cn(
                "relative p-4 rounded-lg border-2 cursor-pointer transition-colors",
                getTableColor(table.status)
              )}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">{table.name}</span>
                <span className="text-sm text-gray-600">
                  {getTableStatus(table.status)}
                </span>
              </div>
              <div className="flex flex-wrap justify-around gap-2">
                {Array.from({ length: table.capacity }).map((_, index) => (
                  <Armchair
                    key={index}
                    className={cn(
                      "h-5 w-5",
                      table.status === "available"
                        ? "text-emerald-600"
                        : table.status === "reserved"
                        ? "text-amber-600"
                        : "text-rose-600"
                    )}
                  />
                ))}
              </div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-sm text-gray-600">
                  Capacità: {table.capacity} persone
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700 hover:bg-red-100"
                  onClick={(e) => handleDeleteTable(table.id, e)}
                  disabled={isDeleting === table.id}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
