import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://ougcxkskjugfypbxmqzx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91Z2N4a3NranVnZnlwYnhtcXp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2OTAxMDcsImV4cCI6MjA1MjI2NjEwN30.MbXt5ZpY7r2xmnWOO6-N9sAj4K1qO94LqBjTnfDAqzc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
