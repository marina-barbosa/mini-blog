
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthValue } from "../context/AuthContext"
import { useFetchDocument } from "../hooks/useFetchDocument"
import { useUpdateDocument } from "../hooks/useUpdateDocument"

export const EditPost = () => {
  const { id } = useParams()
  const { document: post } = useFetchDocument("posts", id)
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")
  const { updateDocument, response } = useUpdateDocument("posts")
  const { currentUser } = useAuthValue()
  const navigate = useNavigate()

  useEffect(() => {
    if (post) {
      setTitle(post.title)
      setImage(post.image)
      setBody(post.body)
      const textTags = post.tagsArray.join(", ")
      setTags(textTags)
    }
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormError("")

    // validate URL img
    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa ser uma URL.")
    }
    // criar array de tags
    const tagsArray = tags.split(",").map(tag => tag.trim().toLowerCase())

    // check todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!")
    }

    if (formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: currentUser.uid,
      createdBy: currentUser.displayName
    }

    updateDocument(id, data)

    // redirect to dashboard page
    navigate("/dashboard")
  }

  return (
    <div className="mx-auto md:w-2/5 text-center">
      {post && (
        <>
          <h2 className="text-3xl font-bold mb-5">Editar post</h2>
          <p>Altere os dados do post como desejar</p>

          <form onSubmit={handleSubmit} className="space-y-6 mt-11">

            {/* Title */}
            <div className="relative">
              <input
                id="title"
                placeholder="Pense em um bom título..."
                className="peer h-10 w-full border-b-2 border-gray-300 text-black bg-transparent placeholder-transparent focus:outline-none focus:border-black"
                type="text" name="title" required value={title}
                onChange={(e) => setTitle(e.target.value)}

              />
              <label
                htmlFor="title"
                className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm cursor-pointer"
              >Título</label>
            </div>

            {/* URL img */}
            <div className="relative">
              <input
                id="image"
                placeholder="Insira uma imagem que represente o post"
                className="peer h-10 w-full border-b-2 border-gray-300 text-black bg-transparent placeholder-transparent focus:outline-none focus:border-black"
                type="text" name="image" required value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <label
                htmlFor="image"
                className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm cursor-pointer"
              >URL da Imagem</label>
            </div>
            <p>Preview da imagem atual:</p>
            <img src={post.image} alt={post.title} />

            {/* Body */}
            <div className="relative">
              <textarea
                id="body"
                placeholder="Escreva o conteúdo do seu post"
                className="peer h-10 w-full border-b-2 border-gray-300 text-black bg-transparent placeholder-transparent focus:outline-none focus:border-black"
                rows={3}
                type="text" name="body" required value={body}
                onChange={(e) => setBody(e.target.value)}
              />
              <label
                htmlFor="body"
                className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm cursor-pointer"
              >Conteúdo</label>
            </div>

            {/* tags */}
            <div className="relative">
              <input
                id="tags"
                placeholder="Insira as tags separadas por vírgula"
                className="peer h-10 w-full border-b-2 border-gray-300 text-black bg-transparent placeholder-transparent focus:outline-none focus:border-black"
                type="text" name="tags" required value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
              <label
                htmlFor="tags"
                className="absolute left-0 -top-3.5 text-gray-400 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-black peer-focus:text-sm cursor-pointer"
              >Tags</label>
            </div>

            {/* Button */}
            {!response.loading && <button type="submit" className="btn-primary">Salvar</button>}
            {response.loading && <button type="submit" disabled>Aguarde...</button>}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  )
}