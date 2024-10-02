import { useState, useEffect } from "react"
import { useAuthentication } from "../../hooks/useAuthentication"
export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const { login, error: authError, loading } = useAuthentication()
  const handleSubmit = async (e) => {
    e.preventDefault()

    setError("")

    const user = {
      email,
      password,
    }

    await login(user)
  }

  useEffect(() => {
    if (authError) {
      setError(authError)
    }
  }, [authError])

  return (
    <div className="mx-auto md:w-2/5 text-center">
      <h1 className="text-2xl font-bold">Entrar</h1>
      <p>Faça o login para poder compartilhar suas histórias</p>
      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6 mt-11">

        {/* Email */}
        <div className="relative">
          <input
            id="email"
            placeholder="isaac@example.com"
            className="peer h-10 w-full border-b-2 border-gray-300 text-black bg-transparent placeholder-transparent focus:outline-none focus:border-black"
            type="email" name="email" required value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
          <label
            htmlFor="email"
            className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm cursor-pointer"
          >Email</label>
        </div>
        {/* Senha */}
        <div className="relative">
          <input
            id="password"
            placeholder="Password"
            className="peer h-10 w-full border-b-2 border-gray-300 text-black bg-transparent placeholder-transparent focus:outline-none focus:border-black"
            type="password" name="password" required value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            htmlFor="password"
            className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm cursor-pointer"
          >Senha</label>
        </div>

        {/* Button */}
        {!loading && <button type="submit" className="btn-primary">Entrar</button>}
        {loading && <button type="submit" disabled>Aguarde...</button>}
        {error && <p className="error">{error}</p>}
      </form>

    </div>
  )
}