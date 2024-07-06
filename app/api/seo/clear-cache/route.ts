export async function DELETE(request: Request) {
  if (request.method !== "DELETE") {
    return new Response("Method not allowed", { status: 405 })
  }

  try {
    const renderPromise = await fetch(
      "https://fitpal-search.onrender.com/clear_cache",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }
    ).then(response => response.json())

    return new Response(JSON.stringify({ renderPromise }))
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: error }))
  }
}
