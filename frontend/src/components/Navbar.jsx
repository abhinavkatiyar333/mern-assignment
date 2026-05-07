import { useNavigate } from 'react-router-dom';

function Navbar() {
          const navigate = useNavigate();

          const handleLogout = () => {
                    localStorage.removeItem('taskManagerToken');
                    navigate('/login');
          };

          return (
                    <header className="navbar">
                              <div className="navbar__brand">Task Manager</div>
                              <button className="button button--secondary" onClick={handleLogout}>
                                        Logout
                              </button>
                    </header>
          );
}

export default Navbar;
