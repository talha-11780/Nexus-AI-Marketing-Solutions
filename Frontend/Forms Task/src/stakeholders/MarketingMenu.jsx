import { Link } from 'react-router-dom';

export default function MarketingMenu() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container">
        <Link className="navbar-brand" to="/">Nexus AI Marketing Solutions</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#marketingMenu"
          aria-controls="marketingMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="marketingMenu">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/marketing/login">Marketing Login</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/campaign">Create Campaign</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/content-approval">Approve Content</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/post-scheduler">Schedule Post</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/add-team-member">Add Team Member</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
