type Account = {
    accountType: string;
    balance: number;
  };
  
  type TotalBalanceBoxProps = {
    accounts: Account[];
 
    totalCurrentBalance: number;
  };
  
  const TotalBalanceBox: React.FC<TotalBalanceBoxProps> = ({
    accounts,
  
    totalCurrentBalance,
  }) => {
    return (
      <div className="rounded-lg border bg-white p-4 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800">Total Balance</h2>
        <p className="text-2xl font-bold text-indigo-600">${totalCurrentBalance.toLocaleString()}</p>
        <ul className="space-y-2 mt-4">
          {accounts.map((account, index) => (
            <li key={index} className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">
                {account.accountType}
              </span>
              <span className="text-sm font-semibold text-indigo-500">
                ${account.balance.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default TotalBalanceBox;
  