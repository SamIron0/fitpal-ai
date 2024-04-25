import { createClient } from "@/lib/supabase/server"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Dash from "@/components/adminDashboard/dash"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { urlExists } from "@/db/recipes"
import axios from "axios"
import { TablesInsert } from "@/supabase/types"
import { v4 as uuidv4 } from "uuid"
import { cookies } from "next/headers"

export default async function Dashboard() {
  //const { subscription } = useContext(ChatbotUIContext)
  const supabase = createClient(cookies())
  const {
    data: { user }
  } = await supabase.auth.getUser()

  const session = (await supabase.auth.getSession()).data.session
  if (session?.user.email !== "ekaronke@gmail.com") {
    console.log("session", session?.user.email)
    return redirect("/")
  }

  const onScrapeUrl = async (formData: FormData) => {
    const url = formData.get("url") as string
    const status = await urlExists(url)
    if (status) {
      toast.error("Invalid exists")
      return
    }
    const toastId = toast.loading("Scraping")

    var endpoint =
      " https://7a38-2604-3d09-aa7a-95e0-9ddf-5d76-dfb9-fa06.ngrok-free.app/scrape"

    try {
      var result = await axios.post(endpoint, {
        url: url
      })
      const data = result.data.body
      const recipe: TablesInsert<"recipes"> = {
        id: uuidv4(),
        name: data.name,
        description: data.description,
        ingredients: data.ingredients,
        imgurl: data.imgurl,
        protein: data.protein,
        fats: data.fats,
        carbs: data.carbs,
        calories: data.calories,
        instructions: data.instructions,
        portions: data.portions,
        cooking_time: data.cooking_time,
        url: url
      }
      toast.dismiss(toastId)
      const toastId2 = toast.loading("Saving Recipe")
      // call api to create recipe
      var response = await fetch("api/recipe/create_recipe", {
        method: "POST",
        body: JSON.stringify({ recipe: recipe, tags: data.tags })
      })

      toast.dismiss(toastId2)

      toast.success("Saving Created!")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form
      className="flex w-full flex-1 flex-col justify-center gap-2 text-foreground animate-in"
      action={onScrapeUrl}
    >
      <div className="my-12 flex w-full flex-col items-center p-4">
        <Input name="url" placeholder={"url"} style={{ fontSize: "16px" }} />
        <Button formAction={onScrapeUrl} className="mt-6">
          Scrape
        </Button>
      </div>
    </form>
  )
}
