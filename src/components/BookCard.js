function BookCard({ book }) {
  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        {book.coverImage ? (
          <img src={book.coverImage} alt={book.title} style={styles.image} />
        ) : (
          <div style={styles.placeholder}>📚</div>
        )}
      </div>
      <div style={styles.content}>
        <h3 style={styles.title}>{book.title}</h3>
        {book.subtitle && <p style={styles.subtitle}>{book.subtitle}</p>}
        <div style={styles.meta}>
          {book.year && <span>📅 {book.year}</span>}
          {book.pages && <span>📖 {book.pages} pages</span>}
          {book.genre && <span style={styles.genre}>{book.genre}</span>}
        </div>
        <p style={styles.description}>{book.description}</p>
        <div style={styles.actions}>
          {book.amazonLink && book.amazonLink !== '#' && (
            <a
              href={book.amazonLink}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.amazonButton}
            >
              Buy on Amazon
            </a>
          )}
          {book.pdfFile && (
            <a
              href={book.pdfFile}
              download
              style={styles.downloadButton}
            >
              Download Sample
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0,0,0,0.08)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  imageContainer: {
    height: '200px',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.3s'
  },
  placeholder: {
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '48px',
    color: '#999'
  },
  content: {
    padding: '25px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  title: {
    fontSize: '1.3rem',
    marginBottom: '8px',
    color: '#2c3e50',
    lineHeight: '1.4'
  },
  subtitle: {
    fontSize: '0.95rem',
    color: '#7f8c8d',
    marginBottom: '15px',
    fontStyle: 'italic'
  },
  meta: {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px',
    fontSize: '0.85rem',
    color: '#666',
    flexWrap: 'wrap'
  },
  genre: {
    backgroundColor: '#e8f4fc',
    color: '#2980b9',
    padding: '3px 10px',
    borderRadius: '15px',
    fontSize: '0.8rem'
  },
  description: {
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '20px',
    flex: 1
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: 'auto'
  },
  amazonButton: {
    padding: '10px 20px',
    backgroundColor: '#ff9900',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'background-color 0.2s',
    textAlign: 'center',
    flex: 1
  },
  downloadButton: {
    padding: '10px 20px',
    backgroundColor: '#27ae60',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'background-color 0.2s',
    textAlign: 'center',
    flex: 1
  }
};

export default BookCard;