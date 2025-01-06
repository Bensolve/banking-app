import TransactionControls from "@/components/TransactionControls";

interface UserBalanceProps {
    balance?: number;
    onDeposit: (amount: number) => Promise<void>;
    onWithdraw: (amount: number) => Promise<void>;
}

export default function UserBalance({ balance, onDeposit, onWithdraw }: UserBalanceProps) {
    return (
        <section className="total-balance bg-white rounded-xl p-6 shadow-md sm:flex sm:items-center sm:gap-8">
            {/* Balance Section */}
            <div className="flex flex-col items-start space-y-4 sm:flex-1">
                <h2 className="total-balance-label">Account Balance</h2>
                <p className="total-balance-amount">
                    ${balance?.toLocaleString('en-US', { minimumFractionDigits: 2 }) || "0.00"}
                </p>
            </div>

            {/* Transaction Controls */}
            <div className="sm:flex-1 sm:ml-6">
                <TransactionControls onDeposit={onDeposit} onWithdraw={onWithdraw} />
            </div>
        </section>
    );
}
