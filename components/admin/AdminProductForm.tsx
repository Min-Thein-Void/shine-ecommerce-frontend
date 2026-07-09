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
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Product Name */}
        <div>
          <label className="block mb-2 font-medium">Product Name</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-medium">Description</label>

          <textarea
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            className="w-full border rounded-lg px-4 py-2 resize-none"
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-2 font-medium">Product Image</label>

          <input
            type="file"
            onChange={handleImageChange}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-medium">Price</label>

          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-medium">Category</label>

          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select Category</option>

            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Stock */}
        <div>
          <label className="block mb-2 font-medium">Stock</label>

          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="0"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <button
          type="submit"
          className={`rounded-lg px-6 py-3 font-semibold text-white transition duration-200 ${editingProduct
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-green-600 hover:bg-green-700"
            }`}
        >
          {editingProduct ? "Update Product" : "Create Product"}
        </button>
      </form>
    </>
  );
}

export default AdminProductForm;
