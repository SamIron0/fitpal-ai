export default function Page({ params }: { params: { query: string } }) {
  return <div>My Post: {params.query}</div>
}