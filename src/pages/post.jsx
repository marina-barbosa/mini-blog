import { useParams } from "react-router-dom"
import { useFetchDocument } from "../hooks/useFetchDocument";

export const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id)
  return (
    <div className="text-center flex flex-col gap-4 mx-auto">
      {post && (
        <>
          {loading && <p>Carregando post...</p>}
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <img src={post.image} alt={post.title} className="rounded shadow-xl" />
          <p>{post.body}</p>
          <h3 className="font-bold">Este post trata sobre:</h3>
          <ul className="flex gap-3 mx-auto">
            {post.tagsArray.map(tag => (
              <li key={tag}><span className="font-bold">#</span>{tag}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}