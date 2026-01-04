import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Blog() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const savedBlogs = localStorage.getItem('author_blogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    }
  }, []);

  // Get unique categories
  const categories = ['all', ...new Set(blogs.map(blog => blog.category))];

  const filteredBlogs = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || blog.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div style={styles.page}>
      {/* Hero Section - Matching Home Page */}
      <section style={styles.hero}>
        <div className="container">
          <h1 style={styles.title}>Blog & Articles</h1>
          <p style={styles.subtitle}>
            Insights, thoughts, and updates from my writing journey
          </p>
          
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
        <div className="container" style={styles.mainLayout}>
          {/* Main Content */}
          <div style={styles.content}>
            {/* Category Filters */}
            <div style={styles.categoryFilters}>
              {categories.map(category => (
                <button
                  key={category}
                  style={selectedCategory === category ? styles.activeCategory : styles.categoryButton}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category === 'all' ? 'All Posts' : category}
                  {category !== 'all' && (
                    <span style={styles.categoryCount}>
                      ({blogs.filter(b => b.category === category).length})
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Blog Posts */}
            <div style={styles.postsGrid}>
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map(post => (
                  <article key={post.id} style={styles.postCard}>
                    <div style={styles.postImage}>
                      {post.image ? (
                        <img src={post.image} alt={post.title} style={styles.postImg} />
                      ) : (
                        <div style={styles.imagePlaceholder}>
                          {post.category.charAt(0)}
                        </div>
                      )}
                      <div style={styles.postCategory}>{post.category}</div>
                    </div>
                    <div style={styles.postContent}>
                      <div style={styles.postMeta}>
                        <span style={styles.date}>{formatDate(post.date)}</span>
                        <span style={styles.categoryTag}>{post.category}</span>
                        {post.readTime && (
                          <span style={styles.readTime}>⏱️ {post.readTime}</span>
                        )}
                      </div>
                      <h2 style={styles.postTitle}>{post.title}</h2>
                      <p style={styles.postExcerpt}>{post.excerpt}</p>
                      <button 
                        onClick={() => navigate(`/blog/${post.id}`)}
                        style={styles.readMore}
                      >
                        Read Full Article →
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <div style={styles.noResults}>
                  <h3>No articles found</h3>
                  <p>Try a different search term or category</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <aside style={styles.sidebar}>
            <h3 style={styles.sidebarTitle}>Categories</h3>
            <ul style={styles.categories}>
              {categories.filter(c => c !== 'all').map(category => (
                <li key={category} style={styles.categoryItem}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    style={selectedCategory === category ? styles.activeCategoryLink : styles.categoryLink}
                  >
                    {category}
                    <span style={styles.categorySidebarCount}>
                      ({blogs.filter(b => b.category === category).length})
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            {/* Newsletter Signup */}
            <div style={styles.newsletterBox}>
              <h4 style={styles.newsletterTitle}>Stay Updated</h4>
              <p>Get updates on new articles and book releases</p>
              <form style={styles.newsletterForm}>
                <input
                  type="email"
                  placeholder="Your email address"
                  style={styles.newsletterInput}
                />
                <button type="submit" style={styles.newsletterButton}>
                  Subscribe
                </button>
              </form>
            </div>

            {/* Recent Posts */}
            <div style={styles.recentPosts}>
              <h4 style={styles.recentTitle}>Recent Articles</h4>
              {blogs.slice(0, 5).map(post => (
                <div 
                  key={post.id} 
                  style={styles.recentPost}
                  onClick={() => navigate(`/blog/${post.id}`)}
                >
                  <h5 style={styles.recentPostTitle}>{post.title}</h5>
                  <span style={styles.recentPostDate}>{formatDate(post.date)}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}

const styles = {
  page: { 
    paddingTop: '80px',
    backgroundColor: '#f8fafc'
  },
  hero: {
    background: '#f8f9fa',
    padding: '80px 0',
    textAlign: 'center',
    color: 'white'
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
    fontWeight: '800',
    background: '#2c3e50',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
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
    border: 'none',
    borderRadius: '50px',
    outline: 'none',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
  },
  blogSection: {
    padding: '80px 0'
  },
  mainLayout: {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: '40px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px'
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  categoryFilters: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  categoryButton: {
    padding: '10px 20px',
    backgroundColor: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
    color: '#4a5568',
    transition: 'all 0.3s'
  },
  activeCategory: {
    padding: '10px 20px',
    backgroundColor: '#667eea',
    color: 'white',
    border: '2px solid #667eea',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500'
  },
  categoryCount: {
    marginLeft: '5px',
    fontSize: '12px',
    opacity: '0.8',
    background: 'rgba(255,255,255,0.2)',
    padding: '2px 8px',
    borderRadius: '10px'
  },
  postsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '40px'
  },
  postCard: {
    backgroundColor: 'white',
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
    transition: 'all 0.3s'
  },
  postImage: {
    height: '200px',
    backgroundColor: '#2c3e50',
    position: 'relative',
    overflow: 'hidden'
  },
  postImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s'
  },
  imagePlaceholder: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '48px',
    background: 'linear-gradient(45deg, #667eea, #764ba2)'
  },
  postCategory: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    background: 'rgba(102, 126, 234, 0.9)',
    color: 'white',
    padding: '5px 15px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600'
  },
  postContent: {
    padding: '25px'
  },
  postMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    fontSize: '14px',
    color: '#666',
    flexWrap: 'wrap',
    gap: '10px'
  },
  categoryTag: {
    backgroundColor: '#e8f4fc',
    color: '#2980b9',
    padding: '4px 12px',
    borderRadius: '15px',
    fontSize: '12px',
    fontWeight: '500'
  },
  postTitle: {
    fontSize: '1.3rem',
    marginBottom: '15px',
    color: '#2c3e50',
    lineHeight: '1.4',
    fontWeight: '600'
  },
  postExcerpt: {
    lineHeight: '1.6',
    marginBottom: '20px',
    color: '#555'
  },
  readMore: {
    color: '#667eea',
    fontWeight: '600',
    textDecoration: 'none',
    display: 'inline-block',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    padding: '0',
    transition: 'all 0.3s'
  },
  noResults: {
    textAlign: 'center',
    padding: '50px',
    gridColumn: '1 / -1',
    color: '#7f8c8d',
    backgroundColor: 'white',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  sidebarTitle: {
    fontSize: '1.2rem',
    marginBottom: '15px',
    color: '#2c3e50',
    fontWeight: '600'
  },
  categories: {
    listStyle: 'none',
    padding: '0'
  },
  categoryItem: {
    marginBottom: '8px'
  },
  categoryLink: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '12px 15px',
    backgroundColor: 'white',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#555',
    borderRadius: '8px',
    transition: 'all 0.3s',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
  },
  activeCategoryLink: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    padding: '12px 15px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '14px',
    borderRadius: '8px',
    fontWeight: '500',
    boxShadow: '0 5px 15px rgba(102, 126, 234, 0.3)'
  },
  categorySidebarCount: {
    fontSize: '12px',
    opacity: '0.8',
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: '2px 8px',
    borderRadius: '10px'
  },
  newsletterBox: {
    backgroundColor: '#f0f7ff',
    padding: '25px',
    borderRadius: '15px',
    border: '1px solid #d1e9ff'
  },
  newsletterTitle: {
    marginBottom: '10px',
    color: '#1e40af',
    fontSize: '1.1rem'
  },
  newsletterForm: {
    marginTop: '15px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  newsletterInput: {
    padding: '12px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '14px'
  },
  newsletterButton: {
    padding: '12px',
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.3s'
  },
  recentPosts: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
  },
  recentTitle: {
    marginBottom: '15px',
    color: '#2c3e50',
    fontSize: '1.1rem'
  },
  recentPost: {
    padding: '15px 0',
    borderBottom: '1px solid #f0f0f0',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  recentPostTitle: {
    fontSize: '14px',
    marginBottom: '5px',
    color: '#333',
    fontWeight: '500'
  },
  recentPostDate: {
    fontSize: '12px',
    color: '#888'
  }
};

// Add hover effects to match Home page
Object.assign(styles.categoryButton, {
  ':hover': {
    borderColor: '#667eea',
    color: '#667eea'
  }
});

Object.assign(styles.postCard, {
  ':hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 40px rgba(0,0,0,0.12)'
  }
});

Object.assign(styles.postCard[':hover'], styles.postImg, {
  transform: 'scale(1.05)'
});

Object.assign(styles.readMore, {
  ':hover': {
    color: '#5a6fd8'
  }
});

Object.assign(styles.categoryLink, {
  ':hover': {
    backgroundColor: '#f0f7ff',
    color: '#667eea'
  }
});

Object.assign(styles.newsletterButton, {
  ':hover': {
    backgroundColor: '#5a6fd8',
    transform: 'translateY(-2px)'
  }
});

Object.assign(styles.recentPost, {
  ':hover': {
    backgroundColor: '#f8fafc',
    paddingLeft: '10px'
  }
});

export default Blog;