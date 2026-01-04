import { useState, useEffect } from 'react';
import booksData from '../data/booksData';
import blogPosts from '../data/blogPosts';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('books');
  const [books, setBooks] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  
  // Form state for books
  const [bookForm, setBookForm] = useState({
    id: Date.now(),
    title: '',
    subtitle: '',
    coverImage: '',
    description: '',
    fullDescription: '',
    year: new Date().getFullYear().toString(),
    pages: '',
    genre: 'fiction',
    pdfFile: '',
    amazonLink: '',
    goodreadsLink: ''
  });
  
  // Form state for blogs
  const [blogForm, setBlogForm] = useState({
    id: Date.now(),
    title: '',
    excerpt: '',
    content: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Writing Tips',
    image: '',
    readTime: '5 min read'
  });

  // Load initial data
  useEffect(() => {
    const savedBooks = localStorage.getItem('author_books');
    const savedBlogs = localStorage.getItem('author_blogs');
    
    if (savedBooks) {
      setBooks(JSON.parse(savedBooks));
    } else {
      setBooks(booksData);
      localStorage.setItem('author_books', JSON.stringify(booksData));
    }
    
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    } else {
      setBlogs(blogPosts);
      localStorage.setItem('author_blogs', JSON.stringify(blogPosts));
    }
  }, []);

  // Save data
  const saveData = (type) => {
    if (type === 'books') {
      localStorage.setItem('author_books', JSON.stringify(books));
    } else {
      localStorage.setItem('author_blogs', JSON.stringify(blogs));
    }
    alert(`${type} saved successfully!`);
  };

  // Add new book
  const handleAddBook = () => {
    const newBook = {
      ...bookForm,
      id: Date.now()
    };
    setBooks([...books, newBook]);
    setBookForm({
      id: Date.now(),
      title: '',
      subtitle: '',
      coverImage: '',
      description: '',
      fullDescription: '',
      year: new Date().getFullYear().toString(),
      pages: '',
      genre: 'fiction',
      pdfFile: '',
      amazonLink: '',
      goodreadsLink: ''
    });
  };

  // Add new blog
  const handleAddBlog = () => {
    const newBlog = {
      ...blogForm,
      id: Date.now()
    };
    setBlogs([...blogs, newBlog]);
    setBlogForm({
      id: Date.now(),
      title: '',
      excerpt: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Writing Tips',
      image: '',
      readTime: '5 min read'
    });
  };

  // Edit item
  const handleEdit = (item, type) => {
    if (type === 'book') {
      setEditingItem({ ...item, type: 'book' });
      setBookForm(item);
    } else {
      setEditingItem({ ...item, type: 'blog' });
      setBlogForm(item);
    }
  };

  // Update item
  const handleUpdate = () => {
    if (editingItem.type === 'book') {
      setBooks(books.map(book => 
        book.id === editingItem.id ? bookForm : book
      ));
    } else {
      setBlogs(blogs.map(blog => 
        blog.id === editingItem.id ? blogForm : blog
      ));
    }
    setEditingItem(null);
    setBookForm({
      id: Date.now(),
      title: '',
      subtitle: '',
      coverImage: '',
      description: '',
      fullDescription: '',
      year: new Date().getFullYear().toString(),
      pages: '',
      genre: 'fiction',
      pdfFile: '',
      amazonLink: '',
      goodreadsLink: ''
    });
    setBlogForm({
      id: Date.now(),
      title: '',
      excerpt: '',
      content: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Writing Tips',
      image: '',
      readTime: '5 min read'
    });
  };

  // Delete item
  const handleDelete = (id, type) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (type === 'book') {
        setBooks(books.filter(book => book.id !== id));
      } else {
        setBlogs(blogs.filter(blog => blog.id !== id));
      }
    }
  };

  // Export data (for backup)
  const exportData = () => {
    const data = {
      books,
      blogs,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `author-portfolio-backup-${Date.now()}.json`;
    a.click();
  };

  // Import data
  const importData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.books) {
          setBooks(data.books);
          localStorage.setItem('author_books', JSON.stringify(data.books));
        }
        if (data.blogs) {
          setBlogs(data.blogs);
          localStorage.setItem('author_blogs', JSON.stringify(data.blogs));
        }
        alert('Data imported successfully!');
      } catch (error) {
        alert('Error importing data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>📚 Author Portfolio Admin</h1>
        <p>Manage your books and blog posts directly from here</p>
      </div>

      {/* Tabs */}
      <div style={styles.tabs}>
        <button
          onClick={() => setActiveTab('books')}
          style={activeTab === 'books' ? styles.activeTab : styles.tab}
        >
          📖 Books ({books.length})
        </button>
        <button
          onClick={() => setActiveTab('blogs')}
          style={activeTab === 'blogs' ? styles.activeTab : styles.tab}
        >
          ✍️ Blog Posts ({blogs.length})
        </button>
        <button
          onClick={exportData}
          style={styles.exportButton}
        >
          💾 Export Data
        </button>
        <label style={styles.importButton}>
          📥 Import Data
          <input
            type="file"
            accept=".json"
            onChange={importData}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {/* Forms */}
      <div style={styles.formSection}>
        <h2>{editingItem ? 'Edit' : 'Add New'} {activeTab === 'books' ? 'Book' : 'Blog Post'}</h2>
        
        {activeTab === 'books' ? (
          <div style={styles.form}>
            <div style={styles.formRow}>
              <input
                type="text"
                placeholder="Book Title *"
                value={bookForm.title}
                onChange={(e) => setBookForm({...bookForm, title: e.target.value})}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Subtitle"
                value={bookForm.subtitle}
                onChange={(e) => setBookForm({...bookForm, subtitle: e.target.value})}
                style={styles.input}
              />
            </div>
            
            <div style={styles.formRow}>
              <input
                type="text"
                placeholder="Cover Image URL"
                value={bookForm.coverImage}
                onChange={(e) => setBookForm({...bookForm, coverImage: e.target.value})}
                style={styles.input}
              />
              <select
                value={bookForm.genre}
                onChange={(e) => setBookForm({...bookForm, genre: e.target.value})}
                style={styles.select}
              >
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
                <option value="fantasy">Fantasy</option>
                <option value="romance">Romance</option>
                <option value="mystery">Mystery</option>
                <option value="biography">Biography</option>
              </select>
            </div>
            
            <div style={styles.formRow}>
              <input
                type="text"
                placeholder="Publication Year"
                value={bookForm.year}
                onChange={(e) => setBookForm({...bookForm, year: e.target.value})}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Number of Pages"
                value={bookForm.pages}
                onChange={(e) => setBookForm({...bookForm, pages: e.target.value})}
                style={styles.input}
              />
            </div>
            
            <div style={styles.formRow}>
              <input
                type="text"
                placeholder="Amazon Link"
                value={bookForm.amazonLink}
                onChange={(e) => setBookForm({...bookForm, amazonLink: e.target.value})}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Goodreads Link"
                value={bookForm.goodreadsLink}
                onChange={(e) => setBookForm({...bookForm, goodreadsLink: e.target.value})}
                style={styles.input}
              />
            </div>
            
            <textarea
              placeholder="Short Description *"
              value={bookForm.description}
              onChange={(e) => setBookForm({...bookForm, description: e.target.value})}
              style={styles.textarea}
              rows="3"
            />
            
            <textarea
              placeholder="Full Description (for book details page)"
              value={bookForm.fullDescription}
              onChange={(e) => setBookForm({...bookForm, fullDescription: e.target.value})}
              style={styles.textarea}
              rows="5"
            />
            
            <input
              type="text"
              placeholder="PDF File URL (optional)"
              value={bookForm.pdfFile}
              onChange={(e) => setBookForm({...bookForm, pdfFile: e.target.value})}
              style={styles.input}
            />
            
            <div style={styles.buttonGroup}>
              {editingItem ? (
                <button onClick={handleUpdate} style={styles.primaryButton}>
                  Update Book
                </button>
              ) : (
                <button onClick={handleAddBook} style={styles.primaryButton}>
                  Add Book
                </button>
              )}
              <button 
                onClick={() => {
                  setEditingItem(null);
                  setBookForm({
                    id: Date.now(),
                    title: '',
                    subtitle: '',
                    coverImage: '',
                    description: '',
                    fullDescription: '',
                    year: new Date().getFullYear().toString(),
                    pages: '',
                    genre: 'fiction',
                    pdfFile: '',
                    amazonLink: '',
                    goodreadsLink: ''
                  });
                }}
                style={styles.secondaryButton}
              >
                Clear Form
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.form}>
            <div style={styles.formRow}>
              <input
                type="text"
                placeholder="Blog Title *"
                value={blogForm.title}
                onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                style={styles.input}
              />
              <input
                type="text"
                placeholder="Featured Image URL"
                value={blogForm.image}
                onChange={(e) => setBlogForm({...blogForm, image: e.target.value})}
                style={styles.input}
              />
            </div>
            
            <div style={styles.formRow}>
              <input
                type="date"
                value={blogForm.date}
                onChange={(e) => setBlogForm({...blogForm, date: e.target.value})}
                style={styles.input}
              />
              <select
                value={blogForm.category}
                onChange={(e) => setBlogForm({...blogForm, category: e.target.value})}
                style={styles.select}
              >
                <option value="Writing Tips">Writing Tips</option>
                <option value="Book Updates">Book Updates</option>
                <option value="Author Life">Author Life</option>
                <option value="Events">Events</option>
                <option value="Inspiration">Inspiration</option>
                <option value="Writing Process">Writing Process</option>
              </select>
            </div>
            
            <textarea
              placeholder="Short Excerpt (appears in blog list) *"
              value={blogForm.excerpt}
              onChange={(e) => setBlogForm({...blogForm, excerpt: e.target.value})}
              style={styles.textarea}
              rows="3"
            />
            
            <textarea
              placeholder="Full Content (supports HTML) *"
              value={blogForm.content}
              onChange={(e) => setBlogForm({...blogForm, content: e.target.value})}
              style={styles.textarea}
              rows="8"
            />
            
            <div style={styles.buttonGroup}>
              {editingItem ? (
                <button onClick={handleUpdate} style={styles.primaryButton}>
                  Update Blog Post
                </button>
              ) : (
                <button onClick={handleAddBlog} style={styles.primaryButton}>
                  Add Blog Post
                </button>
              )}
              <button 
                onClick={() => {
                  setEditingItem(null);
                  setBlogForm({
                    id: Date.now(),
                    title: '',
                    excerpt: '',
                    content: '',
                    date: new Date().toISOString().split('T')[0],
                    category: 'Writing Tips',
                    image: '',
                    readTime: '5 min read'
                  });
                }}
                style={styles.secondaryButton}
              >
                Clear Form
              </button>
            </div>
          </div>
        )}
      </div>

      {/* List Items */}
      <div style={styles.listSection}>
        <h2>Existing {activeTab === 'books' ? 'Books' : 'Blog Posts'}</h2>
        
        {activeTab === 'books' ? (
          <div style={styles.itemsGrid}>
            {books.map(book => (
              <div key={book.id} style={styles.itemCard}>
                <div style={styles.itemHeader}>
                  {book.coverImage ? (
                    <img src={book.coverImage} alt={book.title} style={styles.itemImage} />
                  ) : (
                    <div style={styles.imagePlaceholder}>📚</div>
                  )}
                  <div style={styles.itemInfo}>
                    <h4 style={styles.itemTitle}>{book.title}</h4>
                    <p style={styles.itemSubtitle}>{book.subtitle}</p>
                    <div style={styles.itemMeta}>
                      <span style={styles.badge}>{book.genre}</span>
                      <span>{book.year}</span>
                    </div>
                  </div>
                </div>
                <p style={styles.itemDescription}>
                  {book.description?.substring(0, 100)}...
                </p>
                <div style={styles.itemActions}>
                  <button 
                    onClick={() => handleEdit(book, 'book')}
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(book.id, 'book')}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.itemsGrid}>
            {blogs.map(blog => (
              <div key={blog.id} style={styles.itemCard}>
                <div style={styles.itemHeader}>
                  <div style={styles.itemInfo}>
                    <h4 style={styles.itemTitle}>{blog.title}</h4>
                    <div style={styles.itemMeta}>
                      <span style={styles.badge}>{blog.category}</span>
                      <span>{blog.date}</span>
                    </div>
                  </div>
                </div>
                <p style={styles.itemDescription}>
                  {blog.excerpt?.substring(0, 150)}...
                </p>
                <div style={styles.itemActions}>
                  <button 
                    onClick={() => handleEdit(blog, 'blog')}
                    style={styles.editButton}
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDelete(blog.id, 'blog')}
                    style={styles.deleteButton}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Save Button */}
      <div style={styles.saveSection}>
        <button 
          onClick={() => saveData(activeTab)} 
          style={styles.saveButton}
        >
          💾 Save {activeTab === 'books' ? 'Books' : 'Blog Posts'} to Browser
        </button>
        <p style={styles.note}>
          <strong>Note:</strong> Data is saved in your browser's localStorage. 
          Use "Export Data" to backup your content. Changes appear immediately on your website.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '30px',
    maxWidth: '1400px',
    margin: '0 auto',
    backgroundColor: '#f8fafc',
    minHeight: '100vh'
  },
  header: {
    textAlign: 'center',
    marginBottom: '40px',
    paddingBottom: '20px',
    borderBottom: '2px solid #e2e8f0'
  },
  tabs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '30px',
    flexWrap: 'wrap'
  },
  tab: {
    padding: '12px 24px',
    backgroundColor: 'white',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500',
    transition: 'all 0.2s'
  },
  activeTab: {
    padding: '12px 24px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: '2px solid #3b82f6',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '500'
  },
  exportButton: {
    padding: '12px 24px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    marginLeft: 'auto'
  },
  importButton: {
    padding: '12px 24px',
    backgroundColor: '#8b5cf6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  formSection: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    marginBottom: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  formRow: {
    display: 'flex',
    gap: '20px'
  },
  input: {
    flex: 1,
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border 0.2s'
  },
  select: {
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    backgroundColor: 'white',
    minWidth: '200px'
  },
  textarea: {
    padding: '12px 16px',
    fontSize: '16px',
    border: '2px solid #e2e8f0',
    borderRadius: '8px',
    outline: 'none',
    resize: 'vertical',
    fontFamily: 'inherit',
    transition: 'border 0.2s'
  },
  buttonGroup: {
    display: 'flex',
    gap: '15px',
    marginTop: '10px'
  },
  primaryButton: {
    padding: '14px 28px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    transition: 'background-color 0.2s'
  },
  secondaryButton: {
    padding: '14px 28px',
    backgroundColor: '#64748b',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px'
  },
  listSection: {
    backgroundColor: 'white',
    padding: '30px',
    borderRadius: '12px',
    marginBottom: '30px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  },
  itemsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '25px',
    marginTop: '20px'
  },
  itemCard: {
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    padding: '20px',
    backgroundColor: '#f8fafc',
    transition: 'transform 0.2s, border-color 0.2s'
  },
  itemHeader: {
    display: 'flex',
    gap: '15px',
    marginBottom: '15px'
  },
  itemImage: {
    width: '80px',
    height: '100px',
    objectFit: 'cover',
    borderRadius: '6px'
  },
  imagePlaceholder: {
    width: '80px',
    height: '100px',
    backgroundColor: '#cbd5e1',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px'
  },
  itemInfo: {
    flex: 1
  },
  itemTitle: {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '5px',
    color: '#1e293b'
  },
  itemSubtitle: {
    fontSize: '14px',
    color: '#64748b',
    marginBottom: '10px'
  },
  itemMeta: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  badge: {
    backgroundColor: '#dbeafe',
    color: '#1d4ed8',
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '500'
  },
  itemDescription: {
    color: '#475569',
    lineHeight: '1.6',
    marginBottom: '20px'
  },
  itemActions: {
    display: 'flex',
    gap: '10px'
  },
  editButton: {
    padding: '8px 16px',
    backgroundColor: '#0ea5e9',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    flex: 1
  },
  deleteButton: {
    padding: '8px 16px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    flex: 1
  },
  saveSection: {
    textAlign: 'center',
    padding: '30px',
    backgroundColor: 'white',
    borderRadius: '12px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
  },
  saveButton: {
    padding: '16px 40px',
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  note: {
    marginTop: '20px',
    color: '#64748b',
    fontSize: '14px',
    lineHeight: '1.6'
  }
};

export default AdminPanel;