import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://raytbdubibpcmvufdhwc.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJheXRiZHViaWJwY212dWZkaHdjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI4MjcyMzksImV4cCI6MjAyODQwMzIzOX0.rXhvqSnM401x7opqApAGAhqE6ozDJtP4JdPKAgYQtT0'
export const supabase = createClient(supabaseUrl, supabaseKey)
