import { Link } from 'react-router-dom';
import { useState } from 'react';

function Footer({ isAuthenticated = false, onLogout = () => {} }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div className="container" style={styles.container}>
        <div style={styles.columns}>
          {/* About Section */}
          <div style={styles.column}>
            <h3 style={styles.columnTitle}>About the Author</h3>
            <p style={styles.aboutText}>
              Award-winning author specializing in [your genre]. 
              Connect through stories that inspire and transform.
            </p>
          </div>

          {/* Quick Links */}
          <div style={styles.column}>
            <h3 style={styles.columnTitle}>Quick Links</h3>
            <ul style={styles.linkList}>
              <li><Link to="/" style={styles.footerLink}>Home</Link></li>
              <li><Link to="/blog" style={styles.footerLink}>Blog</Link></li>
              <li><Link to="/books" style={styles.footerLink}>Books</Link></li>
              <li><Link to="/contact" style={styles.footerLink}>Contact</Link></li>
            </ul>
          </div>

          {/* Admin Links Section (Conditional) */}
          {isAuthenticated ? (
            <div style={styles.column}>
              <h3 style={styles.columnTitle}>Admin</h3>
              <div style={styles.adminLinks}>
                <Link to="/admin" style={styles.adminLink}>
                  <span style={styles.adminIcon}>⚙️</span> Admin Panel
                </Link>
                <button onClick={onLogout} style={styles.logoutBtn}>
                  <span style={styles.logoutIcon}>🚪</span> Logout
                </button>
                <p style={styles.adminNote}>
                  Manage books, blog posts, and content from the admin panel.
                </p>
              </div>
            </div>
          ) : (
            <div style={styles.column}>
              <h3 style={styles.columnTitle}>Author Access</h3>
              <div style={styles.adminLinks}>
                <Link to="/login" style={styles.loginLink}>
                  <span style={styles.loginIcon}>🔐</span> Admin Login
                </Link>
                <p style={styles.adminNote}>
                  Author login to manage website content.
                </p>
              </div>
            </div>
          )}

          {/* Newsletter */}
          <div style={styles.column}>
            <h3 style={styles.columnTitle}>Stay Updated</h3>
            <p style={styles.newsletterText}>
              Subscribe to my newsletter for updates on new books and articles
            </p>
            <form style={styles.newsletterForm}>
              <input 
                type="email" 
                placeholder="Your email" 
                style={styles.emailInput}
              />
              <button type="submit" style={styles.subscribeBtn}>
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright & Admin Footer */}
        <div style={styles.copyright}>
          <div style={styles.copyrightRow}>
            <p>© {currentYear} Mahendra Pandey. All rights reserved.</p>
            
            {/* Small Admin Links for Footer */}
            <div style={styles.footerAdminLinks}>
              {isAuthenticated ? (
                <>
                  <Link to="/admin" style={styles.footerAdminLink}>
                    Admin Panel
                  </Link>
                  <button onClick={onLogout} style={styles.footerLogoutBtn}>
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" style={styles.footerAdminLink}>
                  Author Login
                </Link>
              )}
            </div>
          </div>
          
          <div style={styles.socialLinks}>
            <a href="#" style={styles.socialLink}>Twitter</a>
            <a href="#" style={styles.socialLink}>Instagram</a>
            <a href="#" style={styles.socialLink}>LinkedIn</a>
            <a href="#" style={styles.socialLink}>Goodreads</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#2c3e50',
    color: '#ecf0f1',
    padding: '60px 0 30px'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  columns: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '40px',
    marginBottom: '40px'
  },
  column: {
    display: 'flex',
    flexDirection: 'column'
  },
  columnTitle: {
    color: '#fff',
    marginBottom: '20px',
    fontSize: '1.2rem',
    fontWeight: '600'
  },
  aboutText: {
    lineHeight: '1.8',
    opacity: '0.8',
    fontSize: '0.95rem'
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  footerLink: {
    color: '#bdc3c7',
    textDecoration: 'none',
    display: 'block',
    padding: '8px 0',
    transition: 'color 0.3s',
    fontSize: '0.95rem',
    '&:hover': {
      color: '#3498db'
    }
  },
  adminLinks: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  adminLink: {
    color: '#3498db',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 15px',
    backgroundColor: 'rgba(52, 152, 219, 0.1)',
    borderRadius: '6px',
    transition: 'all 0.3s',
    fontWeight: '500',
    fontSize: '0.95rem',
    '&:hover': {
      backgroundColor: 'rgba(52, 152, 219, 0.2)',
      transform: 'translateX(5px)'
    }
  },
  loginLink: {
    color: '#2ecc71',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 15px',
    backgroundColor: 'rgba(46, 204, 113, 0.1)',
    borderRadius: '6px',
    transition: 'all 0.3s',
    fontWeight: '500',
    fontSize: '0.95rem',
    '&:hover': {
      backgroundColor: 'rgba(46, 204, 113, 0.2)',
      transform: 'translateX(5px)'
    }
  },
  logoutBtn: {
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#c0392b'
    }
  },
  adminIcon: {
    fontSize: '0.9rem'
  },
  loginIcon: {
    fontSize: '0.9rem'
  },
  logoutIcon: {
    fontSize: '0.9rem'
  },
  adminNote: {
    fontSize: '0.85rem',
    color: '#95a5a6',
    marginTop: '10px',
    lineHeight: '1.5',
    fontStyle: 'italic'
  },
  newsletterForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: '10px'
  },
  newsletterText: {
    lineHeight: '1.6',
    opacity: '0.8',
    fontSize: '0.95rem',
    marginBottom: '10px'
  },
  emailInput: {
    flex: '1',
    padding: '12px',
    border: 'none',
    borderRadius: '4px',
    fontSize: '0.95rem',
    backgroundColor: 'white',
    color: '#2c3e50'
  },
  subscribeBtn: {
    padding: '12px 20px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.95rem',
    fontWeight: '500',
    transition: 'background-color 0.3s',
    '&:hover': {
      backgroundColor: '#c0392b'
    }
  },
  copyright: {
    borderTop: '1px solid #34495e',
    paddingTop: '30px',
    textAlign: 'center',
    opacity: '0.8'
  },
  copyrightRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    marginBottom: '20px'
  },
  footerAdminLinks: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  footerAdminLink: {
    color: '#3498db',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'color 0.3s',
    '&:hover': {
      color: '#2980b9'
    }
  },
  footerLogoutBtn: {
    background: 'transparent',
    color: '#e74c3c',
    border: '1px solid #e74c3c',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.85rem',
    transition: 'all 0.3s',
    '&:hover': {
      backgroundColor: '#e74c3c',
      color: 'white'
    }
  },
  socialLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '25px',
    marginTop: '20px',
    flexWrap: 'wrap'
  },
  socialLink: {
    color: '#bdc3c7',
    textDecoration: 'none',
    fontSize: '0.95rem',
    transition: 'color 0.3s',
    '&:hover': {
      color: '#3498db'
    }
  }
};

export default Footer;