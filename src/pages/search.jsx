
import { useFetchDocuments } from "../hooks/useFetchDocuments"
import { useQuery } from "../hooks/useQuery"
import { PostDetail } from "../components/postDetail"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

export const Search = () => {
  const query = useQuery()
  const search = query.get("q")
  const { documents: posts } = useFetchDocuments("posts", search)
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    if (searchQuery) {
      // Redireciona para a mesma página, mas substitui o parâmetro de consulta corretamente
      navigate(`/search?q=${searchQuery}`);
      window.location.reload(); // recarrega a pagina
    }
  }

  return (
    <div className="mx-auto text-center space-y-6 w-full max-w-[600px]">
      <h2 className="text-2xl font-bold">Search</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input type="text" placeholder="Buscar por tags..."
            value={searchQuery} // Usa o estado controlado para o valor do input
            onChange={(e) => setSearchQuery(e.target.value)} // Atualiza o valor de searchQuery ao digitar
            className="py-[10px] px-3 flex-1" />
          <button type="submit" className="btn-dark">Buscar</button>
        </div>
      </form>
      <div>
        {posts && posts.length == 0 && (
          <>
            <p className="my-10">Nenhum post encontrado.</p>
            <Link to="/" className="btn-dark">Voltar</Link>
          </>

        )}
        {posts && posts.map(post => (
          <PostDetail key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}