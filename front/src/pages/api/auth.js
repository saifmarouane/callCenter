// src/api/auth.js

export const loginUser = async (email, password) => {
    const response = await fetch('http://localhost:8000/api/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.json();
    return data;
  };
  
  export const registerUser = async (userData) => {
    const response = await fetch('http://localhost:8000/api/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  
    const data = await response.json();
    return data;
  };
  
  // ... autres fonctions d'authentification si nécessaire
  