// components/AccountOverview.js
export default function AccountOverview({ accountType, balance }) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800">Account Overview</h2>
        <p className="text-gray-600">Type: <span className="font-bold">{accountType}</span></p>
        <p className="text-gray-600">Balance: <span className="font-bold">${balance.toFixed(2)}</span></p>
      </div>
    );
  }
  