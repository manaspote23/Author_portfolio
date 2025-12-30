import { useState } from 'react';
import blogPosts from '../data/blogPosts';

function Blog() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <section style={styles.hero}>
        <div className="container">
          <h1 style={styles.title}>Blog & Articles</h1>
          <p style={styles.subtitle}>
            Insights, thoughts, and updates from my writing journey
          </p>
          
          {/* Search Bar */}
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>
      </section>

      <section style={styles.blogSection}>
        <div className="container">
          {/* Blog Posts Grid */}
          <div style={styles.postsGrid}>
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <article key={post.id} style={styles.postCard}>
                  <div style={styles.postImage}>
                    {post.image ? (
                      <img src={post.image} alt={post.title} />
                    ) : (
                      <div style={styles.imagePlaceholder}>
                        {post.category}
                      </div>
                    )}
                  </div>
                  <div style={styles.postContent}>
                    <div style={styles.postMeta}>
                      <span style={styles.date}>{post.date}</span>
                      <span style={styles.category}>{post.category}</span>
                    </div>
                    <h2 style={styles.postTitle}>{post.title}</h2>
                    <p style={styles.postExcerpt}>{post.excerpt}</p>
                    <a href={`/blog/${post.id}`} style={styles.readMore}>
                      Read Full Article →
                    </a>
                  </div>
                </article>
              ))
            ) : (
              <div style={styles.noResults}>
                <h3>No articles found</h3>
                <p>Try a different search term</p>
              </div>
            )}
          </div>

          {/* Categories Sidebar */}
          <aside style={styles.sidebar}>
            <h3 style={styles.sidebarTitle}>Categories</h3>
            <ul style={styles.categories}>
              <li style={styles.categoryItem}>
                <a href="#" style={styles.categoryLink}>Writing Tips</a>
              </li>
              <li style={styles.categoryItem}>
                <a href="#" style={styles.categoryLink}>Book Updates</a>
              </li>
              <li style={styles.categoryItem}>
                <a href="#" style={styles.categoryLink}>Author Life</a>
              </li>
              <li style={styles.categoryItem}>
                <a href="#" style={styles.categoryLink}>Events</a>
              </li>
            </ul>

            {/* Newsletter Signup */}
            <div style={styles.newsletterBox}>
              <h4 style={styles.newsletterTitle}>Newsletter</h4>
              <p>Get updates on new articles</p>
              <form style={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Your email"
                  style={styles.newsletterInput}
                />
                <button type="submit" style={styles.newsletterButton}>
                  Subscribe
                </button>
              </form>
            </div>
          </aside>
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
    marginBottom: '40px'
  },
  searchContainer: {
    maxWidth: '500px',
    margin: '0 auto'
  },
  searchInput: {
    width: '100%',
    padding: '15px 20px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '50px',
    outline: 'none'
  },
  blogSection: {
    padding: '80px 0'
  },
  postsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '40px'
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s'
  },
  postImage: {
    height: '200px',
    backgroundColor: '#2c3e50'
  },
  imagePlaceholder: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '18px'
  },
  postContent: {
    padding: '25px'
  },
  postMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '15px',
    fontSize: '14px',
    color: '#666'
  },
  postTitle: {
    fontSize: '1.3rem',
    marginBottom: '15px',
    color: '#2c3e50'
  },
  postExcerpt: {
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  readMore: {
    color: '#e74c3c',
    fontWeight: 'bold'
  },
  noResults: {
    textAlign: 'center',
    padding: '50px',
    gridColumn: '1 / -1'
  }
};

export default Blog;