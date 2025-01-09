import type {
  AnalyticsTable,
  CategoriesTable,
  FeedbackTable,
  MenuItemsTable,
  MenusTable,
  ProfilesTable,
  QRCodesTable,
  ReservationsTable,
  RestaurantsTable,
  SpecialOffersTable
} from './tables';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      analytics: AnalyticsTable
      categories: CategoriesTable
      feedback: FeedbackTable
      menu_items: MenuItemsTable
      menus: MenusTable
      profiles: ProfilesTable
      qr_codes: QRCodesTable
      reservations: ReservationsTable
      restaurants: RestaurantsTable
      special_offers: SpecialOffersTable
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_daily_analytics: {
        Args: {
          p_restaurant_id: string
          p_date: string
        }
        Returns: {
          total_reservations: number
          total_covers: number
          total_revenue: number
          most_ordered_item: string
          most_ordered_category: string
          notes: string
          notifications: Json
        }[]
      }
      get_most_ordered_items: {
        Args: {
          p_restaurant_id: string
          p_start_date: string
          p_end_date: string
          p_limit?: number
        }
        Returns: {
          item_name: string
          order_count: number
        }[]
      }
      get_reservation_stats: {
        Args: {
          p_restaurant_id: string
          p_start_date: string
          p_end_date: string
        }
        Returns: {
          total_reservations: number
          total_covers: number
          total_revenue: number
        }[]
      }
      increment_qr_scan_count: {
        Args: {
          p_menu_id: string
          p_table_number?: string | null
          p_location?: string | null
        }
        Returns: void
      }
      upsert_daily_analytics: {
        Args: {
          p_restaurant_id: string
          p_date: string
          p_total_orders: number
          p_total_covers: number
          p_total_revenue: number
          p_most_ordered_item?: string
          p_most_ordered_category?: string
          p_notes?: string
        }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}