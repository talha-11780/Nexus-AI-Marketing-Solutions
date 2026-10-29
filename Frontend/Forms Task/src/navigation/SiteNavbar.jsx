import { Link } from 'react-router-dom';

export default function SiteNavbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Nexus AI Marketing Solutions</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#siteNavbar"
          aria-controls="siteNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="siteNavbar">
          <ul className="navbar-nav me-auto my-2 my-lg-0">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/#live-demo">Live Demo</Link></li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#services" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                Services
              </a>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="/#service-ai-lead-generation-systems">AI Lead Generation</Link></li>
                <li><Link className="dropdown-item" to="/#service-ai-sales-automation">AI Sales Automation</Link></li>
                <li><hr className="dropdown-divider" /></li>
                <li><Link className="dropdown-item" to="/contact">Other Services</Link></li>
              </ul>
            </li>
            <li className="nav-item"><Link className="nav-link" to="/book-call">Signature Offers</Link></li>
          </ul>
          <ul className="navbar-nav align-items-lg-center gap-lg-2">
            <li className="nav-item"><Link className="btn btn-outline-info btn-sm" to="/admin">Admin</Link></li>
            <li className="nav-item"><Link className="btn btn-outline-info btn-sm" to="/customer">Customer</Link></li>
            <li className="nav-item"><Link className="btn btn-outline-info btn-sm" to="/marketing">Marketing Team</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
