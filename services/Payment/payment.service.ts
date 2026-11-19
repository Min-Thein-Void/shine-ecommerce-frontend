
export async function mockPayment(orderId: number) {
  const res = await fetch(
    `http://localhost:3100/payments/mock/${orderId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message);
  }

  return data;
}
