const fmt = (n) =>
    new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD" }).format(n);
console.log(fmt(0));
  
  export default function SummaryCards({ balance, income, expenses }) {
    return (
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p data-testid="balance-label" className="text-xs text-gray-400 mb-1">Balance</p>
          <p className={`text-xl font-semibold ${balance >= 0 ? "text-gray-800" : "text-red-500"}`}>
            {fmt(balance)}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p data-testid="income-label" className="text-xs text-gray-400 mb-1">Income</p>
          <p className="text-xl font-semibold text-emerald-600">{fmt(income)}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <p data-testid="expenses-label" className="text-xs text-gray-400 mb-1">Expenses</p>
          <p className="text-xl font-semibold text-red-500">{fmt(expenses)}</p>
        </div>
      </div>
    );
  }