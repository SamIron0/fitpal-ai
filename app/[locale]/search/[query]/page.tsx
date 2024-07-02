export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>
}
export async function generateStaticParams() {
  //const posts = await fetch('https://.../posts').then((res) => res.json())
 const posts= [ { slug: "1" }, { slug: "2" }, { slug: "3" } ]
  return posts.map((post: any) => ({
    query: post.slug,
  }))
}