import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default async function Dashboard() {
  //const { subscription } = useContext(ChatbotUIContext)
  const supabase = createClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()
  if (user?.id !== "cedf4e14-0575-466b-83bf-ce744196e023") {
    return
  }
  //const [url, setURL] = useState("")
  const scrapeUrl = async () => {
    //const url = formData.get("url")
    // const res = await fetch(`/api/scrape?url=${url}`)
    //const data = await res.json()
    //console.log(url)
  }
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      {" "}
      <Input onChange={() => {}} placeholder={"url"} />
      <Button onClick={scrapeUrl}>Submit</Button>
    </div>
  )
}
