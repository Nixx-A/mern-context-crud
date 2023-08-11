import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="text-white flex items-center justify-center flex-col gap-2">
  <p className="text-2xl ">Not Found Page</p>
  <Link className="bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500" to='/'>Go home</Link>
    </div>
  )
}
