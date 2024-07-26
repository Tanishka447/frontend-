import React, { useState, useEffect } from 'react';
import './ExpenseAPI.css';

const ExpenseAPI = () => {
  // State for managing expenses and form data
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ category: '', amount: '', date: '', notes: '' });
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // Initial load of expenses from API or local storage
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    // Replace with your API call to fetch expenses
    // const response = await axios.get('/api/expenses');
    // setExpenses(response.data);
    
    // For demonstration, using static data
    setExpenses([
      { category: 'Food', amount: 50, date: '2024-07-20', notes: 'Groceries' },
      { category: 'Transport', amount: 30, date: '2024-07-21', notes: 'Bus fare' },
    ]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      // Update expense
      const updatedExpenses = expenses.map((expense, index) =>
        index === editIndex ? form : expense
      );
      setExpenses(updatedExpenses);
      setEditIndex(null);
    } else {
      // Add new expense
      setExpenses([...expenses, form]);
    }
    setForm({ category: '', amount: '', date: '', notes: '' });
  };

  const handleEdit = (index) => {
    setForm(expenses[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
  };

  return (
    <div className="expense-page">
      <div className="top-column">
        <div className="total-expenses">
          <h2>Total Expenses</h2>
          <span>${expenses.reduce((total, expense) => total + parseFloat(expense.amount || 0), 0).toFixed(2)}</span>
        </div>
        <div className="add-expense-button">
          <button onClick={() => setEditIndex(null)}>Add Expense</button>
        </div>
      </div>

      <div className="expense-form">
        <h2>{editIndex !== null ? 'Edit Expense' : 'Add Expense'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={form.category}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount:</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={form.amount}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={form.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes:</label>
            <textarea
              id="notes"
              name="notes"
              rows="4"
              value={form.notes}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button type="submit">{editIndex !== null ? 'Update Expense' : 'Save Expense'}</button>
        </form>
      </div>

      <div className="expense-list">
        <h2>Expense List</h2>
        {expenses.length > 0 ? (
          <ul>
            {expenses.map((expense, index) => (
              <li key={index}>
                <div>
                  <strong>Category:</strong> {expense.category}
                </div>
                <div>
                  <strong>Amount:</strong> ${expense.amount}
                </div>
                <div>
                  <strong>Date:</strong> {expense.date}
                </div>
                <div>
                  <strong>Notes:</strong> {expense.notes}
                </div>
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button onClick={() => handleDelete(index)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No expenses recorded.</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseAPI;

