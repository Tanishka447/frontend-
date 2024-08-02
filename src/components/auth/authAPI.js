// import axios from 'axios';


export const loginUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:9001/login", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json", 
      },
      body: JSON.stringify(userData),
    });

    console.log('Response Status:', response.status);
    console.log('Response Headers:',Array.from(response.headers.entries()));
    if (!response.ok) {
      const errorMessage = await response.text();
      console.error('Error Message:', errorMessage); 
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorMessage}`);
    }
    const data = await response.json();
    console.log('Response Data:', data); 
    return data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:9001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NzAsImlhdCI6MTcyMTkxMDU4NywiZXhwIjoxNzIyMDgzMzg3fQ.f6fU7QM-9rI152lI0bim8hVf5CdZeJ6JUCDdKlkeiWw"
      },
      body: JSON.stringify(userData),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

