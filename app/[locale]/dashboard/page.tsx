import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Dash from "@/components/dashboard/dash"

export default async function Dashboard() {
  //const { subscription } = useContext(ChatbotUIContext)
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  /*if (user?.id !== "cedf4e14-0575-466b-83bf-ce744196e023") {
    return
  }*/
  //const [url, setURL] = useState("")

  return (
    <div className="flex">
      <Dash />
    </div>
  )
}
