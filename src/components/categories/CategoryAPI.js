import './Categories.css';
import React, { useState } from 'react';
import axios from 'axios';
// import { getToken } from '../auth/useAuth';

function CategoryAPI() {
  const data = { name: "", budget: "" };
  const [inputData, setInputData] = useState(data);
  const [categoryId, setCategoryId] = useState(""); 
  const [fetchedCategory, setFetchedCategory] = useState(data); 

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAzLCJpYXQiOjE3MjI1OTYzNjIsImV4cCI6MTczOTg3NjM2Mn0.LDlhw01AGqL6vxCaoPlHQIyQxDB8IVglzugdOq2PffA';

  const handleData = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:9001/addcategory", inputData, {
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
  };

  // const handleUpdate =(e) =>{
  //   e.preventDefault();
  //   const token = ''; 

  //   axios.put("http://localhost:9001/updatecategory/1" ,inputData , {
  //     headers: {
  //       'Authorization': `Bearer ${token}`, 
  //       'Content-Type': 'application/json' 
  //     }
  //   })

  //   .then((response)=>{
  //     console.log(response)
  //   })
  // }

  const handleDelete =(e) =>{
    e.preventDefault();
    axios.delete("http://localhost:9001/deletecat/1" ,{
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
      }
    })
    .then((response) =>{
      console.log(response)
    });
  }

  const handleFetch = (e) => {
    e.preventDefault();

    axios.get(`http://localhost:9001/categories/${categoryId}`, {
      headers: {
        'Authorization': `Bearer ${token()}`
      }
    })
    .then((response) => {
      setFetchedCategory(response.data);
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
  };

  return (
    <>
      <label>Name: </label>
      <input type="text" name='name' value={inputData.name} onChange={handleData} /><br />

      <label>Budget: </label>
      <input type="number" name='budget' value={inputData.budget} onChange={handleData} /><br />
      <button onClick={handleSubmit}>submit</button>
      {/* <button onClick={handleUpdate}>Update</button> */}
      <button onClick={handleDelete}>Delete</button>
      <br /><br />
      <label>Category ID to Fetch: </label>
      <input 
        type="text" 
        value={categoryId} 
        onChange={(e) => setCategoryId(e.target.value)} 
      /><br />
      <button onClick={handleFetch}>Fetch Category</button>

      <div>
        <h3>Fetched Category Data:</h3>
        <p>Name: {fetchedCategory.name}</p>
        <p>Budget: {fetchedCategory.budget}</p>
      </div>
    </>
  );
}

export default CategoryAPI;


