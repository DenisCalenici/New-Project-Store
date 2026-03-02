import React from "react";
import { IProductCard } from "../../../hooks/useProductFilter";
import s from "./ProductList.module.css";

interface ProductListProps {
  products: IProductCard[];
  addToBasket: (product: IProductCard) => void;
  onProductClick?: (product: IProductCard) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  addToBasket,
  onProductClick,
}) => {
  if (!products || products.length === 0) {
    return (
      <div className={s.empty_product_list}>
        <p>Товары не найдены</p>
      </div>
    );
  }

  return (
    <>
      {products.map((product) => (
        <div key={product.id} className={s.productCard}>
          <img
            src={product.image}
            alt={product.title}
            className={s.productImage}
            onClick={() => onProductClick?.(product)}
          />

          <button className={s.favoriteButton}>♥</button>

          <div className={s.availability}>
            <span className={s.availabilityText}>В наличии</span>
          </div>

          <button className={s.compareButton}>SALE</button>

          <button className={s.giftButton}>
            <span className={s.giftIcon}>🎁</span>В подарок
          </button>

          <div className={s.productInfo}>
            <h3 className={s.productName}>{product.title}</h3>

            <div className={s.reviewsBlock}>
              <div className={s.rating}>
                <span className={s.stars}>★★★★★</span>
              </div>
              <span className={s.reviewsCount}>15 отзывов</span>
            </div>

            <div className={s.priceBlock}>
              <span className={s.currentPrice}>{product.price} ₽</span>
              <span className={s.oldPrice}>
                {Math.round(product.price * 1.2)} ₽
              </span>
            </div>

          
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductList;