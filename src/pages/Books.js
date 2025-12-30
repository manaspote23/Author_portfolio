import { useState } from 'react';
import BookCard from '../components/BookCard';
import booksData from '../data/booksData';

function Books() {
  const [filter, setFilter] = useState('all');

  // Sample book data - you'll create booksData.js separately
  const allBooks = booksData || [
    {
      id: 1,
      title: "The Enchanted Forest",
      subtitle: "A Journey Through Myth",
      coverImage: "/assets/images/book1.jpg",
      description: "A deep exploration of mythology and personal transformation through the lens of nature and folklore.",
      year: "2023",
      pages: "320",
      genre: "Non-fiction",
      pdfFile: "enchanted-forest-sample.pdf",
      amazonLink: "#",
      goodreadsLink: "#",
      fullDescription: "Longer description here..."
    },
    // Add more books
  ];

  const filteredBooks = filter === 'all' 
    ? allBooks 
    : allBooks.filter(book => book.genre === filter);

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div className="container">
          <h1 style={styles.title}>My Books</h1>
          <p style={styles.subtitle}>
            Browse my published works and download sample chapters
          </p>
        </div>
      </section>

      <section style={styles.booksSection}>
        <div className="container">
          {/* Filter Buttons */}
          <div style={styles.filters}>
            <button 
              style={filter === 'all' ? styles.activeFilter : styles.filterButton}
              onClick={() => setFilter('all')}
            >
              All Books
            </button>
            <button 
              style={filter === 'fiction' ? styles.activeFilter : styles.filterButton}
              onClick={() => setFilter('fiction')}
            >
              Fiction
            </button>
            <button 
              style={filter === 'non-fiction' ? styles.activeFilter : styles.filterButton}
              onClick={() => setFilter('non-fiction')}
            >
              Non-Fiction
            </button>
          </div>

          {/* Books Grid */}
          <div style={styles.booksGrid}>
            {filteredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>

          {/* Download Instructions */}
          <div style={styles.instructions}>
            <h3>How to Download PDF Samples:</h3>
            <ol style={styles.steps}>
              <li>Click the "Download PDF Sample" button on any book</li>
              <li>The PDF will download to your device</li>
              <li>Open with any PDF reader (Adobe, Preview, etc.)</li>
              <li>Enjoy reading!</li>
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: {
    paddingTop: '80px'
  },
  hero: {
    backgroundColor: '#f8f9fa',
    padding: '80px 0',
    textAlign: 'center'
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px'
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#666',
    maxWidth: '600px',
    margin: '0 auto'
  },
  booksSection: {
    padding: '80px 0'
  },
  filters: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '50px',
    flexWrap: 'wrap'
  },
  filterButton: {
    padding: '10px 25px',
    border: '2px solid #ddd',
    background: 'white',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'all 0.3s'
  },
  activeFilter: {
    padding: '10px 25px',
    border: '2px solid #e74c3c',
    background: '#e74c3c',
    color: 'white',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  booksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '40px',
    marginBottom: '60px'
  },
  instructions: {
    backgroundColor: '#f8f9fa',
    padding: '40px',
    borderRadius: '10px',
    maxWidth: '800px',
    margin: '0 auto'
  },
  steps: {
    marginTop: '20px',
    paddingLeft: '20px'
  }
};

export default Books;