import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarIcon, Plus } from "lucide-react";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";

interface DashboardHeaderProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onManageAnalytics: () => void;
}

export const DashboardHeader = ({ date, setDate, onManageAnalytics }: DashboardHeaderProps) => {
  const isMobile = useIsMobile();

  return (
    <div className="mb-8 space-y-4">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Bentornato</h1>
        <p className="text-sm text-muted-foreground">
          Ecco una panoramica delle prestazioni del tuo ristorante
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align={isMobile ? "center" : "start"}>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button 
          onClick={onManageAnalytics}
          className="w-full sm:w-auto"
        >
          <Plus className="mr-2 h-4 w-4" />
          Aggiorna Analisi
        </Button>
      </div>
    </div>
  );
};