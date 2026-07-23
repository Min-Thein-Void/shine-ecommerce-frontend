interface CheckoutFormProps {
  phone: string;
  setPhone: React.Dispatch<React.SetStateAction<string>>;

  address: string;
  setAddress: React.Dispatch<React.SetStateAction<string>>;

  loading: boolean;
  message: string;

  cartLength: number;

  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

function CheckoutForm({
  phone,
  setPhone,
  address,
  setAddress,
  loading,
  message,
  cartLength,
  handleSubmit,
}: CheckoutFormProps) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Shipping Information
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Enter your delivery details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Phone Number
          </label>

          <input
            type="text"
            placeholder="09xxxxxxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="
                h-12
                w-full
                rounded-xl
                border
                border-gray-200
                px-4
                text-sm
                transition
                focus:border-black
                focus:outline-none
                focus:ring-4
                focus:ring-gray-100
              "
          />
        </div>

        {/* Address */}
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Delivery Address
          </label>

          <textarea
            placeholder="Enter your delivery address..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="
                h-32
                w-full
                resize-none
                rounded-xl
                border
                border-gray-200
                px-4
                py-3
                text-sm
                transition
                focus:border-black
                focus:outline-none
                focus:ring-4
                focus:ring-gray-100
              "
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading || cartLength === 0}
          className="
              w-full
              rounded-xl
              bg-black
              py-4
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-gray-800
              active:scale-[0.98]
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
        >
          {loading ? "Processing Order..." : "Place Order"}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-600">{message}</p>
        )}
      </form>
    </div>
  );
}

export default CheckoutForm;
