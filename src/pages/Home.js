import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate(); // For navigation to other pages

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Manish Pandey</h1>
          <p className="hero-subtitle">Award-winning writer and storyteller</p>
          <p className="hero-text">
            Welcome to my portfolio. Explore my books, read my blog, 
            and join me on this creative journey.
          </p>
          <div className="hero-buttons">
            {/* Fixed: Use navigate function instead of href */}
            <button 
              className="btn" 
              onClick={() => navigate('/books')}
            >
              View Books
            </button>
            
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/contact')}
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* Books Preview Section (Optional) */}
      <section id="books-preview" className="books-preview">
        <div className="container">
          <h2>Featured Books</h2>
          <div className="books-grid">
            {/* Add book previews here */}
          </div>
        </div>
      </section>

      {/* Contact Preview Section (Optional) */}
      <section id="contact-preview" className="contact-preview">
        <div className="container">
          <h2>Let's Connect</h2>
          {/* Add contact preview here */}
        </div>
      </section>
    </div>
  );
}

export default Home;