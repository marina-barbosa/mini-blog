import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { useFetchDocuments } from "../../hooks/useFetchDocuments"
import { PostDetail } from "../../components/postDetail";

export const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");

  const handleSubmit = (e) => {
    e.preventDefault()
    //navigate(`/posts?tag=${query}`)
  }

  return (
    <div className="mx-auto text-center space-y-6">
      <h1 className="text-2xl font-bold">Veja nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input type="text" placeholder="Buscar por tags..."
            onChange={(e) => setQuery(e.target.value)}
            className="py-[10px] px-3 flex-1" />
          <button type="submit" className="btn-dark">Buscar</button>
        </div>
      </form>

      <div className="space-y-6">

        {loading && <p>Carregando...</p>}

        {posts && posts.map(post => (
          <PostDetail key={post.id} post={post} />
        ))}

        {posts && posts.length === 0 && (
          <div>
            <p className="py-10">Nenhum post encontrado.</p>
            <Link to="/posts/create" className="btn-primary"> Criar primeiro post</Link>
          </div>
        )}
      </div>


    </div>
  )
}