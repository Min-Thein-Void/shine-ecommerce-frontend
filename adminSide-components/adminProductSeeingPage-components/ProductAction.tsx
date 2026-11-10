
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { Pencil, Trash2 } from "lucide-react";

interface ProductActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function ProductActions({
  onEdit,
  onDelete,
}: ProductActionsProps) {
  return (
    <div className="flex w-full min-w-0 items-center justify-start gap-2 sm:w-auto sm:justify-center">
      {/* Edit Button */}
      <button
        type="button"
        onClick={onEdit}
        aria-label="Edit product"
        title="Edit product"
        className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-700 transition hover:bg-gray-100 active:scale-95 sm:size-9"
      >
        <Pencil size={17} />
      </button>

      {/* Delete Button */}
      <AlertDialog>
        <AlertDialogTrigger
          aria-label="Delete product"
          title="Delete product"
          className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-red-200 bg-white text-red-600 transition hover:bg-red-50 active:scale-95 sm:size-9"
        >
          <Trash2 size={17} />
        </AlertDialogTrigger>

        <AlertDialogContent className="w-[calc(100%-2rem)] max-w-lg rounded-xl sm:w-full">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg sm:text-xl">
              Delete Product?
            </AlertDialogTitle>

            <AlertDialogDescription className="text-sm leading-6">
              This product will be moved to the recycle bin.
              You can restore it later.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="flex-col-reverse gap-2 sm:flex-row sm:gap-0">
            <AlertDialogCancel className="mt-0 w-full sm:w-auto">
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={onDelete}
              className="w-full bg-red-600 hover:bg-red-700 sm:w-auto"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
