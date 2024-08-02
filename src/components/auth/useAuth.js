// src/auth.js

// Function to get the token from localStorage or other storage mechanism
export const getToken = () => {
  return localStorage.getItem('authToken');
};

// Function to set the token in localStorage or other storage mechanism
export const setToken = (token) => {
  localStorage.setItem('authToken', token);
};

// Function to remove the token from localStorage or other storage mechanism
export const removeToken = () => {
  localStorage.removeItem('authToken');
};
