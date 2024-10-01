import { NavLink } from 'react-router-dom';

export const Navbar = () => {
  return (
    <nav className='flex justify-between items-center h-20 px-8 shadow-md'>
      <NavLink to="/">
        <h1 className='text-2xl'>Mini <span className='font-bold'>Blog</span></h1>
      </NavLink>
      <ul className='flex gap-3'>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition duration-300 ${isActive ? 'bg-black text-white' : 'hover:bg-gray-200'}`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition duration-300 ${isActive ? 'bg-black text-white' : 'hover:bg-gray-200'}`
            }
          >
            Entrar
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition duration-300 ${isActive ? 'bg-black text-white' : 'hover:bg-gray-200'}`
            }
          >
            Cadastrar
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-4 py-2 rounded transition duration-300 ${isActive ? 'bg-black text-white' : 'hover:bg-gray-200'}`
            }
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}