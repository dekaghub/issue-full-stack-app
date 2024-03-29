import Pagination from "./components/Pagination";

export default function Home({searchParams}: { page: string}) {
  return (
      <Pagination currentPage={parseInt(searchParams.page)} itemCount={100} pageSize={5}/>
  )
}
