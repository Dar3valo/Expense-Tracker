import { useState } from "react";

const CATEGORIES = ["Food", "Transport", "Housing", "Entertainment", "Health", "Shopping", "Salary", "Other"];

const EMPTY = { description: "", amount: "", type: "expense", category: "Food", date: new Date().toISOString().split("T")[0] };

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.description.trim()) return setError("Please add a description.");
    if (!form.amount || isNaN(form.amount) || Number(form.amount) <= 0)
      return setError("Please enter a valid amount.");

    onAdd({ ...form, amount: parseFloat(form.amount) });
    setForm(EMPTY);
  };

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Add Transaction</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        {/* Type toggle */}
        <div className="flex rounded-lg overflow-hidden border border-gray-200 text-sm">
          {["expense", "income"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setForm((p) => ({ ...p, type: t }))}
              className={`flex-1 py-2 font-medium transition-colors ${
                form.type === t
                  ? t === "expense"
                    ? "bg-red-50 text-red-600"
                    : "bg-emerald-50 text-emerald-700"
                  : "text-gray-400 hover:bg-gray-50"
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
        />

        <input
          name="amount"
          type="number"
          placeholder="Amount (SGD)"
          value={form.amount}
          onChange={handleChange}
          min="0"
          step="0.01"
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors"
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors text-gray-700"
        >
          {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
        </select>

        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 transition-colors text-gray-700"
        />

        {error && <p className="text-xs text-red-500">{error}</p>}

        <button
          type="submit"
          className="bg-gray-800 text-white rounded-lg py-2 text-sm font-medium hover:bg-gray-700 active:scale-95 transition-all"
        >
          Add
        </button>
      </form>
    </div>
  );
}