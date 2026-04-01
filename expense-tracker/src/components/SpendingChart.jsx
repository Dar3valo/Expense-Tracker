import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const COLORS = ["#378ADD","#1D9E75","#7F77DD","#EF9F27","#E24B4A","#D4537E","#639922","#888780"];

export default function SpendingChart({ transactions }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);

  useEffect(() => {
    const expenses = transactions.filter((t) => t.type === "expense");
    const categoryTotals = expenses.reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

    const labels = Object.keys(categoryTotals);
    const data = Object.values(categoryTotals);

    if (chartRef.current) chartRef.current.destroy();

    if (labels.length === 0) return;

    chartRef.current = new Chart(canvasRef.current, {
      type: "doughnut",
      data: {
        labels,
        datasets: [{ data, backgroundColor: COLORS.slice(0, labels.length), borderWidth: 0 }],
      },
      options: {
        plugins: {
          legend: { position: "bottom", labels: { font: { size: 12 }, padding: 16 } },
        },
        cutout: "65%",
      },
    });

    return () => { if (chartRef.current) chartRef.current.destroy(); };
  }, [transactions]);

  const hasExpenses = transactions.some((t) => t.type === "expense");

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-5">
      <h2 className="text-sm font-semibold text-gray-700 mb-4">Spending by Category</h2>
      {hasExpenses ? (
        <canvas ref={canvasRef} />
      ) : (
        <div className="flex items-center justify-center h-40 text-sm text-gray-300">
          No expenses yet
        </div>
      )}
    </div>
  );
}