import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { getTransactions } from "../fetch";

export async function TransactionsTable({ className }: { className?: string }) {
  const data = await getTransactions();

  return (
    <div
      className={cn(
        "grid rounded-[10px] bg-white px-7.5 pb-2 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card",
        className,
      )}
    >
      <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
        Recent Transactions
      </h2>

      {/* Scrollable wrapper */}
      <div className="max-h-[400px] overflow-y-auto overflow-x-auto">
        <Table className="min-w-[700px]">
          <TableHeader>
            <TableRow className="border-none uppercase [&>th]:text-center">
              <TableHead className="!text-left">User</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Payment ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Start Date</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((tx, i) => (
              <TableRow
                className="text-center text-base font-medium text-dark dark:text-white"
                key={`${tx.paymentId}-${i}`}
              >
                <TableCell className="!text-left">{tx.user}</TableCell>
                <TableCell>{tx.plan}</TableCell>
                <TableCell>{tx.paymentId}</TableCell>
                <TableCell>${tx.amount.toFixed(2)}</TableCell> 
                <TableCell>
                  {new Date(tx.startDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
