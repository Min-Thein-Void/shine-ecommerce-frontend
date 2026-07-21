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
