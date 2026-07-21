import ProductDetailClient from "@/components/ProductDetailClient";
import { getProduct } from "@/services/product.service";

interface Props {
  params: {
    id: string;
  };
}

const ProductDetail = async ({ params }: Props) => {
  const { id } = await params;
  const data  = await getProduct(Number(id));

  return <ProductDetailClient product={data} />
};

export default ProductDetail;
