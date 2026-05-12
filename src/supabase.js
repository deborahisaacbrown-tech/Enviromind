import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://akgatibolriexmgqsdek.supabase.co'
const supabaseKey = 'sb_publishable_D_GhnKtyhfx7s1SVq4pWsg_3ti2bV4b'

export const supabase = createClient(supabaseUrl, supabaseKey)