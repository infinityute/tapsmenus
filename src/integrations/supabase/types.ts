export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analytics: {
        Row: {
          average_meal_duration: number | null
          average_party_size: number | null
          cancellation_rate: number | null
          created_at: string
          date: string
          id: string
          most_ordered_category: string | null
          most_ordered_item: string | null
          notes: string | null
          peak_hour: string | null
          restaurant_id: string
          special_events: string[] | null
          total_covers: number | null
          total_reservations: number | null
          total_revenue: number | null
          updated_at: string
          weather_condition: string | null
        }
        Insert: {
          average_meal_duration?: number | null
          average_party_size?: number | null
          cancellation_rate?: number | null
          created_at?: string
          date: string
          id?: string
          most_ordered_category?: string | null
          most_ordered_item?: string | null
          notes?: string | null
          peak_hour?: string | null
          restaurant_id: string
          special_events?: string[] | null
          total_covers?: number | null
          total_reservations?: number | null
          total_revenue?: number | null
          updated_at?: string
          weather_condition?: string | null
        }
        Update: {
          average_meal_duration?: number | null
          average_party_size?: number | null
          cancellation_rate?: number | null
          created_at?: string
          date?: string
          id?: string
          most_ordered_category?: string | null
          most_ordered_item?: string | null
          notes?: string | null
          peak_hour?: string | null
          restaurant_id?: string
          special_events?: string[] | null
          total_covers?: number | null
          total_reservations?: number | null
          total_revenue?: number | null
          updated_at?: string
          weather_condition?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          icon_url: string | null
          id: string
          is_active: boolean | null
          name: string
          restaurant_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          restaurant_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon_url?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          restaurant_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      feedback: {
        Row: {
          category: string | null
          comment: string | null
          created_at: string
          customer_email: string | null
          customer_name: string | null
          id: string
          rating: number | null
          responded_at: string | null
          response: string | null
          restaurant_id: string
          status: string | null
          updated_at: string
        }
        Insert: {
          category?: string | null
          comment?: string | null
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          id?: string
          rating?: number | null
          responded_at?: string | null
          response?: string | null
          restaurant_id: string
          status?: string | null
          updated_at?: string
        }
        Update: {
          category?: string | null
          comment?: string | null
          created_at?: string
          customer_email?: string | null
          customer_name?: string | null
          id?: string
          rating?: number | null
          responded_at?: string | null
          response?: string | null
          restaurant_id?: string
          status?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "feedback_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      menu_items: {
        Row: {
          allergens: string[] | null
          availability: boolean | null
          calories: number | null
          category_id: string | null
          created_at: string
          description: string | null
          dietary_info: string[] | null
          discounted_price: number | null
          display_order: number | null
          id: string
          image_url: string | null
          ingredients: string[] | null
          is_featured: boolean | null
          is_seasonal: boolean | null
          menu_id: string
          name: string
          preparation_time: number | null
          price: number
          spiciness_level: number | null
          thumbnail_url: string | null
          updated_at: string
        }
        Insert: {
          allergens?: string[] | null
          availability?: boolean | null
          calories?: number | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          dietary_info?: string[] | null
          discounted_price?: number | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          ingredients?: string[] | null
          is_featured?: boolean | null
          is_seasonal?: boolean | null
          menu_id: string
          name: string
          preparation_time?: number | null
          price: number
          spiciness_level?: number | null
          thumbnail_url?: string | null
          updated_at?: string
        }
        Update: {
          allergens?: string[] | null
          availability?: boolean | null
          calories?: number | null
          category_id?: string | null
          created_at?: string
          description?: string | null
          dietary_info?: string[] | null
          discounted_price?: number | null
          display_order?: number | null
          id?: string
          image_url?: string | null
          ingredients?: string[] | null
          is_featured?: boolean | null
          is_seasonal?: boolean | null
          menu_id?: string
          name?: string
          preparation_time?: number | null
          price?: number
          spiciness_level?: number | null
          thumbnail_url?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "menu_items_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "menu_items_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
        ]
      }
      menus: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          end_date: string | null
          id: string
          is_active: boolean | null
          name: string
          restaurant_id: string
          start_date: string | null
          styles: Json | null
          type: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          restaurant_id: string
          start_date?: string | null
          styles?: Json | null
          type?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          restaurant_id?: string
          start_date?: string | null
          styles?: Json | null
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "menus_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      qr_codes: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          last_scanned_at: string | null
          location: string | null
          menu_id: string
          name: string | null
          qr_code_url: string
          restaurant_id: string
          scan_count: number | null
          table_number: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_scanned_at?: string | null
          location?: string | null
          menu_id: string
          name?: string | null
          qr_code_url: string
          restaurant_id: string
          scan_count?: number | null
          table_number?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          last_scanned_at?: string | null
          location?: string | null
          menu_id?: string
          name?: string | null
          qr_code_url?: string
          restaurant_id?: string
          scan_count?: number | null
          table_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "qr_codes_menu_id_fkey"
            columns: ["menu_id"]
            isOneToOne: false
            referencedRelation: "menus"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "qr_codes_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      reservations: {
        Row: {
          cancellation_reason: string | null
          cancelled_at: string | null
          confirmed_at: string | null
          created_at: string
          customer_email: string | null
          customer_name: string
          customer_phone: string | null
          guests: number
          id: string
          reminder_sent: boolean | null
          reservation_date: string
          restaurant_id: string
          special_requests: string | null
          status: string | null
          table_number: string | null
          updated_at: string
        }
        Insert: {
          cancellation_reason?: string | null
          cancelled_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          customer_email?: string | null
          customer_name: string
          customer_phone?: string | null
          guests: number
          id?: string
          reminder_sent?: boolean | null
          reservation_date: string
          restaurant_id: string
          special_requests?: string | null
          status?: string | null
          table_number?: string | null
          updated_at?: string
        }
        Update: {
          cancellation_reason?: string | null
          cancelled_at?: string | null
          confirmed_at?: string | null
          created_at?: string
          customer_email?: string | null
          customer_name?: string
          customer_phone?: string | null
          guests?: number
          id?: string
          reminder_sent?: boolean | null
          reservation_date?: string
          restaurant_id?: string
          special_requests?: string | null
          status?: string | null
          table_number?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "reservations_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      restaurants: {
        Row: {
          accepts_reservations: boolean | null
          address: string | null
          banner_url: string | null
          city: string | null
          country: string | null
          created_at: string
          cuisine_type: string | null
          delivery_available: boolean | null
          description: string | null
          email: string | null
          id: string
          logo_url: string | null
          name: string
          opening_hours: Json | null
          phone: string | null
          postal_code: string | null
          price_range: string | null
          rating: number | null
          state: string | null
          status: string | null
          takeout_available: boolean | null
          updated_at: string
          user_id: string
          website: string | null
        }
        Insert: {
          accepts_reservations?: boolean | null
          address?: string | null
          banner_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          cuisine_type?: string | null
          delivery_available?: boolean | null
          description?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name: string
          opening_hours?: Json | null
          phone?: string | null
          postal_code?: string | null
          price_range?: string | null
          rating?: number | null
          state?: string | null
          status?: string | null
          takeout_available?: boolean | null
          updated_at?: string
          user_id: string
          website?: string | null
        }
        Update: {
          accepts_reservations?: boolean | null
          address?: string | null
          banner_url?: string | null
          city?: string | null
          country?: string | null
          created_at?: string
          cuisine_type?: string | null
          delivery_available?: boolean | null
          description?: string | null
          email?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          opening_hours?: Json | null
          phone?: string | null
          postal_code?: string | null
          price_range?: string | null
          rating?: number | null
          state?: string | null
          status?: string | null
          takeout_available?: boolean | null
          updated_at?: string
          user_id?: string
          website?: string | null
        }
        Relationships: []
      }
      special_offers: {
        Row: {
          conditions: string | null
          created_at: string
          description: string | null
          discount_type: string | null
          discount_value: number | null
          end_date: string | null
          id: string
          is_active: boolean | null
          name: string
          restaurant_id: string
          start_date: string | null
          updated_at: string
          usage_count: number | null
          usage_limit: number | null
        }
        Insert: {
          conditions?: string | null
          created_at?: string
          description?: string | null
          discount_type?: string | null
          discount_value?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          restaurant_id: string
          start_date?: string | null
          updated_at?: string
          usage_count?: number | null
          usage_limit?: number | null
        }
        Update: {
          conditions?: string | null
          created_at?: string
          description?: string | null
          discount_type?: string | null
          discount_value?: number | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          restaurant_id?: string
          start_date?: string | null
          updated_at?: string
          usage_count?: number | null
          usage_limit?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "special_offers_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_invitations: {
        Row: {
          accepted_at: string | null
          access_code: string
          created_at: string
          email: string
          id: string
          restaurant_id: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
        }
        Insert: {
          accepted_at?: string | null
          access_code: string
          created_at?: string
          email: string
          id?: string
          restaurant_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Update: {
          accepted_at?: string | null
          access_code?: string
          created_at?: string
          email?: string
          id?: string
          restaurant_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "staff_invitations_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      staff_members: {
        Row: {
          created_at: string
          id: string
          is_active: boolean | null
          restaurant_id: string | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          restaurant_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean | null
          restaurant_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "staff_members_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
      tables: {
        Row: {
          capacity: number
          created_at: string
          id: string
          location: string
          name: string
          restaurant_id: string
          status: string
          updated_at: string
        }
        Insert: {
          capacity: number
          created_at?: string
          id?: string
          location: string
          name: string
          restaurant_id: string
          status?: string
          updated_at?: string
        }
        Update: {
          capacity?: number
          created_at?: string
          id?: string
          location?: string
          name?: string
          restaurant_id?: string
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tables_restaurant_id_fkey"
            columns: ["restaurant_id"]
            isOneToOne: false
            referencedRelation: "restaurants"
            referencedColumns: ["id"]
          },
        ]
      }
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
          p_table_number?: string
          p_location?: string
        }
        Returns: undefined
      }
      set_claim: {
        Args: {
          name: string
          value: string
        }
        Returns: undefined
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
      user_role: "admin" | "manager" | "waiter"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
