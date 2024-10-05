import { Link } from "react-router-dom"

export const PostDetail = ({ post }) => {
  return (
    <div className="text-left flex flex-col gap-3 my-5">
      <img src={post.image} alt={post.title} className="w-full max-w-[600px] rounded" />
      <p className="mt-1 text-sm">by {post.createdBy}</p>
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <div className="flex gap-5 text-sm">
        {post.tagsArray.map(tag => (
          <p key={tag}>
            #{tag}
          </p>
        ))}
      </div>
      <div className="my-3">
        <Link to={`/post/${post.id}`} className="btn-outline">Ler</Link>
      </div>
    </div>
  )
}