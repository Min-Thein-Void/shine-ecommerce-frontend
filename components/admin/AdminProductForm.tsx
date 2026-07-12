import { useProduct } from "@/hooks/useProduct";
import { Product } from "@/types/product";

interface AdminProductFormProps {
  editingProduct: Product | null;
}

function AdminProductForm({ editingProduct }: AdminProductFormProps) {
  const {
    handleSubmit,
    formData,
    handleChange,
    handleImageChange,
    categories,
  } = useProduct(editingProduct);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Product Name */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Product Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter product name"
          className="
          h-12
          w-full
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          text-sm
          text-gray-900
          placeholder:text-gray-400
          transition
          focus:border-black
          focus:outline-none
          focus:ring-4
          focus:ring-gray-100
        "
        />
      </div>

      {/* Description */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Description
        </label>

        <textarea
          rows={5}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe your product..."
          className="
          w-full
          resize-none
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          py-3
          text-sm
          text-gray-900
          placeholder:text-gray-400
          transition
          focus:border-black
          focus:outline-none
          focus:ring-4
          focus:ring-gray-100
        "
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Product Image
        </label>

        <label
          className="
          flex
          cursor-pointer
          items-center
          justify-center
          rounded-xl
          border-2
          border-dashed
          border-gray-300
          bg-gray-50
          px-5
          py-8
          text-sm
          text-gray-500
          transition
          hover:border-gray-400
          hover:bg-gray-100
        "
        >
          <div className="text-center">
            <p className="font-medium text-gray-700">Upload Product Image</p>

            <p className="mt-1 text-xs text-gray-400">
              PNG, JPG up to your allowed size
            </p>
          </div>

          <input type="file" onChange={handleImageChange} className="hidden" />
        </label>
      </div>

      {/* Price + Stock */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Price (MMK)
          </label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0"
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

        <div>
          <label className="mb-2 block text-sm font-semibold text-gray-700">
            Stock
          </label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="0"
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
      </div>

      {/* Category */}
      <div>
        <label className="mb-2 block text-sm font-semibold text-gray-700">
          Category
        </label>

        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          className="
          h-12
          w-full
          rounded-xl
          border
          border-gray-200
          bg-white
          px-4
          text-sm
          text-gray-700
          transition
          focus:border-black
          focus:outline-none
          focus:ring-4
          focus:ring-gray-100
        "
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="
        w-full
        rounded-xl
        bg-black
        py-3.5
        text-sm
        font-semibold
        text-white
        transition
        hover:bg-gray-800
        active:scale-[0.98]
      "
      >
        {editingProduct ? "Update Product" : "Create Product"}
      </button>
    </form>
  );
}

export default AdminProductForm;
