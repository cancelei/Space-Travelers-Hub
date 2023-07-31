import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function NavBar() {
  return (
    <nav>
      <div>
        <img src={logo} alt="Space Travelers Hub" />
        <h1>Space Travelers Hub</h1>
        <ul>
          <li>
            <Link to="/">Rockets</Link>
          </li>
          <li>
            <Link to="/missions">Missions</Link>
          </li>
          <li>
            <Link to="/myprofile">My profile</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
