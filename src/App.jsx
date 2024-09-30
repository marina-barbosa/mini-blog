import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Home } from "./pages/home/home"
import { About } from "./pages/about/about"
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"

function App() {

  return (

    <div className="font-urbanist antialiased text-gray-600 flex flex-col min-h-screen">
      <BrowserRouter>
        <Navbar />
        <main className="flex flex-grow">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/about" element={<About />} />
            <Route path="*" element={() => <Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
