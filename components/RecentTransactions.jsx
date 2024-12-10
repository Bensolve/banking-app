// components/RecentTransactions.js
export default function RecentTransactions({ transactions }) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Recent Transactions</h2>
        <ul className="divide-y divide-gray-200">
          {transactions.map((transaction, index) => (
            <li key={index} className="flex justify-between py-2">
              <span>{transaction.date}</span>
              <span>{transaction.description}</span>
              <span
                className={`font-bold ${transaction.amount < 0 ? 'text-red-500' : 'text-green-500'}`}
              >
                ${transaction.amount.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  