"use client";
import CheckoutForm from "@/component-of-order/CheckoutForm";
import OrderSummary from "@/component-of-order/OrderSummary";
import { useCart } from "@/hooks/useCart";
import { useCheckout } from "@/hooks/useCheckout";
import { calculateTotal } from "@/utils/cart";

function Checkout() {
  const { cart, setCart } = useCart(); //custom hooks

  const total = calculateTotal(cart); //from utils folder utils/cart.ts

  const {
    loading,
    message,
    handleSubmit,
    phone,
    setPhone,
    address,
    setAddress,
  } = useCheckout(setCart);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        {/* Cart Summary */}
        <OrderSummary cart={cart} total={total} />

        {/* Checkout Form */}
        <CheckoutForm
          phone={phone}
          setPhone={setPhone}
          address={address}
          setAddress={setAddress}
          loading={loading}
          message={message}
          cartLength={cart.length}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default Checkout;
