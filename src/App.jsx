import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Home } from "./pages/home/home"
import { About } from "./pages/about/about"
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"
import { Register } from "./pages/register/register"
import { Login } from "./pages/login/login"

import { AuthProvider } from "./context/AuthContext"

function App() {

  return (
    <div className="font-urbanist antialiased bg-gray-100 text-gray-600 flex flex-col min-h-screen">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <main className="flex flex-grow p-8">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/about" element={<About />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route path="*" element={() => <Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
