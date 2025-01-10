import TransactionControls from "@/components/TransactionControls";
import { Doughnut } from "@/components/DoughnutChart";

interface UserBalanceProps {
  balance?: number;
  transactions: { type: string; amount: number }[]; // Add transactions prop
  onDeposit: (amount: number) => Promise<void>;
  onWithdraw: (amount: number) => Promise<void>;
}

export default function UserBalance({
  balance,
  transactions,
  onDeposit,
  onWithdraw,
}: UserBalanceProps) {
  return (
    <section className="total-balance bg-white rounded-xl p-6 shadow-md sm:flex sm:items-center sm:gap-8">

<div className="sm:flex-1 sm:ml-6">
        <Doughnut transactions={transactions} balance={balance || 0} />
      </div>

      {/* Balance Section */}
      <div className="flex flex-col items-start space-y-4 sm:flex-1">
        <h2 className="total-balance-label">Account Balance</h2>
        <p className="total-balance-amount">
          ${balance?.toLocaleString("en-US", { minimumFractionDigits: 2 }) || "0.00"}
        </p>
      </div>

      
      {/* Transaction Controls */}
      <div className="sm:flex-1 sm:ml-6">
        <TransactionControls onDeposit={onDeposit} onWithdraw={onWithdraw} />
      </div>
    </section>
  );
}
