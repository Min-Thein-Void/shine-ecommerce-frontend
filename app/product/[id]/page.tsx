import ProductDetailClient from "@/components/ProductDetailClient";


interface Props {
  params: {
    id: string;
  };
}

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

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`http://localhost:3100/product/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}



const ProductDetail = async ({ params }: Props) => {
  const { id } = await params;
  const product = await getProduct(id);

  return <ProductDetailClient product={product} />
};

export default ProductDetail;
