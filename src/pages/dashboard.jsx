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
import { IconEdit, IconTrash, IconEye } from "@tabler/icons-react";

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
    <div className="max-w-4xl mx-auto text-center w-full">
      <h2 className="text-3xl font-bold mb-5">Dashboard</h2>

      {posts && posts.length === 0 ? (
        <div className="text-center">
          <p className="mb-11">Você não tem nenhum post.</p>
          <Link to="/posts/create" className="btn-primary">
            Novo post
          </Link>
        </div>

      ) : (

        <div className="space-y-4 w-full max-w-[600px] mx-auto">
          <p className="mb-8">Gerencie os seus posts</p>
          {posts && posts.map((post) => (
            <div key={post.id} className="flex justify-between items-center p-4 bg-gray-50 shadow rounded-lg font-semibold">
              <Link to={`/post/${post.id}`} className="flex w-full items-center me-2">
                <span className="text-left flex-grow hover:text-black">{post.title}</span>
                <span className="btn-outline"><IconEye size={20} /></span>
              </Link>
              <div className="flex space-x-2">
                <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
                  {/* Editar */}
                  <IconEdit size={20} />
                </Link>

                <button
                  onClick={() => deleteDocument(post.id)}
                  className="flex items-center btn-danger"
                >
                  {/* Excluir */}
                  <IconTrash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

      )}

    </div>
  );
};
