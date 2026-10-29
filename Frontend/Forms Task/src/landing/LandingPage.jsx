import './landing.css';
import slide1 from '../assets/images/slide1.png';
import slide2 from '../assets/images/slide2.png';
import slide3 from '../assets/images/slide3.png';
import card1 from '../assets/images/card1.png';
import service1 from '../assets/images/service1.png';
import service2 from '../assets/images/service2.png';
import service3 from '../assets/images/service3.png';
import service4 from '../assets/images/service4.jpg';
import service5 from '../assets/images/service5.jpg';
import service6 from '../assets/images/service6.jpg';
import { Link } from 'react-router-dom';

const slides = [slide1, slide2, slide3];

const problems = [
  { title: 'Slow lead response = lost clients', text: "Your competitors reply instantly. You don't." },
  { title: 'Manual follow-ups = poor conversions', text: '80% of sales require 5+ follow-ups. Most businesses stop at 1.' },
  { title: 'No automation = wasted staff time', text: 'Your team spends hours on repetitive tasks instead of growth.' },
  { title: 'No systems = growth becomes chaotic', text: 'Scaling feels impossible without reliable processes.' },
  { title: 'Weak online presence = missed opportunities', text: "Leads are everywhere. You're not capturing them." },
];

const services = [
  { img: service1, title: 'AI Lead Generation Systems', text: 'Generate qualified leads using AI-powered funnels, landing pages, smart forms, chatbot capture, and automated outreach workflows.' },
  { img: service2, title: 'AI Sales Automation', text: 'Automate follow-ups, appointment booking, lead nurturing, and CRM pipeline workflows to improve conversions and response time.' },
  { img: service3, title: 'AI Customer Support Automation', text: 'Provide faster support and better customer experience with AI assistants, FAQ bots, and multi-channel response workflows.' },
  { img: service4, title: 'AI Marketing Automation', text: 'Automate parts of your marketing workflow including email sequences, customer journeys, and content support systems.' },
  { img: service5, title: 'Business Process Automation', text: 'Reduce repetitive work by automating onboarding, reporting, admin operations, internal communication, and workflow management.' },
  { img: service6, title: 'Local Business Growth Automation', text: 'Specially designed for clinics, consultants, and agencies in Pakistan and GCC to dominate their local market.' },
];

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Carousel */}
      <div id="live-demo" className="carousel slide">
        <div className="carousel-indicators">
          {slides.map((_, i) => (
            <button key={i} type="button" data-bs-target="#live-demo" data-bs-slide-to={i}
              className={i === 0 ? 'active' : ''} aria-label={`Slide ${i + 1}`}></button>
          ))}
        </div>
        <div className="carousel-inner">
          {slides.map((src, i) => (
            <div key={i} className={`carousel-item ${i === 0 ? 'active' : ''}`}>
              <img src={src} className="d-block w-100" alt={`Slide ${i + 1}`} />
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#live-demo" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#live-demo" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Hero */}
      <section className="hero">
        <div className="container">
          <h1>
            We Help Businesses Automate<br className="d-none d-lg-block" />
            Sales, Marketing &amp; Operations<br className="d-none d-lg-block" />
            Using AI
          </h1>
          <p>
            AI AutomationAgency.pk helps businesses in Pakistan, UAE, Saudi Arabia<br className="d-none d-lg-block" />
            and beyond automate lead generation, follow-ups, customer support, and<br className="d-none d-lg-block" />
            operations, so they grow faster with less effort.
          </p>
        </div>
      </section>

      {/* Buttons */}
      <div className="d-flex justify-content-center gap-4 pb-5">
        <Link className="btn btn-primary btn-lg" to="/book-call">Book free strategy call</Link>
        <Link className="btn btn-secondary btn-lg" to="/register">Get free AI Audit</Link>
      </div>

      {/* Dashboard card */}
      <div className="card text-bg-dark dash-card">
        <img src={card1} className="card-img" alt="Dashboard" />
      </div>

      {/* Pill 1 */}
      <div className="text-center mt-4 mb-2 pill-spaced">
        <span className="badge rounded-pill text-bg-info op-badge">* OPERATIONAL EFFICIENCY</span>
      </div>

      {/* Text 2 */}
      <section className="hero hero-tight">
        <div className="container">
          <h1>
            Stop Losing Leads &amp; Revenue To<br className="d-none d-lg-block" />
            Manual Processes
          </h1>
          <p>We built AI powered system that fix this</p>
        </div>
      </section>

      {/* Problem cards */}
      <div className="container my-5">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {problems.map((p) => (
            <div className="col" key={p.title}>
              <div className="card h-100 info-card">
                <div className="card-body">
                  <h4 className="card-title">{p.title}</h4>
                  <p className="card-text">{p.text}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="col">
            <div className="card h-100 info-card">
              <div className="card-body">
                <h3 className="card-title">We turn chaos into automated revenue machines.</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pill 2 */}
      <div className="text-center mt-4 mb-2 pill-spaced">
        <span className="badge rounded-pill text-bg-info op-badge">* WHAT WE DO</span>
      </div>

      {/* Text 3 */}
      <section className="hero hero-tight">
        <div className="container">
          <h1>
            Our Professional<br className="d-none d-lg-block" />
            AI Automation Services
          </h1>
          <p>We design and deploy custom AI ecosystems that handle your repetitive tasks, nurture leads, and scale your business operations 24/7 without human intervention.</p>
        </div>
      </section>

      {/* Service cards */}
      <div className="container my-5" id="services">
        <div className="row row-cols-1 row-cols-md-3 g-4">
          {services.map((s) => (
            <div className="col" id={`service-${s.title.toLowerCase().replaceAll(' ', '-')}`} key={s.title}>
              <div className="card h-100">
                <img src={s.img} className="card-img-top" alt={s.title} />
                <div className="card-body">
                  <h4 className="card-title">{s.title}</h4>
                  <p className="card-text">{s.text}</p>
                </div>
                <div className="card-footer">
                  <small className="text-body-secondary">Learn more &rarr;</small>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="footer-dark">
        <div className="container py-4">
          <ul className="nav justify-content-center border-bottom border-secondary pb-3 mb-3">
            <li className="nav-item"><Link to="/" className="nav-link px-3 text-white-50">Home</Link></li>
            <li className="nav-item"><a href="#services" className="nav-link px-3 text-white-50">Services</a></li>
            <li className="nav-item"><a href="#live-demo" className="nav-link px-3 text-white-50">Live Demo</a></li>
            <li className="nav-item"><Link to="/contact" className="nav-link px-3 text-white-50">Contact</Link></li>
          </ul>
          <p className="text-center text-white-50 mb-0">&copy; 2026 Nexus AI Marketing Solutions</p>
        </div>
      </footer>
    </div>
  );
}