# Expense Tracker

A clean and simple personal finance tracker built with React. Log your income and expenses, view your balance at a glance, and visualize your spending with a chart.

## Features

- Add income and expense transactions with a description, amount, and category
- View total balance, total income, and total expenses in summary cards
- Spending breakdown chart powered by Chart.js
- Transaction history with the ability to delete entries
- Data persists in the browser via localStorage — no backend required

## Tech Stack

- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/expense-tracker.git

# Navigate into the project folder
cd expense-tracker

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open your browser and go to `http://localhost:5173`.

### Building for Production

```bash
npm run build
```

The output will be in the `dist/` folder.

## Project Structure

```
src/
├── components/
│   ├── SpendingChart.jsx    # Doughnut/bar chart of spending by category
│   ├── SummaryCards.jsx     # Balance, income, and expense cards
│   ├── TransactionForm.jsx  # Form to add new transactions
│   └── TransactionList.jsx  # List of all transactions with delete option
├── App.jsx                  # Root component and state management
└── main.jsx                 # App entry point
```

## License

This project is open source and available under the [MIT License](LICENSE).
