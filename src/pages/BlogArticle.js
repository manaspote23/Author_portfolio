import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BlogArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedBlogs = localStorage.getItem('author_blogs');
    if (savedBlogs) {
      const allArticles = JSON.parse(savedBlogs);
      const foundArticle = allArticles.find(article => article.id.toString() === id);
      
      if (foundArticle) {
        setArticle(foundArticle);
        
        // Find related articles (same category)
        const related = allArticles
          .filter(a => a.id !== foundArticle.id && a.category === foundArticle.category)
          .slice(0, 3);
        setRelatedArticles(related);
      }
    }
    setIsLoading(false);
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading article...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div style={styles.notFound}>
        <h2>Article Not Found</h2>
        <p>The article you're looking for doesn't exist or has been removed.</p>
        <button onClick={() => navigate('/blog')} style={styles.backButton}>
          ← Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Article Header */}
      <div style={styles.header}>
        <div className="container" style={styles.headerContent}>
          <button onClick={() => navigate('/blog')} style={styles.backLink}>
            ← Back to Articles
          </button>
          
          <div style={styles.articleMeta}>
            <span style={styles.category}>{article.category}</span>
            <span style={styles.date}>📅 {formatDate(article.date)}</span>
            {article.readTime && (
              <span style={styles.readTime}>⏱️ {article.readTime}</span>
            )}
          </div>
          
          <h1 style={styles.title}>{article.title}</h1>
          <p style={styles.excerpt}>{article.excerpt}</p>
        </div>
      </div>

      {/* Article Content */}
      <div className="container" style={styles.contentWrapper}>
        <div style={styles.content}>
          {article.image && (
            <div style={styles.featuredImage}>
              <img src={article.image} alt={article.title} style={styles.mainImage} />
            </div>
          )}
          
          <div 
            style={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: article.content || article.excerpt }}
          />
          
          <div style={styles.articleFooter}>
            <button onClick={() => navigate('/blog')} style={styles.backToBlog}>
              ← Back to Blog
            </button>
            <div style={styles.shareButtons}>
              <span>Share: </span>
              <button style={styles.shareButton}>Twitter</button>
              <button style={styles.shareButton}>Facebook</button>
              <button style={styles.shareButton}>LinkedIn</button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside style={styles.sidebar}>
          {/* Author Info */}
          <div style={styles.authorBox}>
            <h3 style={styles.sidebarTitle}>About the Author</h3>
            <div style={styles.authorInfo}>
              <div style={styles.authorAvatar}>MP</div>
              <div>
                <h4 style={styles.authorName}>Manish Pandey</h4>
                <p style={styles.authorBio}>
                  Award-winning author sharing insights from my writing journey.
                </p>
              </div>
            </div>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div style={styles.relatedArticles}>
              <h3 style={styles.sidebarTitle}>Related Articles</h3>
              <div style={styles.relatedList}>
                {relatedArticles.map(related => (
                  <div 
                    key={related.id} 
                    style={styles.relatedItem}
                    onClick={() => navigate(`/blog/${related.id}`)}
                  >
                    <h4 style={styles.relatedTitle}>{related.title}</h4>
                    <div style={styles.relatedMeta}>
                      <span>{formatDate(related.date)}</span>
                      <span>{related.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Newsletter */}
          <div style={styles.newsletter}>
            <h3 style={styles.sidebarTitle}>Never Miss an Update</h3>
            <p>Subscribe to get more content like this delivered to your inbox.</p>
            <form style={styles.newsletterForm}>
              <input type="email" placeholder="Your email" style={styles.newsletterInput} />
              <button type="submit" style={styles.newsletterButton}>Subscribe</button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}

const styles = {
  page: {
    paddingTop: '80px',
    backgroundColor: '#f8fafc',
    minHeight: '100vh'
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: '#666'
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #f3f3f3',
    borderTop: '5px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '20px'
  },
  notFound: {
    textAlign: 'center',
    padding: '100px 20px',
    maxWidth: '600px',
    margin: '0 auto'
  },
  backButton: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '20px',
    fontSize: '16px',
    fontWeight: '500'
  },
  header: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '60px 0 40px'
  },
  headerContent: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '0 20px'
  },
  backLink: {
    background: 'rgba(255,255,255,0.1)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '25px',
    cursor: 'pointer',
    marginBottom: '30px',
    fontSize: '14px',
    transition: 'all 0.3s'
  },
  articleMeta: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  category: {
    background: 'rgba(255,255,255,0.2)',
    padding: '8px 20px',
    borderRadius: '20px',
    fontSize: '14px',
    fontWeight: '500'
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    opacity: '0.9',
    fontSize: '14px'
  },
  readTime: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    opacity: '0.9',
    fontSize: '14px'
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    lineHeight: '1.2',
    fontWeight: '800'
  },
  excerpt: {
    fontSize: '1.2rem',
    opacity: '0.9',
    marginBottom: '30px',
    lineHeight: '1.6'
  },
  contentWrapper: {
    display: 'grid',
    gridTemplateColumns: '1fr 350px',
    gap: '50px',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 20px'
  },
  content: {
    backgroundColor: 'white',
    padding: '50px',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.05)'
  },
  featuredImage: {
    marginBottom: '40px',
    borderRadius: '15px',
    overflow: 'hidden'
  },
  mainImage: {
    width: '100%',
    height: '400px',
    objectFit: 'cover'
  },
  articleContent: {
    fontSize: '18px',
    lineHeight: '1.8',
    color: '#333',
    marginBottom: '40px'
  },
  articleFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '30px',
    borderTop: '1px solid #eee'
  },
  backToBlog: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.3s'
  },
  shareButtons: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  shareButton: {
    background: '#f8f9fa',
    color: '#2c3e50',
    border: '1px solid #ddd',
    padding: '8px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'all 0.3s'
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    position: 'sticky',
    top: '100px',
    height: 'fit-content'
  },
  authorBox: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
  },
  sidebarTitle: {
    fontSize: '1.2rem',
    color: '#2c3e50',
    marginBottom: '20px',
    fontWeight: '600'
  },
  authorInfo: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center'
  },
  authorAvatar: {
    width: '60px',
    height: '60px',
    backgroundColor: '#667eea',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold'
  },
  authorName: {
    color: '#2c3e50',
    marginBottom: '5px'
  },
  authorBio: {
    color: '#666',
    fontSize: '14px',
    lineHeight: '1.5'
  },
  relatedArticles: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '15px',
    boxShadow: '0 5px 20px rgba(0,0,0,0.05)'
  },
  relatedList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  relatedItem: {
    padding: '15px',
    backgroundColor: '#f8fafc',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s'
  },
  relatedTitle: {
    fontSize: '14px',
    color: '#2c3e50',
    marginBottom: '8px',
    lineHeight: '1.4'
  },
  relatedMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '12px',
    color: '#666'
  },
  newsletter: {
    backgroundColor: '#667eea',
    color: 'white',
    padding: '25px',
    borderRadius: '15px',
    textAlign: 'center'
  },
  newsletterForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '20px'
  },
  newsletterInput: {
    padding: '14px',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px'
  },
  newsletterButton: {
    padding: '14px',
    backgroundColor: 'white',
    color: '#667eea',
    border: 'none',
    borderRadius: '8px',
    fontSize: '15px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s'
  }
};

// Add animations
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

// Add hover effects
Object.assign(styles.backLink, {
  ':hover': {
    background: 'rgba(255,255,255,0.2)'
  }
});

Object.assign(styles.backToBlog, {
  ':hover': {
    backgroundColor: '#5a6fd8',
    transform: 'translateY(-2px)'
  }
});

Object.assign(styles.shareButton, {
  ':hover': {
    backgroundColor: '#667eea',
    color: 'white',
    borderColor: '#667eea'
  }
});

Object.assign(styles.relatedItem, {
  ':hover': {
    backgroundColor: '#f0f7ff',
    transform: 'translateX(5px)'
  }
});

Object.assign(styles.newsletterButton, {
  ':hover': {
    backgroundColor: '#f8f9fa',
    transform: 'translateY(-2px)'
  }
});

export default BlogArticle;