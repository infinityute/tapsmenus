import { Json } from './database'

export interface AnalyticsTable {
  Row: {
    id: string
    restaurant_id: string
    date: string
    total_reservations: number | null
    total_covers: number | null
    total_revenue: number | null
    average_party_size: number | null
    peak_hour: string | null
    most_ordered_item: string | null
    most_ordered_category: string | null
    cancellation_rate: number | null
    average_meal_duration: number | null
    weather_condition: string | null
    special_events: string[] | null
    notes: string | null
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: string
    restaurant_id: string
    date: string
    total_reservations?: number | null
    total_covers?: number | null
    total_revenue?: number | null
    average_party_size?: number | null
    peak_hour?: string | null
    most_ordered_item?: string | null
    most_ordered_category?: string | null
    cancellation_rate?: number | null
    average_meal_duration?: number | null
    weather_condition?: string | null
    special_events?: string[] | null
    notes?: string | null
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    restaurant_id?: string
    date?: string
    total_reservations?: number | null
    total_covers?: number | null
    total_revenue?: number | null
    average_party_size?: number | null
    peak_hour?: string | null
    most_ordered_item?: string | null
    most_ordered_category?: string | null
    cancellation_rate?: number | null
    average_meal_duration?: number | null
    weather_condition?: string | null
    special_events?: string[] | null
    notes?: string | null
    created_at?: string
    updated_at?: string
  }
}

export interface CategoriesTable {
  Row: {
    id: string
    restaurant_id: string
    name: string
    description: string | null
    display_order: number | null
    is_active: boolean | null
    icon_url: string | null
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: string
    restaurant_id: string
    name: string
    description?: string | null
    display_order?: number | null
    is_active?: boolean | null
    icon_url?: string | null
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    restaurant_id?: string
    name?: string
    description?: string | null
    display_order?: number | null
    is_active?: boolean | null
    icon_url?: string | null
    created_at?: string
    updated_at?: string
  }
}

export interface FeedbackTable {
  Row: {
    id: string
    restaurant_id: string
    customer_name: string | null
    customer_email: string | null
    category: string | null
    comment: string | null
    rating: number | null
    status: string | null
    responded_at: string | null
    response: string | null
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: string
    restaurant_id: string
    customer_name?: string | null
    customer_email?: string | null
    category?: string | null
    comment?: string | null
    rating?: number | null
    status?: string | null
    responded_at?: string | null
    response?: string | null
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    restaurant_id?: string
    customer_name?: string | null
    customer_email?: string | null
    category?: string | null
    comment?: string | null
    rating?: number | null
    status?: string | null
    responded_at?: string | null
    response?: string | null
    created_at?: string
    updated_at?: string
  }
}

export interface MenuItemsTable {
  Row: {
    id: string
    menu_id: string
    name: string
    description: string | null
    price: number
    image_url: string | null
    allergens: string[] | null
    availability: boolean | null
    calories: number | null
    category_id: string | null
    dietary_info: string[] | null
    discounted_price: number | null
    display_order: number | null
    is_featured: boolean | null
    is_seasonal: boolean | null
    preparation_time: number | null
    spiciness_level: number | null
    thumbnail_url: string | null
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: string
    menu_id: string
    name: string
    description?: string | null
    price: number
    image_url?: string | null
    allergens?: string[] | null
    availability?: boolean | null
    calories?: number | null
    category_id?: string | null
    dietary_info?: string[] | null
    discounted_price?: number | null
    display_order?: number | null
    is_featured?: boolean | null
    is_seasonal?: boolean | null
    preparation_time?: number | null
    spiciness_level?: number | null
    thumbnail_url?: string | null
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    menu_id?: string
    name?: string
    description?: string | null
    price?: number
    image_url?: string | null
    allergens?: string[] | null
    availability?: boolean | null
    calories?: number | null
    category_id?: string | null
    dietary_info?: string[] | null
    discounted_price?: number | null
    display_order?: number | null
    is_featured?: boolean | null
    is_seasonal?: boolean | null
    preparation_time?: number | null
    spiciness_level?: number | null
    thumbnail_url?: string | null
    created_at?: string
    updated_at?: string
  }
}

export interface MenusTable {
  Row: {
    id: string
    restaurant_id: string
    name: string
    description: string | null
    display_order: number | null
    is_active: boolean | null
    start_date: string | null
    end_date: string | null
    type: string | null
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: string
    restaurant_id: string
    name: string
    description?: string | null
    display_order?: number | null
    is_active?: boolean | null
    start_date?: string | null
    end_date?: string | null
    type?: string | null
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    restaurant_id?: string
    name?: string
    description?: string | null
    display_order?: number | null
    is_active?: boolean | null
    start_date?: string | null
    end_date?: string | null
    type?: string | null
    created_at?: string
    updated_at?: string
  }
}

export interface ProfilesTable {
  Row: {
    id: string
    created_at: string
    updated_at: string
  }
  Insert: {
    id: string
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    created_at?: string
    updated_at?: string
  }
}

export interface QRCodesTable {
  Row: {
    id: string
    restaurant_id: string
    menu_id: string
    name: string | null
    description: string | null
    qr_code_url: string
    scan_count: number | null
    last_scanned_at: string | null
    table_number: string | null
    location: string | null
    is_active: boolean | null
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: string
    restaurant_id: string
    menu_id: string
    name?: string | null
    description?: string | null
    qr_code_url: string
    scan_count?: number | null
    last_scanned_at?: string | null
    table_number?: string | null
    location?: string | null
    is_active?: boolean | null
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    restaurant_id?: string
    menu_id?: string
    name?: string | null
    description?: string | null
    qr_code_url?: string
    scan_count?: number | null
    last_scanned_at?: string | null
    table_number?: string | null
    location?: string | null
    is_active?: boolean | null
    created_at?: string
    updated_at?: string
  }
}

export interface ReservationsTable {
  Row: {
    id: string
    restaurant_id: string
    customer_name: string
    customer_email: string | null
    customer_phone: string | null
    guests: number
    reservation_date: string
    status: string | null
    special_requests: string | null
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: string
    restaurant_id: string
    customer_name: string
    customer_email?: string | null
    customer_phone?: string | null
    guests: number
    reservation_date: string
    status?: string | null
    special_requests?: string | null
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    restaurant_id?: string
    customer_name?: string
    customer_email?: string | null
    customer_phone?: string | null
    guests?: number
    reservation_date?: string
    status?: string | null
    special_requests?: string | null
    created_at?: string
    updated_at?: string
  }
}

export interface RestaurantsTable {
  Row: {
    id: string
    user_id: string
    name: string
    email: string | null
    address: string | null
    city: string | null
    state: string | null
    country: string | null
    postal_code: string | null
    phone: string | null
    website: string | null
    logo_url: string | null
    banner_url: string | null
    description: string | null
    cuisine_type: string | null
    delivery_available: boolean | null
    takeout_available: boolean | null
    accepts_reservations: boolean | null
    opening_hours: Json | null
    created_at: string
    updated_at: string
  }
  Insert: {
    id?: string
    user_id: string
    name: string
    email?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    website?: string | null
    logo_url?: string | null
    banner_url?: string | null
    description?: string | null
    cuisine_type?: string | null
    delivery_available?: boolean | null
    takeout_available?: boolean | null
    accepts_reservations?: boolean | null
    opening_hours?: Json | null
    created_at?: string
    updated_at?: string
  }
  Update: {
    id?: string
    user_id?: string
    name?: string
    email?: string | null
    address?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    postal_code?: string | null
    phone?: string | null
    website?: string | null
    logo_url?: string | null
    banner_url?: string | null
    description?: string | null
    cuisine_type?: string | null
    delivery_available?: boolean | null
    takeout_available?: boolean | null
    accepts_reservations?: boolean | null
    opening_hours?: Json | null
    created_at?: string
    updated_at?: string
  }
}

export interface SpecialOffersTable {
  Row: {
    id: string
    restaurant_id: string
    name: string
    description: string | null
    discount_type: string | null
    discount_value: number | null
    conditions: string | null
    start_date: string | null
    end_date: string | null
    is_active: boolean | null
    created_at: string
    updated_at: string
    usage_count: number | null
    usage_limit: number | null
  }
  Insert: {
    id?: string
    restaurant_id: string
    name: string
    description?: string | null
    discount_type?: string | null
    discount_value?: number | null
    conditions?: string | null
    start_date?: string | null
    end_date?: string | null
    is_active?: boolean | null
    created_at?: string
    updated_at?: string
    usage_count?: number | null
    usage_limit?: number | null
  }
  Update: {
    id?: string
    restaurant_id?: string
    name?: string
    description?: string | null
    discount_type?: string | null
    discount_value?: number | null
    conditions?: string | null
    start_date?: string | null
    end_date?: string | null
    is_active?: boolean | null
    created_at?: string
    updated_at?: string
    usage_count?: number | null
    usage_limit?: number | null
  }
}
