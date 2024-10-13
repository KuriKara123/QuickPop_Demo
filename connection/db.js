import { createClient } from 'https://cdn.skypack.dev/@supabase/supabase-js';

const SUPABASE_URL = 'https://jkcdmshyhsxzjptenoyu.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprY2Rtc2h5aHN4empwdGVub3l1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjczNTgxODAsImV4cCI6MjA0MjkzNDE4MH0.Fxn0MKSaMH-kgWi3J2ITVAxs5qibJiG2zGyjhgcC0ys'

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

export default supabase