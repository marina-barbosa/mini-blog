import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { Home } from "./pages/home/home"
import { About } from "./pages/about/about"
import { Navbar } from "./components/navbar"
import { Footer } from "./components/footer"
import { Register } from "./pages/register/register"
import { Login } from "./pages/login/login"
import { onAuthStateChanged } from "firebase/auth"

import { useState, useEffect } from "react"
import { useAuthentication } from "./hooks/useAuthentication"

import { AuthProvider } from "./context/AuthContext"

function App() {

  const [currentUser, setCurrentUser] = useState(undefined)
  // Função onAuthStateChanged do Firebase monitorar mudanças na autenticação do usuário
  // Obtém o objeto 'auth' do hook 'useAuthentication', que será usado para verificar o estado de autenticação
  const { auth } = useAuthentication()

  const loadingUser = currentUser === undefined
  // useEffect para monitorar as mudanças no estado de autenticação.
  // Quando o componente é montado ou o valor de 'auth' muda, ele chama 'onAuthStateChanged'
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      // Atualiza o estado 'user' com as informações do usuário logado, ou null se não estiver logado
      setCurrentUser(currentUser)
    })
  }, [auth])

  if (loadingUser) {
    return (
      <p>Carregando...</p> // TODO: add gif de carregamento
    )
  }
  // else
  return (
    <div className="font-urbanist antialiased bg-gray-100 text-gray-600 flex flex-col min-h-screen">
      <AuthProvider value={{ currentUser }}>
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
