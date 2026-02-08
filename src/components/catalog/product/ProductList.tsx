
import ProductCard from './ProductCard';
import type { IProductCard } from './ProductCard.type';

interface ProductListProps {
    products: IProductCard[];
    addToBasket: (product: IProductCard) => void;
    onProductClick?: (product: IProductCard) => void;
}

const ProductList = ({ products, onProductClick, addToBasket }: ProductListProps) => {
    return (
        <>
            {products && products.map((product) => (
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