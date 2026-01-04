import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';

function Navbar({ isAuthenticated, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if window is defined (for SSR) and set mobile state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    // Check on mount
    checkMobile();
    
    // Add event listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <nav style={styles.navbar}>
      <div className="container" style={styles.container}>
        {/* Logo */}
        <Link to="/" style={styles.logo} onClick={() => setIsOpen(false)}>
          <span style={styles.logoText}>Mahendra Pandey</span>
        </Link>

        {/* Desktop Navigation */}
        <div style={isMobile ? { display: 'none' } : styles.desktopNav}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/blog" style={styles.navLink}>Blog</Link>
          <Link to="/books" style={styles.navLink}>Books</Link>
          <Link to="/contact" style={styles.navLink}>Contact</Link>
          
          {/* Admin/Login Links (Desktop) */}
          {isAuthenticated ? (
            <>
              <Link to="/admin" style={styles.adminLink}>
                <span style={styles.icon}>⚙️</span> Admin
              </Link>
              <button onClick={onLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" style={styles.loginLink}>
              <span style={styles.icon}>🔐</span> Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          style={isMobile ? styles.menuButton : { display: 'none' }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Navigation */}
        {isOpen && isMobile && (
          <div style={styles.mobileNav}>
            <Link to="/" style={styles.mobileLink} onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/blog" style={styles.mobileLink} onClick={() => setIsOpen(false)}>Blog</Link>
            <Link to="/books" style={styles.mobileLink} onClick={() => setIsOpen(false)}>Books</Link>
            <Link to="/contact" style={styles.mobileLink} onClick={() => setIsOpen(false)}>Contact</Link>
            
            {/* Admin/Login Links (Mobile) */}
            {isAuthenticated ? (
              <>
                <Link to="/admin" style={styles.mobileLink} onClick={() => setIsOpen(false)}>
                  <span style={styles.icon}>⚙️</span> Admin
                </Link>
                <button 
                  onClick={() => {
                    onLogout();
                    setIsOpen(false);
                  }} 
                  style={styles.mobileLogoutBtn}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" style={styles.mobileLink} onClick={() => setIsOpen(false)}>
                <span style={styles.icon}>🔐</span> Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

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
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative'
  },
  logo: {
    textDecoration: 'none'
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
    position: 'relative',
    color: '#2c3e50',
    textDecoration: 'none',
    transition: 'color 0.3s',
    '&:hover': {
      color: '#3498db'
    }
  },
  adminLink: {
    color: '#3498db',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    transition: 'color 0.3s'
  },
  loginLink: {
    color: '#2ecc71',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    transition: 'color 0.3s'
  },
  logoutBtn: {
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#c0392b'
    }
  },
  icon: {
    fontSize: '14px'
  },
  menuButton: {
    display: 'block',
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#2c3e50',
    padding: '5px',
    zIndex: 1001
  },
  mobileNav: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    padding: '20px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.15)',
    zIndex: 1000,
    borderTop: '1px solid #eee'
  },
  mobileLink: {
    padding: '15px 0',
    borderBottom: '1px solid #eee',
    fontSize: '18px',
    color: '#2c3e50',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    transition: 'color 0.3s',
    '&:hover': {
      color: '#3498db'
    }
  },
  mobileLogoutBtn: {
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '15px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    marginTop: '10px',
    textAlign: 'center',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#c0392b'
    }
  }
};

// Add media query for desktop
if (typeof window !== 'undefined') {
  const updateStyles = () => {
    if (window.innerWidth > 768) {
      styles.menuButton.display = 'none';
      styles.desktopNav.display = 'flex';
    } else {
      styles.menuButton.display = 'block';
      styles.desktopNav.display = 'none';
    }
  };
  
  // Initial check
  updateStyles();
  
  // Update on resize
  window.addEventListener('resize', updateStyles);
}

export default Navbar;