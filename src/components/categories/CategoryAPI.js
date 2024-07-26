import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Categories.css'; 

const CategoryAPI = () => {

  const [categories, setCategories] = useState([]);
  const [totalCategories, setTotalCategories] = useState(0);
  
 
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    amount: '',
    notes: '',
  });
  
  const [editCategory, setEditCategory] = useState(null);
  

  useEffect(() => {
    fetchCategories();
  }, []);

  
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:9001/categories');
      setCategories(response.data);
      setTotalCategories(response.data.length);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleAddOrUpdateCategory = async () => {
    if (editCategory) {
      
      try {
        await axios.put(`http://localhost:9001/categories/${editCategory.id}`, categoryForm);
        console.log('Category updated successfully');
        setEditCategory(null); 
      } catch (error) {
        console.error('Error updating category:', error);
      }
    } else {
   
      try {
        await axios.post('http://localhost:9001/categories', categoryForm);
        console.log('Category added successfully');
      } catch (error) {
        console.error('Error adding category:', error);
      }
    }
    fetchCategories(); 
    setCategoryForm({ name: '', amount: '', notes: '' }); 
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  
  const handleEditClick = (category) => {
    setEditCategory(category);
    setCategoryForm({
      name: category.name,
      amount: category.amount,
      notes: category.notes,
    });
  };

  // Delete a category
  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:9001/categories/${id}`);
      console.log('Category deleted successfully');
      fetchCategories(); 
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };
  return (
    <div className="categories-page">
      <h1>Categories</h1>
      <div className="total-categories">Total Categories: {totalCategories}</div>
      
      <div className="categories-list">
        <div className="category-header">
          <div className="header-item">Name</div>
          <div className="header-item">Amount</div>
          <div className="header-item">Notes</div>
          <div className="header-item">Actions</div>
        </div>
        {categories.map((category) => (
          <div className="category-row" key={category.id}>
            <div className="row-item">{category.name}</div>
            <div className="row-item">${category.amount}</div>
            <div className="row-item">{category.notes}</div>
            <div className="row-item">
              <button onClick={() => handleEditClick(category)}>Edit</button>
              <button onClick={() => handleDeleteClick(category.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="add-category-form">
        <h2>{editCategory ? 'Edit Category' : 'Add Category'}</h2>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={categoryForm.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={categoryForm.amount}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="notes"
          placeholder="Notes"
          value={categoryForm.notes}
          onChange={handleInputChange}
          required
        />
        <button className="add-category-button" onClick={handleAddOrUpdateCategory}>
          {editCategory ? 'Update Category' : 'Add Category'}
        </button>
        {editCategory && (
          <button
            className="cancel-button"
            onClick={() => {
              setEditCategory(null);
              setCategoryForm({ name: '', amount: '', notes: '' });
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default CategoryAPI;
