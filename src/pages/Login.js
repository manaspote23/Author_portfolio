import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin(password)) {
      navigate('/admin');
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginBox}>
        <h2>Admin Login</h2>
        <p style={styles.note}>Enter the admin password to access the dashboard</p>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError('');
            }}
            style={styles.input}
          />
          
          {error && <p style={styles.error}>{error}</p>}
          
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        
        <p style={styles.hint}>
          <strong>Default password:</strong> admin123
        </p>
        <p style={styles.warning}>
          ⚠️ Change this password in App.js for security!
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: '80px'
  },
  loginBox: {
    backgroundColor: 'white',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center'
  },
  note: {
    color: '#666',
    marginBottom: '30px',
    fontSize: '0.95rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  input: {
    padding: '15px',
    fontSize: '16px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border 0.2s'
  },
  error: {
    color: '#e74c3c',
    fontSize: '0.9rem',
    marginTop: '-10px'
  },
  button: {
    padding: '15px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s'
  },
  hint: {
    marginTop: '25px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    fontSize: '0.9rem',
    color: '#666'
  },
  warning: {
    marginTop: '15px',
    fontSize: '0.85rem',
    color: '#e67e22'
  }
};

export default Login;