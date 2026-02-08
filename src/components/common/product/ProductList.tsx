import ProductCard from "../../catalog/product/ProductCard";
import type { IProductCard } from "../../catalog/product/ProductCard.type";

interface ProductListProps {
  products: IProductCard[];
  addToBasket: (product: IProductCard) => void;
  onProductClick?: (product: IProductCard) => void;
}

const ProductList = ({
  products,
  onProductClick,
  addToBasket,
}: ProductListProps) => {
  return (
    <>
      {products &&
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onProductClick={onProductClick}
          />
        ))}
    </>
  );
};

export default ProductList;
