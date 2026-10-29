import { Link } from 'react-router-dom';

export default function CustomerMenu() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Nexus AI Marketing Solutions</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#customerMenu"
          aria-controls="customerMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="customerMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/customer/register">Register</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/customer/login">Customer Login</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/customer/contact">Contact Us</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/customer/feedback">Feedback</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/customer/book-call">Book a Free Call</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
