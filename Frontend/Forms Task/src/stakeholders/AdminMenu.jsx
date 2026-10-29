import { Link } from 'react-router-dom';

export default function AdminMenu() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Nexus AI Marketing Solutions</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#adminMenu"
          aria-controls="adminMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="adminMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/admin/login">Admin Login</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/add-service">Add Service</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/edit-service">Edit Service</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/delete-service">Delete Service</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
