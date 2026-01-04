import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Books from './pages/Books';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import BlogArticle from './pages/BlogArticle';
//import './styles.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAdmin') === 'true'
  );

  useEffect(() => {
    // Check authentication status on app load
    const authStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAuthenticated(authStatus);
  }, []);

  const handleLogin = (password) => {
    // Change this password for production!
    if (password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('isAdmin', 'true');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAdmin');
  };

  return (
    <Router>
      <div className="App">
        {/* Pass authentication state and logout handler to Navbar */}
        <Navbar 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout} 
        />
        
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogArticle />} />
          <Route path="/books" element={<Books />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route 
            path="/login" 
            element={<Login onLogin={handleLogin} />} 
          />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Admin />
              </ProtectedRoute>
            } 
          />
        </Routes>
        
        {/* Pass authentication state and logout handler to Footer */}
        <Footer 
          isAuthenticated={isAuthenticated} 
          onLogout={handleLogout} 
        />
      </div>
      
    </Router>
  );
}

export default App;