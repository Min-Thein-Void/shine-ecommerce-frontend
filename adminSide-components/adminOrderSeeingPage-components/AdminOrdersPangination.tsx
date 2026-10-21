"use client";

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function AdminOrdersPangination({
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="mt-10 flex items-center justify-center gap-2">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="
        rounded-lg
        border
        px-4
        py-2
        text-sm
        disabled:cursor-not-allowed
        disabled:opacity-40
        hover:bg-gray-100
        "
      >
        Previous
      </button>
      {Array.from(
        { length: totalPages },

        (_, index) => index + 1,
      ).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`
          h-10
          w-10
          rounded-lg
          text-sm
          font-medium
          transition

          ${
            currentPage === page
              ? "bg-blue-600 text-white"
              : "border hover:bg-gray-100"
          }
          `}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="
        rounded-lg
        border
        px-4
        py-2
        text-sm
        disabled:cursor-not-allowed
        disabled:opacity-40
        hover:bg-gray-100
        "
      >
        Next
      </button>
    </div>
  );
}

export default AdminOrdersPangination;
