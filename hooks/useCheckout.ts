"use client";

import { useState } from "react";
import { checkout } from "@/services/Order/order.service";
import { mockPayment } from "@/services/Payment/payment.service";

export function useCheckout(
  setCart: React.Dispatch<React.SetStateAction<any>>,
) {
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("KBZPAY");
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

      const order = await checkout(phone, address, paymentMethod);

      // KBZPay Payment Flow
      if (paymentMethod === "KBZPAY") {
        const paymentResult = await mockPayment(order.id);

        setMessage(`✅ ${paymentResult.message}. Thank you for purchasing!`);
      }

      // Cash on Delivery Flow
      else if (paymentMethod === "COD") {
        setMessage(
          `✅ Order #${order.id} placed successfully! Pay when your order arrives.`,
        );
      }

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
    paymentMethod,
    setPaymentMethod,
    loading,
    message,
    handleSubmit,
  };
}
