import { useState, useEffect } from "react";
import db from "../firebase/config";
import { doc, getDoc } from "firebase/firestore"

export const useFetchDocument = (docCollection, id) => {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setloading] = useState(null)
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {

    async function loadDocument() {
      if (cancelled) return

      setloading(true)

      try {
        const docRef = await doc(db, docCollection, id)
        const docSnap = await getDoc(docRef)

        setDocument(docSnap.data())

      } catch (error) {
        setError(error.message)
      } finally {
        setloading(false)
      }
    }

    loadDocument()

  }, [docCollection, id, cancelled])

  useEffect(() => {
    setCancelled(true)
    return () => setCancelled(false)
  }, [])

  return { document, error, loading }
}