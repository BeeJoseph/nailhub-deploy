import { createClient } from '@supabase/supabase-js'

const URL = 'https://thhjjcybmlrzfcpugljg.supabase.co'
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRoaGpqY3libWxyemZjcHVnbGpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1OTgyNDksImV4cCI6MjA5MzE3NDI0OX0.80mTA13uM300ofWYUuntJPzcGQPEVkWOUeddkQQz6jI'

export const supabase = createClient(URL, API_KEY)