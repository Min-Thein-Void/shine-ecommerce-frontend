"use client";

import { useState } from "react";
import { checkout } from "@/services/Order/order.service";

export function useCheckout(
  setCart: React.Dispatch<React.SetStateAction<any>>,
) {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!phone || !address) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await checkout(phone, address);

      setMessage(
        "✅ Order placed successfully. Thank you for purchasing our products!",
      );

      setPhone("");
      setAddress("");
      setCart([]);
    } catch (err: any) {
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    phone,
    setPhone,
    address,
    setAddress,
    loading,
    message,
    handleSubmit,
  };
}
