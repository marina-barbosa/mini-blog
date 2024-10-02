import db from "../firebase/config"
import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut, signInWithEmailAndPassword } from "firebase/auth"

import { useState, useEffect } from "react"

export const useAuthentication = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  //clean up, deal with memory leak
  const [cancelled, setCancelled] = useState(false)
  // getAuth() inicializa e retorna a instância de autenticação do Firebase para o aplicativo.
  // Ela fornece acesso a métodos de autenticação, como login, logout e criação de usuários.
  const auth = getAuth()

  function checkIfIsCancelled() {
    if (cancelled) {
      return
    }
  }

  // Register
  // Função para criar um novo usuário no Firebase Authentication
  async function createUser(data) {
    checkIfIsCancelled()
    setLoading(true)
    setError(null)
    try {
      // createUserWithEmailAndPassword é uma função do Firebase que cria um novo usuário
      // com o e-mail e senha fornecidos. Ela retorna uma promessa que, quando resolvida,
      // retorna o objeto do usuário criado.
      const result = await createUserWithEmailAndPassword(
        auth, // Instância de autenticação (auth) obtida pelo getAuth()
        data.email,
        data.password
      )
      // updateProfile é uma função do Firebase que permite atualizar informações
      // do perfil do usuário logado, como o displayName.
      await updateProfile(auth.currentUser, { displayName: data.displayName })
      // auth.currentUser retorna o usuário atual autenticado. Se o usuário acabou de ser criado,
      // ele está disponível em auth.currentUser, e a função updateProfile é usada para
      // atualizar o nome de exibição (displayName) do usuário com o valor fornecido.
      setLoading(false)
      return result
    } catch (error) {
      let systemErrorMessage

      if (error.message.includes("Password")) {
        systemErrorMessage = "A senha deve ter pelo menos 6 caracteres."
      } else if (error.message.includes("email-already")) {
        systemErrorMessage = "E-mail já cadastrado."
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
      }
      setError(systemErrorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Logout
  const logout = () => {
    checkIfIsCancelled()
    signOut(auth)
    console.log("saiu?")
    console.log(auth)
  }

  // login
  const login = async (data) => {
    checkIfIsCancelled()
    setLoading(true)
    setError(null)
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      console.log(auth.currentUser.displayName)
    } catch (error) {
      let systemErrorMessage
      if (error.message.includes("invalid-credential")) {
        systemErrorMessage = "Senha e/ou email inválido."
      } else {
        systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
      }
      setError(systemErrorMessage)
    } finally {
      setLoading(false)
    }
  }

  // useEffect que realiza um "clean-up" ao desmontar o componente, prevenindo memory leaks
  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return {
    auth,         // Retorna a instância de autenticação para uso em outros componentes
    createUser,   // Função para criação de novos usuários
    error,        // Estado de erro para exibir mensagens de erro
    loading,      // Estado de carregamento para exibir feedback ao usuário
    logout,
    login,
  }
}