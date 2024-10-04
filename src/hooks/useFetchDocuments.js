import { useState, useEffect } from "react";
import db from "../firebase/config";
import { collection, query, orderBy, onSnapshot, where, QuerySnapshot } from "firebase/firestore"

export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setloading] = useState(null)
  const [cancelled, setCancelled] = useState(false)

  useEffect(() => {

    async function loadData() {
      if (cancelled) return

      setloading(true)

      const collectionRef = await collection(db, docCollection)

      try {
        let q

        if (search) {
          q = await query(
            collectionRef,
            where("tagsArray", "array-contains", search),
            orderBy("createdAt", "desc")
          )
        } else {
          q = await query(
            collectionRef,
            orderBy("createdAt", "desc")
          )
        }


        await onSnapshot(q, (QuerySnapshot) => {
          setDocuments(
            QuerySnapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }))
          )
        })

        setloading(false)
      } catch (error) {
        console.group(error)
        setError(error.message)
        setloading(false)
      }
    }

    loadData()

  }, [docCollection, documents, search, uid, cancelled])

  useEffect(() => {
    setCancelled(true)
    return () => setCancelled(false)
  }, [])

  return { documents, error, loading }
}