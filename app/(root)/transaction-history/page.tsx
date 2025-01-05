// import React from 'react'
// import Userinfo from '@/components/UserInfo'
// import { TransactionsTable } from '@/components/TransactionsTable';
// import { Pagination } from '@/components/Pagination';

// transactions: Array<{ amount: number; type: string; date: string }>,
// const TransactionHistory = async ({ searchParams: { page } }: SearchParamProps) => {
//     const currentPage = Number(page as string) || 1;

//     const rowsPerPage = 10;
//     const totalPages = Math.ceil(IDBTransaction.length / rowsPerPage);

//     const indexOfLastTransaction = currentPage * rowsPerPage;
//     const indexOfFirstTransaction = indexOfLastTransaction - rowsPerPage;

//     const currentTransactions = transactions.slice(
//         indexOfFirstTransaction, indexOfLastTransaction
//     )
//     return (
//         <div className="transactions">
//             <div className="transactions-header">
//                 <Userinfo
//                     title="Transaction History"
//                     subtext="See your transactions."
//                 />
//                 <section className="flex w-full flex-col gap-6">
//                     <TransactionsTable
//                         transactions={currentTransactions}
//                     />
//                     {totalPages > 1 && (
//                         <div className="my-4 w-full">
//                             <Pagination totalPages={totalPages} page={currentPage} />
//                         </div>
//                     )}
//                 </section>
//             </div>
//         </div>
//     )
// }

// export default TransactionHistory