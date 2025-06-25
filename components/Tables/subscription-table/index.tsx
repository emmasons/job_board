"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateSubscriptionStatus, fetchSubscriptions } from "../fetch";

export function SubscriptionsTable({ className }: { className?: string }) {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(20);
  const [filterEmail, setFilterEmail] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [pendingChange, setPendingChange] = useState<{
    index: number;
    newStatus: string;
  } | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await fetchSubscriptions();
      setSubscriptions(data);
    };
    load();
  }, []);

  const confirmStatusChange = async () => {
    if (!pendingChange) return;
    const { index, newStatus } = pendingChange;
    const updated = [...subscriptions];
    updated[index].status = newStatus;
    setSubscriptions(updated);
    await updateSubscriptionStatus(updated[index].id, newStatus);
    setPendingChange(null);
    setShowConfirm(false);
  };

  const handleStatusChange = (index: number, newStatus: string) => {
    setPendingChange({ index, newStatus });
    setShowConfirm(true);
  };

  const filtered = subscriptions.filter((sub) => {
    const emailMatch = sub.user?.toLowerCase().includes(filterEmail.toLowerCase());

    const subStart = new Date(sub.startDate).setHours(0, 0, 0, 0);
    const from = filterStartDate ? new Date(filterStartDate).setHours(0, 0, 0, 0) : null;
    const to = filterEndDate ? new Date(filterEndDate).setHours(23, 59, 59, 999) : null;

    const startDateMatch =
      from && to ? subStart >= from && subStart <= to :
      from ? subStart === from :
      true;

    return emailMatch && startDateMatch;
  });


  return (
    <div className={cn("grid rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card", className)}>
      {/* Header */}
      <div className="px-6 py-4 sm:px-7 sm:py-5 xl:px-8.5 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-2xl font-bold text-dark dark:text-white">
          Subscriptions
        </h2>

        <div className="flex flex-wrap items-center gap-3">
          <Input
            placeholder="Filter by email..."
            className="w-[200px]"
            value={filterEmail}
            onChange={(e) => setFilterEmail(e.target.value)}
          />
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">From</span>
            <Input
              type="date"
              value={filterStartDate}
              onChange={(e) => setFilterStartDate(e.target.value)}
              className="w-[150px]"
            />
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-gray-500">To</span>
            <Input
              type="date"
              value={filterEndDate}
              onChange={(e) => setFilterEndDate(e.target.value)}
              className="w-[150px]"
            />
          </div>
        </div>

      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <Table className="min-w-[800px]">
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Download Count</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filtered.slice(0, visibleCount).map((sub, index) => (
              <TableRow key={sub.id}>
                <TableCell>{sub.user}</TableCell>
                <TableCell>{sub.plan}</TableCell>
                <TableCell>{new Date(sub.startDate).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(sub.endDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <select
                    value={sub.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className="bg-transparent outline-none"
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="CANCELLED">CANCELLED</option>
                    <option value="EXPIRED">EXPIRED</option>
                  </select>
                </TableCell>
                <TableCell>{sub.downloads}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Show more */}
      {filtered.length > visibleCount && (
        <div className="text-center py-4">
          <Button onClick={() => setVisibleCount((prev) => prev + 20)}>
            Show More
          </Button>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirm && pendingChange !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center">
            <p className="mb-4 text-lg">
              Are you sure you want to change the status to{" "}
              <strong>{pendingChange.newStatus}</strong>?
            </p>
            <div className="flex justify-center gap-4">
              <Button variant="secondary" onClick={() => setShowConfirm(false)}>
                Cancel
              </Button>
              <Button onClick={confirmStatusChange}>Yes, Change</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
