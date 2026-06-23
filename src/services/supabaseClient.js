import { createClient } from "@supabase/supabase-js"

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://ryixcggxaykppnzbixqp.supabase.co"
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "sb_publishable_XrFXaiOpr_JELrmBKo0E8Q_m-KLFPwB"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
