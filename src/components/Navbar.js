import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
export default function Navbar() {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  return (
    <div>
      <nav className='navbar'>
        <ul>
          <li className='title'>myMoney</li>

          {!user && (
            <>
              <li>
                <NavLink exact to='/login'>
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink to='/signup'>Sign up</NavLink>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                Hello,<span>{user.displayName}</span>{' '}
              </li>
              <li>
                <button className='btn' onClick={logout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
}
