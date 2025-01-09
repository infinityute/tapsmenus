import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReservationCard } from "./ReservationCard";
import { TableLayout } from "./TableLayout";
import { AddReservationDialog } from "./AddReservationDialog";
import { ManageTableDialog } from "./ManageTableDialog";
import { AddTableDialog } from "./AddTableDialog";
import { supabase } from "@/integrations/supabase/client";
import { format, addDays, subDays } from "date-fns";
import { it } from "date-fns/locale";
import { Table, TableStatus, TableLocation } from "./types";

export const ReservationList = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAddTableDialogOpen, setIsAddTableDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [newTableLocation, setNewTableLocation] = useState<TableLocation | null>(null);

  const { data: restaurant } = useQuery({
    queryKey: ["restaurant"],
    queryFn: async () => {
      const { data } = await supabase
        .from("restaurants")
        .select("*")
        .single();
      return data;
    },
  });

  const { data: reservations, refetch: refetchReservations } = useQuery({
    queryKey: ["reservations", restaurant?.id, selectedDate],
    queryFn: async () => {
      const startOfDay = new Date(selectedDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(selectedDate);
      endOfDay.setHours(23, 59, 59, 999);

      const { data } = await supabase
        .from("reservations")
        .select("*")
        .eq("restaurant_id", restaurant?.id)
        .gte("reservation_date", startOfDay.toISOString())
        .lte("reservation_date", endOfDay.toISOString())
        .order("reservation_date", { ascending: true });
      return data || [];
    },
    enabled: !!restaurant?.id,
  });

  const { data: tables, refetch: refetchTables } = useQuery({
    queryKey: ["tables", restaurant?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("tables")
        .select("*")
        .eq("restaurant_id", restaurant?.id)
        .order("created_at", { ascending: true });
      
      // Type assertion to ensure the status is one of the allowed values
      return (data || []).map(table => ({
        ...table,
        status: table.status as TableStatus,
        location: table.location as TableLocation
      })) as Table[];
    },
    enabled: !!restaurant?.id,
  });

  useEffect(() => {
    if (restaurant?.id && reservations) {
      const updateTableStatuses = async () => {
        // Reset all tables to available
        await supabase
          .from('tables')
          .update({ status: 'available' as TableStatus })
          .eq('restaurant_id', restaurant.id);

        // Update tables that have reservations
        for (const reservation of reservations) {
          if (reservation.table_number) {
            await supabase
              .from('tables')
              .update({ status: 'reserved' as TableStatus })
              .eq('name', reservation.table_number)
              .eq('restaurant_id', restaurant.id);
          }
        }
        
        refetchTables();
      };

      updateTableStatuses();
    }
  }, [restaurant?.id, reservations, selectedDate]);

  const filteredReservations = reservations?.filter((reservation) =>
    reservation.customer_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTableClick = (tableId: string) => {
    setSelectedTableId(tableId);
  };

  const handleAddTable = (location: TableLocation) => {
    setNewTableLocation(location);
    setIsAddTableDialogOpen(true);
  };

  const handlePreviousDay = () => {
    setSelectedDate(prev => subDays(prev, 1));
  };

  const handleNextDay = () => {
    setSelectedDate(prev => addDays(prev, 1));
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar con le prenotazioni */}
      <div className="w-96 border-r bg-gray-50/50 p-4 overflow-y-auto">
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Prenotazioni</h2>
          <div className="flex items-center gap-2 mb-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePreviousDay}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex-1 text-center font-medium">
              {format(selectedDate, "EEEE d MMMM yyyy", { locale: it })}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleNextDay}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cerca prenotazioni..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="space-y-2">
          {filteredReservations?.map((reservation) => (
            <ReservationCard 
              key={reservation.id} 
              reservation={reservation}
              onSuccess={refetchReservations}
              restaurantId={restaurant?.id || ""}
            />
          ))}
          {(!filteredReservations || filteredReservations.length === 0) && (
            <div className="text-center py-6 text-muted-foreground">
              Nessuna prenotazione trovata
            </div>
          )}
        </div>
      </div>

      {/* Area principale con il layout dei tavoli */}
      <div className="flex-1 p-6 overflow-y-auto">
        <TableLayout
          tables={tables || []}
          onTableClick={handleTableClick}
          onAddTable={handleAddTable}
          onDeleteTable={() => refetchTables()}
          refetchTables={refetchTables}
        />
      </div>

      <Button
        className="fixed bottom-6 right-6 shadow-lg"
        onClick={() => setIsAddDialogOpen(true)}
      >
        <Plus className="mr-2 h-4 w-4" />
        Nuova Prenotazione
      </Button>

      {restaurant && (
        <AddReservationDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          restaurantId={restaurant.id}
          onSuccess={() => {
            refetchReservations();
          }}
        />
      )}

      <ManageTableDialog
        open={selectedTableId !== null}
        onOpenChange={() => setSelectedTableId(null)}
        table={selectedTableId ? tables?.find(t => t.id === selectedTableId)! : null}
        onSuccess={() => {
          setSelectedTableId(null);
          refetchTables();
        }}
      />

      {restaurant && (
        <AddTableDialog
          open={isAddTableDialogOpen}
          onOpenChange={setIsAddTableDialogOpen}
          location={newTableLocation}
          restaurantId={restaurant.id}
          onSuccess={() => {
            setIsAddTableDialogOpen(false);
            setNewTableLocation(null);
            refetchTables();
          }}
        />
      )}
    </div>
  );
};