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
              isActive ? 'bg-black text-white px-4 py-2 rounded' : 'px-4 py-2'
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? 'bg-black text-white px-4 py-2 rounded' : 'px-4 py-2'
            }
          >
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}