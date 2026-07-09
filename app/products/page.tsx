import CategoriesList from "@/components/CategoriesList";
import SearchByPriceInput from "@/components/SearchByPriceInput";
import SearchInput from "@/components/SearchInput";
import Link from "next/link";

type Props = {
  searchParams: Promise<{
    search?: string;
    categoryId?: string;
    price?: string;
  }>;
};

type Product = {
  id: number;
  name: string;
  description?: string;
  image?: string;
  price: number;
  stock: number;
  category?: {
    id: number;
    name: string;
  };
  reviews?: {
    id: number;
    rating: number;
    comment: string;
  }[];
};

//backend ko req data poz tae function
async function getProducts(filters: {
  search?: string;
  categoryId?: string;
  price?: string;
}): Promise<Product[]> {
  const url = new URL("http://localhost:3100/product");

  if (filters.search) {
    url.searchParams.set("search", filters.search);
  }
  if (filters.categoryId) {
    url.searchParams.set("categoryId", filters.categoryId);
  }
  if (filters.price) {
    url.searchParams.set("price", filters.price);
  }

  const res = await fetch(url, {
    cache: "no-store",
  });

  return res.json();
}

const Page = async ({ searchParams }: Props) => {
  const { search, categoryId, price } = await searchParams;

  const products: Product[] = await getProducts({ search, categoryId, price });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-8">Products</h1>
        <div className="flex gap-3">
          <SearchInput />
          <SearchByPriceInput />
          <CategoriesList />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="relative group">
            {/* Card */}
            <Link href={`/product/${product.id}`}>
              <div className="border rounded-xl p-4 shadow-sm hover:shadow-lg transition duration-300 bg-white">
                {/* Image */}
                {product.image ? (
                  <img
                    src={`http://localhost:3100/uploads/${product.image}`}
                    alt={product.name}
                    className="w-full h-44 object-cover rounded-lg mb-3 group-hover:scale-105 transition"
                  />
                ) : (
                  <div className="w-full h-44 bg-gray-200 flex items-center justify-center mb-3 rounded-lg">
                    <span className="text-gray-500 text-sm">No Image</span>
                  </div>
                )}

                {/* Category badge */}
                <span className="inline-block text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded mb-2">
                  {product.category?.name || "Uncategorized"}
                </span>

                {/* Name */}
                <h2 className="text-lg font-semibold line-clamp-1">
                  {product.name}
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                  {product.description || "No description"}
                </p>

                {/* Price + Stock */}
                <div className="flex justify-between items-center">
                  <p className="font-bold text-blue-600 text-lg">
                    {product.price} MMK
                  </p>
                  <p className="text-xs text-gray-400">
                    Stock: {product.stock}
                  </p>
                </div>

                {/* Reviews */}
                <div className="mt-2">
                  {product.reviews && product.reviews.length > 0 ? (
                    <div className="text-sm text-gray-600">
                      {(() => {
                        const avg =
                          product.reviews.reduce(
                            (sum, r) => sum + Number(r.rating),
                            0,
                          ) / product.reviews.length;

                        return (
                          <span>
                            ⭐ {avg.toFixed(1)} / 5
                            <span className="text-gray-400 ml-1">
                              ({product.reviews.length} reviews)
                            </span>
                          </span>
                        );
                      })()}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-400">No reviews yet</p>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
