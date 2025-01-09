export type TableStatus = "available" | "reserved" | "on-dine";
export type TableLocation = "indoor" | "outdoor";

export interface Table {
  id: string;
  restaurant_id: string;
  name: string;
  capacity: number;
  status: TableStatus;
  location: TableLocation;
  created_at: string;
  updated_at: string;
}