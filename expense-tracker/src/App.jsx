import { useState, useEffect } from "react";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import SpendingChart from "./components/SpendingChart";

const STORAGE_KEY = "expense_tracker_data";

export default function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [
      { ...transaction, id: crypto.randomUUID() },
      ...prev,
    ]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-1">Expense Tracker</h1>
      <p className="text-sm text-gray-400 mb-8">Track your income and spending</p>

      <SummaryCards balance={balance} income={income} expenses={expenses} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <TransactionForm onAdd={addTransaction} />
        <SpendingChart transactions={transactions} />
      </div>

      <div className="mt-8">
        <TransactionList
          transactions={transactions}
          onDelete={deleteTransaction}
        />
      </div>
    </div>
  );
}