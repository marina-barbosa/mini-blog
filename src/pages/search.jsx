
import { useFetchDocuments } from "../hooks/useFetchDocuments"
import { useQuery } from "../hooks/useQuery"
import { PostDetail } from "../components/postDetail"
import { SearchForm } from "../components/searchForm"
import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"

export const Search = () => {
  const query = useQuery()
  const search = query.get("q")
  const { documents: posts } = useFetchDocuments("posts", search)
  const navigate = useNavigate()

  const handleSearch = (searchQuery) => {
    if (searchQuery) {
      navigate(`/search?q=${searchQuery}`);
      window.location.reload(); // Recarrega a página para atualizar a busca
    }
  };

  return (
    <div className="mx-auto text-center space-y-6 w-full max-w-[600px]">
      <h2 className="text-2xl font-bold">Search</h2>
      <SearchForm onSubmit={handleSearch} />
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