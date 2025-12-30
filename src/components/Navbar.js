import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';  // Corrected import

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={styles.navbar}>
      <div className="container" style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logo}>
          <span style={styles.logoText}>AuthorName</span>
        </Link>

        {/* Desktop Navigation */}
        <div style={styles.desktopNav}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/blog" style={styles.navLink}>Blog</Link>
          <Link to="/books" style={styles.navLink}>Books</Link>
          <Link to="/contact" style={styles.navLink}>Contact</Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          style={styles.menuButton}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}  {/* Corrected usage */}
        </button>

        {/* Mobile Navigation */}
        {isOpen && (
          <div style={styles.mobileNav}>
            <Link to="/" style={styles.mobileLink} onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/blog" style={styles.mobileLink} onClick={() => setIsOpen(false)}>Blog</Link>
            <Link to="/books" style={styles.mobileLink} onClick={() => setIsOpen(false)}>Books</Link>
            <Link to="/contact" style={styles.mobileLink} onClick={() => setIsOpen(false)}>Contact</Link>
          </div>
        )}
      </div>
    </nav>
  );
}

// ... rest of the styles remain the same

const styles = {
  navbar: {
    backgroundColor: '#ffffff',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
  },
  logoText: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#2c3e50'
  },
  desktopNav: {
    display: 'flex',
    gap: '30px',
    alignItems: 'center'
  },
  navLink: {
    fontSize: '16px',
    padding: '8px 0',
    position: 'relative'
  },
  menuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#2c3e50'
  },
  mobileNav: {
    display: 'none',
    flexDirection: 'column',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    padding: '20px',
    boxShadow: '0 5px 10px rgba(0,0,0,0.1)'
  },
  mobileLink: {
    padding: '15px 0',
    borderBottom: '1px solid #eee',
    fontSize: '18px'
  }
};

// Responsive styles
if (typeof window !== 'undefined') {
  const mobileBreakpoint = 768;
  const isMobile = window.innerWidth <= mobileBreakpoint;
  
  if (isMobile) {
    styles.menuButton.display = 'block';
    styles.desktopNav.display = 'none';
    styles.mobileNav.display = 'flex';
  }
}

export default Navbar;