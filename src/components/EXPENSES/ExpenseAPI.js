

// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import './ExpenseAPI.css';
// // import { getToken } from '../auth/useAuth';

// // function ExpenseAPI() {
// //   const data = { category: "", amount: "", date: "", notes: "" };
// //   const [inputData, setInputData] = useState(data);
// //   const [expenseId, setExpenseId] = useState(""); 
// //   const [fetchedData, setFetchedData] = useState(data);

// //   const handleData = (e) => {
// //     setInputData({ ...inputData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     axios.post("http://localhost:9001/expenses", inputData, {
// //       headers: {
// //         'Authorization': `Bearer ${getToken()}`, 
// //         'Content-Type': 'application/json' 
// //       }
// //     })
// //     .then((response) => {
// //       console.log(response);
// //     })
// //     .catch((error) => {
// //       console.error('There was an error!', error);
// //     });
// //   };

// //   const handleUpdate = (e) => {
// //     e.preventDefault();
// //     axios.put(`http://localhost:9001/expenses/${expenseId}`, inputData, {
// //       headers: {
// //         'Authorization': `Bearer ${getToken()}`, 
// //         'Content-Type': 'application/json'
// //       }
// //     })
// //     .then((response) => {
// //       console.log(response);
// //     })
// //     .catch((error) => {
// //       console.error('There was an error!', error);
// //     });
// //   };

// //   const handleDelete = (e) => {
// //     e.preventDefault();
// //     axios.delete(`http://localhost:9001/expenses/${expenseId}`, {
// //       headers: {
// //         'Authorization': `Bearer ${getToken()}`, 
// //         'Content-Type': 'application/json' 
// //       }
// //     })
// //     .then((response) => {
// //       console.log(response);
// //     })
// //     .catch((error) => {
// //       console.error('There was an error!', error);
// //     });
// //   };

// //   const handleFetch = (e) => {
// //     e.preventDefault(); 
// //     if (expenseId.trim() === "") {
// //       alert("Please enter an Expense ID");
// //       return;
// //     }
    
// //     axios.get(`http://localhost:9001/expenses/${expenseId}`, {
// //       headers: {
// //         'Authorization': `Bearer ${getToken()}`
// //       }
// //     })
// //     .then((response) => {
// //       setFetchedData(response.data);
// //     })
// //     .catch((error) => {
// //       console.error('There was an error!', error);
// //     });
// //   };

// //   return (
// //     <div className="container">
// //       <h1>Enter your expenses</h1>

// //       <form>
// //         <label>Category: </label>
// //         <input type="text" name='category' value={inputData.category} onChange={handleData} /><br />

// //         <label>Amount: </label>
// //         <input type="number" name='amount' value={inputData.amount} onChange={handleData} /><br />

// //         <label>Date: </label>
// //         <input type="date" name='date' value={inputData.date} onChange={handleData} /><br />

// //         <label>Notes: </label>
// //         <input type="text" name='notes' value={inputData.notes} onChange={handleData} /><br />

// //         <button onClick={handleSubmit}>Submit</button>
// //         <button onClick={handleUpdate}>Update</button>
// //         <button onClick={handleDelete}>Delete</button>
// //       </form>

// //       <br /><br />

// //       <form>
// //         <label>Expense ID to Fetch: </label>
// //         <input 
// //           type="text" 
// //           value={expenseId} 
// //           onChange={(e) => setExpenseId(e.target.value)} 
// //         /><br />
// //         <button onClick={handleFetch}>Fetch Expense</button>
// //       </form>

// //       <br />

// //       {fetchedData.category && (
// //         <div className="expense-details">
// //           <h2>Fetched Expense Details</h2>
// //           <p><strong>Category:</strong> {fetchedData.category}</p>
// //           <p><strong>Amount:</strong> ${fetchedData.amount}</p>
// //           <p><strong>Date:</strong> {fetchedData.date}</p>
// //           <p><strong>Notes:</strong> {fetchedData.notes}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }

// // export default ExpenseAP

import React, { useState } from 'react';
import axios from 'axios';
import './ExpenseAPI.css';

function ExpenseAPI() {
  const initialData = { category: "", amount: "", date: "", notes: "" };
  const [inputData, setInputData] = useState(initialData);
  const [expenseId, setExpenseId] = useState(""); 
  const [fetchedData, setFetchedData] = useState(initialData);
  const [totalExpense, setTotalExpense] = useState(0); // State for total expense
  const [expenses, setExpenses] = useState([]); // State for the list of expenses
  const [updateId, setUpdateId] = useState(null); // ID of the expense to update

  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAzLCJpYXQiOjE3MjI1MTU0NzksImV4cCI6MTczOTc5NTQ3OX0.J1R1U2NtTZ9C4KuBs7hIGIGheST3sW5qqwmabhCC8FY';

  const handleData = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:9001/expenses", inputData, {
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
      }
    })
    .then((response) => {
      console.log(response);
      const newAmount = parseFloat(inputData.amount || 0);
      setTotalExpense(prevTotal => prevTotal + newAmount);
      setExpenses([...expenses, { ...inputData, id: response.data.id }]);
      setInputData(initialData);
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:9001/expenses/${updateId}`, inputData, {
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log(response);
      setExpenses(expenses.map(expense => 
        expense.id === updateId ? { ...inputData, id: updateId } : expense
      ));
      setInputData(initialData);
      setUpdateId(null); // Clear update ID
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:9001/expenses/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`, 
        'Content-Type': 'application/json' 
      }
    })
    .then((response) => {
      console.log(response);
      // Remove the deleted expense from the list
      setExpenses(expenses.filter(expense => expense.id !== id));
      // Update total expense
      const deletedExpense = expenses.find(expense => expense.id === id);
      if (deletedExpense) {
        const amount = parseFloat(deletedExpense.amount || 0);
        setTotalExpense(prevTotal => prevTotal - amount);
      }
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
  };

  const handleFetch = (e) => {
    e.preventDefault(); 
    if (expenseId.trim() === "") {
      alert("Please enter an Expense ID");
      return;
    }
    
    axios.get(`http://localhost:9001/expenses/${expenseId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then((response) => {
      setFetchedData(response.data);
    })
    .catch((error) => {
      console.error('There was an error!', error);
    });
  };

  const handleSelectForUpdate = (expense) => {
    setInputData({ category: expense.category, amount: expense.amount, date: expense.date, notes: expense.notes });
    setUpdateId(expense.id); // Set the ID of the expense to update
  };

  return (
    <div className="container">
      <h1>Enter your expenses</h1>

      <form>
        <label>Category: </label>
        <input type="text" name='category' value={inputData.category} onChange={handleData} /><br />

        <label>Amount: </label>
        <input type="number" name='amount' value={inputData.amount} onChange={handleData} /><br />

        <label>Date: </label>
        <input type="date" name='date' value={inputData.date} onChange={handleData} /><br />

        <label>Notes: </label>
        <input type="text" name='notes' value={inputData.notes} onChange={handleData} /><br />

        <button onClick={updateId ? handleUpdate : handleSubmit}>
          {updateId ? 'Update' : 'Submit'}
        </button>
      </form>

      <br /><br />

      <form>
        <label>Expense ID to Fetch: </label>
        <input 
          type="text" 
          value={expenseId} 
          onChange={(e) => setExpenseId(e.target.value)} 
        /><br />
        <button onClick={handleFetch}>Fetch Expense</button>
      </form>

      <br /><br />

      <h2>Total Expense: ${totalExpense.toFixed(2)}</h2> {/* Display total expense */}

      <h2>Expense List</h2>
      <ul>
        {expenses.map(expense => (
          <li key={expense.id}>
            <strong>Category:</strong> {expense.category} <br />
            <strong>Amount:</strong> ${expense.amount} <br />
            <strong>Date:</strong> {expense.date} <br />
            <strong>Notes:</strong> {expense.notes} <br />
            <button onClick={() => handleSelectForUpdate(expense)}>Update</button>
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ExpenseAPI;

