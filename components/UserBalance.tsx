import TransactionControls from "@/components/TransactionControls";

interface UserBalanceProps {
    balance?: number;
    onDeposit: (amount: number) => Promise<void>;
    onWithdraw: (amount: number) => Promise<void>;
    
}

export default function UserBalance({ balance ,onDeposit, onWithdraw }: UserBalanceProps) {
    return (
        <div className="bg-white p-4 rounded-md shadow-md">
            <p className="text-lg font-bold">Balance: ${balance || 0}</p>
            <TransactionControls onDeposit={onDeposit} onWithdraw={onWithdraw} />
           
           
        </div>
    );
}