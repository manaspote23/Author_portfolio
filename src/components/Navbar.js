import { NavLink, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="navbar">
        <div className="navbar-inner">

          {/* LOGO (Circle + Letter + Name) */}
          <div className="logo-wrap" onClick={() => navigate("/")}>
            <div className="logo-circle">MP</div>
            <span className="logo-name">Mahendra Pandey</span>
          </div>

          {/* CENTER LINKS */}
          <div className="nav-links">
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/books">Books</NavLink>
            <NavLink to="/blog">Blog</NavLink>
          </div>

          {/* CONTACT BUTTON */}
          <button className="contact-btn" onClick={() => navigate("/contact")}>
            Contact
          </button>

        </div>
      </nav>

      {/* ================= CSS ================= */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap');

        /* NAVBAR */
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          background: #eeeeee;
          z-index: 1000;
        }

        .navbar-inner {
          max-width: 1300px;
          margin: 0 auto;
          padding: 26px 90px;
          display: grid;
          grid-template-columns: auto 1fr auto;
          align-items: center;
        }

        /* LOGO */
        .logo-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
        }

        .logo-circle {
          width: 34px;
          height: 34px;
          background: #000;
          color: #fff;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          font-weight: 500;
          font-family: 'Inter', sans-serif;
        }

        .logo-name {
          font-size: 15px;
          color: #111;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          letter-spacing: 0.2px;
        }

        /* NAV LINKS */
        .nav-links {
          display: flex;
          justify-content: center;
          gap: 48px;
        }

        .nav-links a {
          font-size: 14px;
          color: #777;
          text-decoration: none;
          letter-spacing: 0.5px;
          padding-bottom: 6px;
          position: relative;
          transition: color 0.3s;
        }

        .nav-links a:hover {
          color: #111;
        }

        .nav-links a.active {
          color: #111;
        }

        .nav-links a.active::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -10px;
          width: 100%;
          height: 2px;
          background: #111;
        }

        /* CONTACT BUTTON */
        .contact-btn {
          background: none;
          border: 1px solid #111;
          color: #111;
          padding: 10px 28px;
          font-size: 13px;
          letter-spacing: 1px;
          cursor: pointer;
          transition: 0.3s;
        }

        .contact-btn:hover {
          background: #111;
          color: #fff;
        }

        /* RESPONSIVE */
        @media (max-width: 900px) {
          .nav-links {
            display: none;
          }

          .navbar-inner {
            padding: 22px 32px;
          }
        }
      `}</style>
    </>
  );
}

export default Navbar;
