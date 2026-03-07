import React from "react";
import { Link } from "react-router-dom";
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
          <Link to={`/product/${product.id}`} className={s.productLink}>
            <img
              src={product.image}
              alt={product.title}
              className={s.productImage}
              onClick={() => onProductClick?.(product)}
            />
          </Link>

          <button className={s.favoriteButton}>♥</button>

          <div className={s.availability}>
            <span className={s.availabilityText}>В наличии</span>
          </div>

          <button
            className={s.compareButton}
            onClick={() => addToBasket(product)}
          >
            SALE
          </button>

          <button className={s.giftButton}>
            <span className={s.giftIcon}>🎁</span>В подарок
          </button>

          <div className={s.productInfo}>
            <Link to={`/product/${product.id}`} className={s.productNameLink}>
              <h3 className={s.productName}>{product.title}</h3>
            </Link>

            <div className={s.reviewsBlock}>
              <div className={s.rating}>
                <span className={s.stars}>
                  {"★".repeat(Math.round(product.rating?.rate || 5))}
                </span>
                <span className={s.stars_empty}>
                  {"☆".repeat(5 - Math.round(product.rating?.rate || 5))}
                </span>
              </div>
              <span className={s.reviewsCount}>
                {product.rating?.count || 0} отзывов
              </span>
            </div>

            <div className={s.priceBlock}>
              <span className={s.currentPrice}>{product.price} ₽</span>
              {product.discount ? (
                <span className={s.oldPrice}>
                  {Math.round(product.price * (1 + product.discount / 100))} ₽
                </span>
              ) : (
                <span className={s.oldPrice}>
                  {Math.round(product.price * 1.2)} ₽
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ProductList;
