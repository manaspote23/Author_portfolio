import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* ================= HERO ================= */}
      <section className="hero">
        <div className="hero-content">

          <span className="author-role">
            Author • Essayist • Storyteller
          </span>

          <h1 className="author-name">
            Mahendra Pandey
          </h1>

          <h2 className="author-tagline">
            Stories written in quiet voices, meant to stay long after the last page.
          </h2>

          <p className="author-desc">
            I write fiction and reflective essays exploring silence, memory,
            human vulnerability, and the beauty of ordinary lives.
            My work focuses on the moments people often overlook —
            the pauses, the thoughts left unsaid, and the emotions beneath them.
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
