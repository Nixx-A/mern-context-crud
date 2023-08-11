import HomePage from "./pages/HomePage.jsx";
import PostForm from "./pages/PostForm.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PostsProvider } from "./context/postContext.jsx";
import { Toaster } from "react-hot-toast";

export default function App () {
  return (
    <BrowserRouter>
      <div className="bg-neutral-900 min-h-screen flex items-center">
        <div className="px-10 container m-auto py-4">
          <PostsProvider>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/new" element={<PostForm />} />
              <Route path="/posts/:id" element={<PostForm />} />
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
            <Toaster />
          </PostsProvider>
        </div>
      </div>
    </BrowserRouter>
  )
}
