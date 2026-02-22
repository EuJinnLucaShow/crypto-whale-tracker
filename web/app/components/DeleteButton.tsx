"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";
import { wrapAsync } from "@/lib/utils";

interface DeleteButtonProps {
  id: number;
  label: string;
  onDelete: () => void;
}

export default function DeleteButton({
  id,
  label,
  onDelete,
}: Readonly<DeleteButtonProps>) {
  const [isDeleting, setIsDeleting] = useState(false);

  const performDelete = async () => {
    setIsDeleting(true);
    try {
      await api.deleteWhale(id);
      onDelete();
      toast.success(`Removed ${label} from tracking`);
    } catch (err) {
      console.error(`[Delete Error]: Failed to remove ${id}`, err);
      const message = err instanceof Error ? err.message : "Failed to delete";
      toast.error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteClick = () => {
    toast("Confirm deletion!", {
      description: `Do you want to stop tracking ${label}?`,
      action: {
        label: "Delete",
        onClick: wrapAsync(performDelete),
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
      duration: 5000,
    });
  };

  return (
    <button
      onClick={handleDeleteClick}
      disabled={isDeleting}
      className="cursor-pointer p-2 text-zinc-600 rounded-lg hover:bg-rose-500/10 hover:text-rose-400 transition-all disabled:opacity-50"
    >
      {isDeleting ? (
        "..."
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 6h18" />
          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
          <line x1="10" y1="11" x2="10" y2="17" />
          <line x1="14" y1="11" x2="14" y2="17" />
        </svg>
      )}
    </button>
  );
}
