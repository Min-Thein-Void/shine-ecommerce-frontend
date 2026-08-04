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
    <div className="flex justify-center gap-2">
      <button
        onClick={onEdit}
        className="rounded-xl border border-gray-200 p-2.5 text-gray-700 transition hover:bg-gray-100 active:scale-95"
      >
        <Pencil size={17} />
      </button>

      <AlertDialog>
        <AlertDialogTrigger
          className="
            rounded-xl
            border
            border-red-200
            p-2.5
            text-red-600
            transition
            hover:bg-red-50
            active:scale-95
          "
        >
          <Trash2 size={17} />
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete Product?
            </AlertDialogTitle>

            <AlertDialogDescription>
              This product will be moved to recycle bin.
              You can restore it later.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>

            <AlertDialogAction
              onClick={onDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}