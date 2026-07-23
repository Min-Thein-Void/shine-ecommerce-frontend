export async function getCart() {
  const res = await fetch("http://localhost:3100/cart", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  return res.json();
}