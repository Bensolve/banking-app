import {
    Table,
    TableBody,
  
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import {  formatAmount, formatDateTime,  } from "@/lib/utils"
interface TransactionsTableProps {
    transactions: Array<{ amount: number; type: string; date: string }>;
  }

  
  
  export function TransactionsTable({ transactions }: TransactionsTableProps) {
    return (
      
        <Table>
           <TableHeader className="bg-[#f9fafb]">
           <TableRow>
              <TableHead className="px-2">Date</TableHead>
              <TableHead className="px-2">Time</TableHead>
              <TableHead className="px-2">Type</TableHead>
              <TableHead className="px-2">Amount</TableHead>
              </TableRow>
          </TableHeader>
          <TableBody>

          {transactions.map((txn, index) => {
         
          const amount = formatAmount(txn.amount);
          const isDebit = txn.type === 'debit';
          const isCredit = txn.type === 'credit';

          return (
            <TableRow key={index} className={`${isDebit || amount[0] === '-' ? 'bg-[#FFFBFA]' : 'bg-[#F6FEF9]'}`}>
                <TableCell className="min-w-32 pl-2 pr-10">
                {formatDateTime(new Date(txn.date)).dateOnly}
              </TableCell>
               
                <TableCell className="min-w-32 pl-2 pr-10">
                {formatDateTime(new Date(txn.date)).timeOnly}
              </TableCell>
            

              <td className="border border-gray-300 px-4 py-2">{txn.type}</td>
              <TableCell className={`pl-2 pr-10 font-semibold ${
                isDebit || amount[0] === '-' ?
                  'text-[#f04438]'
                  : 'text-[#039855]'
              }`}>
                {isDebit ? `-${amount}` : isCredit ? amount : amount}
              </TableCell>
                {/* <td className="border border-gray-300 px-4 py-2">{txn.type}</td> */}
                {/* <td className="border border-gray-300 px-4 py-2">${txn.amount}</td> */}
                </TableRow>
            );
          })}
          </TableBody>
        </Table>
    
    );
  }
  