import Pagination from "./components/Pagination";

export default function Home() {
  return (
      <Pagination currentPage={1} itemCount={100} pageSize={5}/>
  )
}
