import ProductDetailClient from "@/component-of-product/ProductDetailClient";
import { getProduct } from "@/services/Product/product.service";

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
