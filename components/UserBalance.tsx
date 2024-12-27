interface UserBalanceProps {
    balance?: number;
    transactions: Array<{ amount: number; type: string; date: string }>;
}

export default function UserBalance({ balance, transactions }: UserBalanceProps) {
    return (
        <div className="bg-white p-4 rounded-md shadow-md">
            <p className="text-lg font-bold">Balance: ${balance || 0}</p>
            <h2 className="text-md font-semibold mt-4">Recent Transactions:</h2>
            <ul className="space-y-2">
                {transactions.map((txn, index) => (
                    <li key={index} className="text-sm">
                        {new Date(txn.date).toLocaleString()} - {txn.type} ${txn.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
}
