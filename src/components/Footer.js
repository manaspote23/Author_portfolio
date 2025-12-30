function Footer() {
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
              <li><a href="/" style={styles.footerLink}>Home</a></li>
              <li><a href="/blog" style={styles.footerLink}>Blog</a></li>
              <li><a href="/books" style={styles.footerLink}>Books</a></li>
              <li><a href="/contact" style={styles.footerLink}>Contact</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div style={styles.column}>
            <h3 style={styles.columnTitle}>Stay Updated</h3>
            <p style={styles.newsletterText}>
              Subscribe to my newsletter for updates
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

        {/* Copyright */}
        <div style={styles.copyright}>
          <p>© {currentYear} Author Name. All rights reserved.</p>
          <div style={styles.socialLinks}>
            <a href="#" style={styles.socialLink}>Twitter</a>
            <a href="#" style={styles.socialLink}>Instagram</a>
            <a href="#" style={styles.socialLink}>LinkedIn</a>
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
  columnTitle: {
    color: '#fff',
    marginBottom: '20px',
    fontSize: '1.2rem'
  },
  aboutText: {
    lineHeight: '1.8',
    opacity: '0.8'
  },
  linkList: {
    listStyle: 'none'
  },
  footerLink: {
    color: '#bdc3c7',
    display: 'block',
    padding: '8px 0',
    transition: 'color 0.3s'
  },
  newsletterForm: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px'
  },
  emailInput: {
    flex: '1',
    padding: '10px',
    border: 'none',
    borderRadius: '4px'
  },
  subscribeBtn: {
    padding: '10px 20px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  copyright: {
    borderTop: '1px solid #34495e',
    paddingTop: '30px',
    textAlign: 'center',
    opacity: '0.7'
  },
  socialLinks: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginTop: '15px'
  },
  socialLink: {
    color: '#bdc3c7'
  }
};

export default Footer;