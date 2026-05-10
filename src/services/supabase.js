import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lcskffgunqrnshkqyhtg.supabase.co'
const supabaseKey = 'sb_publishable_h-yH_PpCVo8AbEJrMSzoKA_-7hJDnBs'  // ← вставь свой anon key

export const supabase = createClient(supabaseUrl, supabaseKey)