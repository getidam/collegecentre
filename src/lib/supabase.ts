import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://nwzgthsmmimjtgnpqqjf.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53emd0aHNtbWltanRnbnBxcWpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc1NTQyNjksImV4cCI6MjEwMzEzMDI2OX0.E-RLnhI1O6zD-DBpDgw-DG0Xv9CpG6RE9m6axVSf2cc';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);