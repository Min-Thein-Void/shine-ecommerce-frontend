
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import AdminOrdersPangination from "./AdminOrdersPangination";

type Props = {
  currentPage: number;
  totalPages: number;
};

function AdminOrderPanginationWrapper({
  currentPage,
  totalPages,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    router.replace(`?${params.toString()}`);
  };

  return (
    <AdminOrdersPangination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
}

export default AdminOrderPanginationWrapper;
