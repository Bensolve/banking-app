import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { TransactionsTable } from "./TransactionsTable";
import { Pagination } from './Pagination'

interface RecentTransactionsProps {
  transactions: Array<{ amount: number; type: string; date: string }>,
  page : number;
}

export function RecentTransactions({ transactions,   page = 1, }: RecentTransactionsProps) {
  const rowsPerPage = 10;
  const totalPages = Math.ceil(transactions.length / rowsPerPage);
  

  const indexOfLastTransaction = page * rowsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

  const currentTransactions = transactions.slice(
    indexOfFirstTransaction, indexOfLastTransaction
  )


  return (
    <section className="recent-transactions">
      <header className="flex items-center justify-between mb-4">
        <h2 className="recent-transactions-label">Recent Transactions</h2>
        <Link href="/transaction-history" className="view-all-btn">
          View All
        </Link>
      </header>

      <Tabs defaultValue="all" className="w-full">
        {/* Tabs List */}
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="credits">Credits</TabsTrigger>
          <TabsTrigger value="debits">Debits</TabsTrigger>
        </TabsList>

        {/* Tabs Content */}
        <TabsContent value="all">
        <TransactionsTable transactions={currentTransactions} />
        </TabsContent>

        <TabsContent value="credits">
          <TransactionsTable
            transactions={transactions.filter((txn) => txn.type === "credit")}
          />
        </TabsContent>

        <TabsContent value="debits">
          <TransactionsTable
            transactions={transactions.filter((txn) => txn.type === "debit")}
          />
        </TabsContent>

        {totalPages > 1 && (
              <div className="my-4 w-full">
                <Pagination totalPages={totalPages} page={page} />
              </div>
            )}
      </Tabs>
    </section>
  );
}
