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