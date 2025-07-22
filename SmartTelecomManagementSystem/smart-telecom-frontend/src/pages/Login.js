import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../service/AuthService';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     try {
//       const token = await login({ email, password });
//       localStorage.setItem('token', token);
//       navigate('/dashboard');
//     } catch (err) {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Login</h2>
//         <form onSubmit={handleSubmit} style={styles.form}>
//           <label style={styles.label}>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             required
//             style={styles.input}
//             placeholder="you@example.com"
//           />

//           <label style={styles.label}>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//             style={styles.input}
//             placeholder="Enter your password"
//           />

//           <button type="submit" style={styles.button}>Login</button>
//         </form>
//         {error && <p style={styles.error}>{error}</p>}
//       </div>
//     </div>
//   );
// }

const styles = {
  page: {
    display: 'flex',
    height: '100vh',
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
};

// export default Login;


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const token = await login({ username, password }); // updated key
      localStorage.setItem('token', token);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter your username"
          />

          <label style={styles.label}>Password</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={styles.input}
            placeholder="Enter your password"
          />

          <button type="submit" style={styles.button}>Login</button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
}

export default Login;
