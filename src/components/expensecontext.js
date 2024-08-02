// src/ExpenseContext.js
import React, { createContext, useState } from 'react';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
  const [totalExpense, setTotalExpense] = useState(0);

  const updateTotalExpense = (newTotal) => {
    setTotalExpense(newTotal);
  };

  return (
    <ExpenseContext.Provider value={{ totalExpense, updateTotalExpense }}>
      {children}
    </ExpenseContext.Provider>
  );
};
