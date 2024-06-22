import { createClient } from "@/lib/supabase/server"
import { TablesInsert, TablesUpdate } from "@/supabase/types"
import { cookies } from "next/headers"

const cookieStore = cookies()
const supabase = createClient(cookieStore)
