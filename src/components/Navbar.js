import { NavLink } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

//styles & images
import './Navbar.css'
import Temple from '../assets/temple.svg'

export default function Navbar() {
  const { logout, isPending } = useLogout()
  const { user } = useAuthContext()

  return (
    <div className="navbar">
      <ul>
        <li className="logo">
            <img src={Temple} alt="dojo logo" />
            <span>The Dojo</span>
        </li>
        {!user ?
        <>
          <li><NavLink to='login'>Login</NavLink></li>
          <li><NavLink to='signup'>Signup</NavLink></li>
        </>
        :
        <li>
            {!isPending && <button onClick={logout} className="btn">Logout</button>}
            {isPending && <button className="btn" disabled>Logging out...</button>}
        </li>
        }
      </ul>
    </div>
  )
}
