import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const SUPABASE_URL = "https://mmuowdemjeimjwxmngmg.supabase.co"
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1tdW93ZGVtamVpbWp3eG1uZ21nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ0NDY1MTUsImV4cCI6MjA1MDAyMjUxNX0.J2IqxuQPxyavb7dhZluYLkKcoegq2WIj0KOGW9Inv7Q"

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY)