"use client";

import { Trash2 } from "lucide-react";

interface Props {
  cvId: string;
}

export default function DeleteCoverButton({ cvId }: Props) {
  const handleDelete = (e: React.FormEvent) => {
    if (!confirm("Are you sure you want to delete this Cover Letter?")) {
      e.preventDefault();
    }
  };

  return (
    <form method="POST" action={`/api/cover/delete/${cvId}`} onSubmit={handleDelete}>
      <button
        type="submit"
        className="px-3 py-1 text-sm flex items-center gap-1 bg-red-100 text-red-800 rounded hover:bg-red-200"
      >
        <Trash2 size={16} /> Delete
      </button>
    </form>
  );
}
