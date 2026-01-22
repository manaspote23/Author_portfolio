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
      const foundArticle = allArticles.find(
        a => a.id.toString() === id
      );

      if (foundArticle) {
        setArticle(foundArticle);
        const related = allArticles
          .filter(
            a =>
              a.id !== foundArticle.id &&
              a.category === foundArticle.category
          )
          .slice(0, 3);
        setRelatedArticles(related);
      }
    }
    setIsLoading(false);
  }, [id]);

  const formatDate = date =>
    new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

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
        <button
          style={styles.backButton}
          onClick={() => navigate('/blog')}
        >
          ← Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          <button
            style={styles.backLink}
            onClick={() => navigate('/blog')}
          >
            ← Back to Articles
          </button>

          <div style={styles.articleMeta}>
            <span style={styles.category}>{article.category}</span>
            <span>📅 {formatDate(article.date)}</span>
            {article.readTime && <span>⏱ {article.readTime}</span>}
          </div>

          <h1 style={styles.title}>{article.title}</h1>
          <p style={styles.excerpt}>{article.excerpt}</p>
        </div>
      </div>

      {/* Content */}
      <div style={styles.contentWrapper}>
        <div style={styles.content}>
          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              style={styles.mainImage}
            />
          )}

          <div
            style={styles.articleContent}
            dangerouslySetInnerHTML={{
              __html: article.content || article.excerpt
            }}
          />

          <div style={styles.articleFooter}>
            <button
              style={styles.backToBlog}
              onMouseEnter={e =>
                (e.target.style.background = '#5a6fd8')
              }
              onMouseLeave={e =>
                (e.target.style.background = '#667eea')
              }
              onClick={() => navigate('/blog')}
            >
              ← Back to Blog
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.authorBox}>
            <h3>About the Author</h3>
            <p>
              <strong>Manish Pandey</strong>
              <br />
              Award-winning author sharing insights from writing.
            </p>
          </div>

          {relatedArticles.length > 0 && (
            <div style={styles.relatedArticles}>
              <h3>Related Articles</h3>
              {relatedArticles.map(r => (
                <div
                  key={r.id}
                  style={styles.relatedItem}
                  onMouseEnter={e =>
                    (e.currentTarget.style.background =
                      '#f0f7ff')
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.background =
                      '#f8fafc')
                  }
                  onClick={() =>
                    navigate(`/blog/${r.id}`)
                  }
                >
                  <strong>{r.title}</strong>
                  <div style={styles.relatedMeta}>
                    <span>{formatDate(r.date)}</span>
                    <span>{r.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

const styles = {
  page: {
    paddingTop: '80px',
    background: '#f8fafc',
    minHeight: '100vh'
  },
  loading: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #eee',
    borderTop: '5px solid #667eea',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  notFound: {
    textAlign: 'center',
    padding: '100px'
  },
  backButton: {
    marginTop: '20px',
    padding: '12px 25px',
    background: '#667eea',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  header: {
    background:
      'linear-gradient(135deg,#667eea,#764ba2)',
    color: 'white',
    padding: '60px 20px'
  },
  headerContent: {
    maxWidth: '800px',
    margin: '0 auto'
  },
  backLink: {
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '20px',
    cursor: 'pointer'
  },
  articleMeta: {
    display: 'flex',
    gap: '15px',
    margin: '20px 0'
  },
  category: {
    background: 'rgba(255,255,255,0.25)',
    padding: '5px 15px',
    borderRadius: '15px'
  },
  title: {
    fontSize: '2.5rem'
  },
  excerpt: {
    fontSize: '1.1rem',
    opacity: 0.9
  },
  contentWrapper: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '60px 20px',
    display: 'grid',
    gridTemplateColumns: '1fr 350px',
    gap: '40px'
  },
  content: {
    background: 'white',
    padding: '40px',
    borderRadius: '15px'
  },
  mainImage: {
    width: '100%',
    borderRadius: '10px',
    marginBottom: '30px'
  },
  articleContent: {
    lineHeight: '1.8',
    fontSize: '17px'
  },
  articleFooter: {
    marginTop: '30px'
  },
  backToBlog: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '12px 25px',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  authorBox: {
    background: 'white',
    padding: '25px',
    borderRadius: '15px'
  },
  relatedArticles: {
    background: 'white',
    padding: '25px',
    borderRadius: '15px'
  },
  relatedItem: {
    padding: '15px',
    background: '#f8fafc',
    borderRadius: '10px',
    marginBottom: '15px',
    cursor: 'pointer'
  },
  relatedMeta: {
    fontSize: '12px',
    color: '#666',
    display: 'flex',
    justifyContent: 'space-between'
  }
};

export default BlogArticle;
