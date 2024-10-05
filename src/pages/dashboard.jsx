// import { Link } from "react-router-dom"
// import { useAuthValue } from "../context/AuthContext"
// import { useFetchDocuments } from "../hooks/useFetchDocuments"

// export const Dashboard = () => {
//   const { currentUser } = useAuthValue()
//   const uid = currentUser.uid
//   const { documents: posts, loading } = useFetchDocuments("posts", null, uid)

//   // posts do usuario
//   const deleteDocument = () => {
//     console.log("click")
//   }
//   const editDocument = () => {
//     console.log("click")
//   }

//   if(loading) {
//     return <p>Carregando...</p>
//   }

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <p>Gerencia os seus posts</p>
//       {posts && posts.length === 0 ? (
//         <div>
//           <p>Você não tem nenhum post.</p>
//           <Link to="/posts/create" className="btn-primary">Criar novo post</Link>
//         </div>
//       ) : (
//         <>
//           {/* 
//           // title
//           // action
//           // edit: <Link to={`/post/${post.id}`}>Edit</Link> 
//           */}
//           {posts && posts.map(post => (
//             <div key={post.id}>
//               <Link to={`/post/${post.id}`}>{post.title}</Link>
//               <button onClick={() => deleteDocument(post.id)}>Excluir</button>
//             </div>
//           ))}
//         </>
//       )}
//     </div>
//   )
// }


import { Link } from "react-router-dom";
import { useAuthValue } from "../context/AuthContext";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import { useDeleteDocument } from "../hooks/useDeleteDocument";
import { IconEdit, IconTrash, IconPlus } from "@tabler/icons-react";

export const Dashboard = () => {
  const { currentUser } = useAuthValue();
  const uid = currentUser.uid;
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
  const { deleteDocument } = useDeleteDocument("posts");



  const editDocument = (id) => {
    console.log("Editar post com ID:", id);
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <p className="text-gray-600 mb-6">Gerencie os seus posts</p>

      {posts && posts.length === 0 ? (
        <div className="text-center">
          <p className="text-lg text-gray-500">Você não tem nenhum post.</p>
          <Link to="/posts/create" className="btn-primary inline-flex items-center mt-4">
            <IconPlus className="mr-2" size={20} /> Criar novo post
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {posts && posts.map((post) => (
            <div key={post.id} className="flex justify-between items-center p-4 bg-white shadow rounded-lg">
              <Link to={`/post/${post.id}`} className="text-lg font-semibold text-blue-600">
                {post.title}
              </Link>
              <div className="flex space-x-2">
                <button
                  onClick={() => editDocument(post.id)}
                  className="flex items-center text-yellow-500 hover:text-yellow-600"
                >
                  <IconEdit size={20} className="mr-1" />
                  Editar
                </button>
                <button
                  onClick={() => deleteDocument(post.id)}
                  className="flex items-center text-red-500 hover:text-red-600"
                >
                  <IconTrash size={20} className="mr-1" />
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
