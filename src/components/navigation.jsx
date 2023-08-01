import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../styles/navigation.module.css';

function NavBar() {
  return (
    <nav>
      <div>
        <img src={logo} alt="Space Travelers Hub" />
        <h1>Space Travelers Hub</h1>
        <ul>
          <li>
            <NavLink to="/" activeClassname="active-link">Rockets</NavLink>
          </li>
          <li>
            <NavLink to="/missions" activeClassname="active-link">Missions</NavLink>
          </li>
          <li>
            <NavLink to="/myprofile" activeClassname="active-link">My profile</NavLink>
          </li>
          <li>
            <NavLink to="/dragons" activeClassName="active-link">Dragons</NavLink>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
