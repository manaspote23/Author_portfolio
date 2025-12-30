function BookCard({ book }) {
  const handleDownload = () => {
    // Simulate download process
    console.log(`Downloading ${book.pdfFile}`);
    // In production, this would trigger actual PDF download
  };

  return (
    <div style={styles.card}>
      {/* Book Cover */}
      <div style={styles.coverContainer}>
        <div style={styles.cover}>
          {book.coverImage ? (
            <img src={book.coverImage} alt={book.title} style={styles.coverImage} />
          ) : (
            <div style={styles.coverPlaceholder}>
              {book.title.substring(0, 20)}...
            </div>
          )}
        </div>
        {book.year && (
          <div style={styles.yearBadge}>{book.year}</div>
        )}
      </div>

      {/* Book Info */}
      <div style={styles.content}>
        <h3 style={styles.title}>{book.title}</h3>
        {book.subtitle && (
          <p style={styles.subtitle}>{book.subtitle}</p>
        )}
        
        <p style={styles.description}>{book.description}</p>
        
        {book.pages && (
          <p style={styles.meta}><strong>Pages:</strong> {book.pages}</p>
        )}
        {book.genre && (
          <p style={styles.meta}><strong>Genre:</strong> {book.genre}</p>
        )}

        {/* Action Buttons */}
        <div style={styles.actions}>
          {/* PDF Download Button */}
          <button 
            onClick={handleDownload}
            style={styles.downloadButton}
            title="Download sample PDF"
          >
            <span style={styles.downloadIcon}>📥</span>
            Download PDF Sample
          </button>

          {/* Additional Links */}
          <div style={styles.links}>
            {book.amazonLink && (
              <a 
                href={book.amazonLink} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.link}
              >
                Buy on Amazon
              </a>
            )}
            {book.goodreadsLink && (
              <a 
                href={book.goodreadsLink} 
                target="_blank" 
                rel="noopener noreferrer"
                style={styles.link}
              >
                Goodreads
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  coverContainer: {
    position: 'relative',
    height: '300px',
    backgroundColor: '#f5f5f5'
  },
  cover: {
    width: '100%',
    height: '100%',
    overflow: 'hidden'
  },
  coverImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  coverPlaceholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2c3e50',
    color: 'white',
    fontSize: '18px',
    textAlign: 'center',
    padding: '20px'
  },
  yearBadge: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: '#e74c3c',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '14px'
  },
  content: {
    padding: '25px',
    flex: '1',
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    color: '#2c3e50'
  },
  subtitle: {
    color: '#666',
    fontStyle: 'italic',
    marginBottom: '15px'
  },
  description: {
    marginBottom: '20px',
    lineHeight: '1.6',
    flex: '1'
  },
  meta: {
    color: '#777',
    marginBottom: '8px',
    fontSize: '14px'
  },
  actions: {
    marginTop: 'auto'
  },
  downloadButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#2c3e50',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    transition: 'background-color 0.3s',
    marginBottom: '15px'
  },
  downloadIcon: {
    fontSize: '20px'
  },
  links: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center'
  },
  link: {
    color: '#3498db',
    fontSize: '14px',
    textDecoration: 'underline'
  }
};

export default BookCard;