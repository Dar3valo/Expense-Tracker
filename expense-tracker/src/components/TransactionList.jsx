const fmt = (n) =>
    new Intl.NumberFormat("en-SG", { style: "currency", currency: "SGD" }).format(n);
  
  const fmtDate = (d) =>
    new Date(d).toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" });
  
  export default function TransactionList({ transactions, onDelete, onDeleteAll }) {
    if (transactions.length === 0) {
      return (
        <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-sm text-gray-300">
          No transactions yet. Add one above.
        </div>
      );
    }
  
    return (
      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <h2 className="text-sm font-semibold text-gray-700">Transactions</h2>
          {transactions.length > 0 && (
            <button
              onClick={onDeleteAll}
              className="text-xs text-white bg-red-400 hover:bg-red-500 px-3 py-1 rounded-lg transition-colors"
            >
              Delete all <span>🗑</span> 
            </button>
          )}
        </div>
        <ul>
          {transactions.map((t, i) => (
            <li
              key={t.id}
              className={`flex items-center gap-4 px-5 py-4 ${i !== transactions.length - 1 ? "border-b border-gray-50" : ""}`}
            >
              <div className={`w-1 self-stretch rounded-full flex-shrink-0 ${t.type === "income" ? "bg-emerald-400" : "bg-red-400"}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 truncate">{t.description}</p>
                <p className="text-xs text-gray-400">{t.category} · {fmtDate(t.date)}</p>
              </div>
              <p className={`text-sm font-semibold flex-shrink-0 ${t.type === "income" ? "text-emerald-600" : "text-red-500"}`}>
                {t.type === "income" ? "+" : "−"}{fmt(t.amount)}
              </p>
              <button
                onClick={() => onDelete(t.id)}
                className="text-gray-200 hover:text-red-400 transition-colors text-xs flex-shrink-0"
                title="Delete"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }