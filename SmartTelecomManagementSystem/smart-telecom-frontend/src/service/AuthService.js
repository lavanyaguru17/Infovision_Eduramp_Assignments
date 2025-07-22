import axios from 'axios';

// const API_URL = 'http://localhost:8080/auth';

// export async function login({ email, password }) {
//   const response = await axios.post(`${API_URL}/login`, { email, password });
//   return response.data.token;
// }

// src/service/AuthService.js
export async function login({ username, password }) {
  const response = await fetch('http://localhost:9001/auth/login', {  // backend URL
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  const data = await response.json();

  console.log("Lavanya",data);

  // Assuming your AuthResponse has a JWT token property called 'token'
  return data.token; 
}
