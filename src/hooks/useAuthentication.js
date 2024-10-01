import { getAuth, createUserWithEmailAndPassword, updateProfile, signOut } from "firebase/auth"

import { useState, useEffect } from "react"

export const useAuthentication = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  //clean up, deal with memory leak
  const [cancelled, setCancelled] = useState(false)
  const auth = getAuth()

  function checkIfIsCancelled() {
    if (cancelled) {
      return
    }
  }

  async function createUser(data) {
    checkIfIsCancelled()
    setLoading(true)
    setError(null)
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      await updateProfile(auth.currentUser, { displayName: data.displayName })
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

  useEffect(() => {
    return () => setCancelled(true)
  }, [])

  return {
    auth,
    createUser,
    error,
    loading,
  }
}