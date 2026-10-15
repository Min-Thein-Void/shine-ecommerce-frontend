import { orderStatus } from "@/types/orderStatus";

export const getMyOrders = async () => {
  try {
    const res = await fetch("http://localhost:3100/orders/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || "Something went wrong.");
    }

    return data;
  } catch (error: any) {
    alert(error);
  }
};

export async function checkout(phone: string, address: string) {
  const res = await fetch("http://localhost:3100/orders/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      phone,
      address,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}

export const getOrders = async () => {
  try {
    const res = await fetch("http://localhost:3100/orders", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message);
    }

    return data;
  } catch (err: any) {
    console.log(err);
  }
};

export const updateOrderStatus = async (
  orderID: number,
  status: orderStatus,
) => {
  try {
    const res = await fetch(`http://localhost:3100/orders/${orderID}/status`, {
      method: "PATCH",

      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        status,
      }),
    });

    const updatedOrder = await res.json();
    return updatedOrder;
  } catch (error) {
    console.log(error);
  }
};

export const filterOrder = async (search: string) => {
  const params = new URLSearchParams();
  const keyword = search.trim();

  if (keyword) {
    params.set("search", keyword);
  }

  const res = await fetch(`http://localhost:3100/orders?${params.toString()}`, {
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch orders");
  }
  const data = await res.json();

  return data;
};
