import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('customer');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:9001/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, role }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter username"
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter password"
          />

          <label style={styles.label}>Role</label>
          <select
            value={role}
            onChange={e => setRole(e.target.value)}
            style={styles.select}
          >
            <option value="customer">Customer</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            style={{ ...styles.button, opacity: loading ? 0.6 : 1 }}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {error && <p style={styles.error}>{error}</p>}
        {success && <p style={styles.success}>{success}</p>}

        <p style={{ marginTop: '1rem' }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  card: {
    backgroundColor: '#fff',
    padding: '2.5rem 3rem',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    width: '350px',
    textAlign: 'center',
  },
  title: {
    marginBottom: '1.5rem',
    color: '#333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.2rem',
  },
  label: {
    fontWeight: '600',
    textAlign: 'left',
    color: '#555',
  },
  input: {
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    border: '1.5px solid #ddd',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  select: {
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    border: '1.5px solid #ddd',
    fontSize: '1rem',
    outline: 'none',
  },
  button: {
    marginTop: '1rem',
    padding: '0.75rem',
    borderRadius: '8px',
    border: 'none',
    backgroundColor: '#667eea',
    color: '#fff',
    fontSize: '1.1rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  error: {
    marginTop: '1rem',
    color: 'red',
    fontWeight: '600',
  },
  success: {
    marginTop: '1rem',
    color: 'green',
    fontWeight: '600',
  },
};

export default Register;
