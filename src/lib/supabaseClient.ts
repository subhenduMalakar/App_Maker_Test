import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lornvdolbvxxovlionqr.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxvcm52ZG9sYnZ4eG92bGlvbnFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyNjU0OTUsImV4cCI6MjA2MTg0MTQ5NX0.qlq_b9B3TfrZKisb0Q6xeozzB6IdaXvuIAymsGxAFnI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);