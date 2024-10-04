import { Link } from "react-router-dom"

export const About = () => {
  return (
    <div className="text-center text-gray-500 mx-auto">
      <h2 className="text-2xl font-semibold">Sobre o Mini <span className="font-bold">Blog</span></h2>
      <p className="mt-8 mb-11">Este projeto consiste em um blog desenvolvido com React no front-end e Firebase no back-end.</p>
      <Link to="/posts/create" className="btn-primary">Criar post</Link>
    </div>
  )
}