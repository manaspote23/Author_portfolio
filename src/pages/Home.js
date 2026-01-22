import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-inner">

          {/* LEFT CONTENT */}
          <div className="hero-text">
            <span className="author-role">
              Author • Essayist • Storyteller
            </span>

            <h1 className="author-name">
              Mahendra Pandey
            </h1>

            <p className="author-desc">
              I write fiction and reflective essays exploring silence, memory,
              human vulnerability, and the beauty of ordinary lives.
              <br /><br />
              My stories live in the pauses — the thoughts left unsaid,
              the emotions that linger long after the last page.
            </p>

            <div className="hero-actions">
              <button onClick={() => navigate("/books")}>
                Explore Books
              </button>

              <button
                className="secondary"
                onClick={() => navigate("/about")}
              >
                About the Author
              </button>
            </div>
          </div>

          {/* RIGHT IMAGE CARD */}
          <div className="hero-image">
            <div className="image-frame">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?w=800"
                alt="Author portrait"
              />
            </div>
          </div>

        </div>
      </section>

      {/* ================= THEMES ================= */}
      <section className="themes">
        <h2>Recurring Themes</h2>

        <div className="themes-grid">
          <div>Silence & Solitude</div>
          <div>Memory & Identity</div>
          <div>Human Vulnerability</div>
          <div>Ordinary Lives</div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta">
        <h2>Discover the Stories</h2>
        <p>
          Explore my books, essays, and ongoing literary work.
        </p>

        <button onClick={() => navigate("/books")}>
          View All Works
        </button>
      </section>

    </div>
  );
}

export default Home;
