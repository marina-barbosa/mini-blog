import { useNavigate, Link } from "react-router-dom"
import { useFetchDocuments } from "../hooks/useFetchDocuments"
import { PostDetail } from "../components/postDetail";
import { SearchForm } from "../components/searchForm";

export const Home = () => {
  const { documents: posts, loading } = useFetchDocuments("posts");
  const navigate = useNavigate()

  const handleSearch = (query) => {
    if (query) {
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className="mx-auto text-center space-y-6">
      <h1 className="text-3xl font-bold mb-5">Veja nossos posts mais recentes</h1>
      <SearchForm onSubmit={handleSearch} />

      <div className="space-y-6">

        {loading && <p>Carregando...</p>}

        {posts && posts.length > 0 && posts.map((post, index) => (
          <div key={post.id}>
            <PostDetail post={post} />
            {index < posts.length - 1 && <hr className="mb-14" />} {/* Adiciona <hr> entre os posts */}
          </div>
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