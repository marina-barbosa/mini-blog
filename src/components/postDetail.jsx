import { Link } from "react-router-dom"

export const PostDetail = ({ post }) => {
  return (
    <div className="text-left flex flex-col gap-4">
      <img src={post.image} alt={post.title} className="w-full max-w-[600px] rounded shadow-xl" />
      <h2 className="text-2xl font-bold">{post.title}</h2>
      <p className="italic text-sm">{post.createdBy}</p>
      <div className="flex gap-3">
        {post.tagsArray.map(tag => (
          <p key={tag}>
            <span className="font-bold">#</span>{tag}
          </p>
        ))}
      </div>
      <div className="mt-3 mb-10">
        <Link to={`/post/${post.id}`} className="btn-outline">Ler</Link>
      </div>
    </div>
  )
}