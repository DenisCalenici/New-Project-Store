import s from "./productCard.module.css";
import { Link } from "react-router-dom";
import hihi from "../../../../public/image/Logo.png";
import { useCartActions } from "../../../hooks/useCartAction";
import { useState } from "react";
import { IProductCard } from "../../../hooks/useProductFilter";
interface ProductProps {
  product: IProductCard;
  onProductClick?: (product: IProductCard) => void;
  onAddToBasket?: (product: IProductCard) => void; // ✅ Добавлен пропс для добавления в корзину
}

const ProductCard = ({
  product,
  onProductClick,
  onAddToBasket,
}: ProductProps) => {
  const { handleAddToBasket } = useCartActions();
  const [isExpanded, setIsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Валидация продукта
  const validateProduct = (
    product: IProductCard,
  ): {
    isValid: boolean;
    errors: string[];
  } => {
    const errors: string[] = [];

    if (!product) {
      errors.push("Продукт не определен");
      return { isValid: false, errors };
    }

    if (!product.id && product.id !== 0) {
      errors.push("Отсутствует id продукта");
    }

    if (!product.title?.trim()) {
      errors.push("Отсутствует название продукта");
    }

    if (product.price === undefined || product.price === null) {
      errors.push("Отсутствует цена продукта");
    } else if (typeof product.price !== "number") {
      errors.push("Цена должна быть числом");
    }

    if (!product.category?.trim()) {
      errors.push("Отсутствует категория продукта");
    }

    if (!product.image?.trim()) {
      console.warn("Продукт без изображения:", product.id);
    }

    if (!product.rating) {
      console.warn("Продукт без рейтинга:", product.id);
    }

    const isValid = errors.length === 0;

    if (!isValid) {
      console.error("Ошибки валидации продукта:", {
        product,
        errors,
      });
    }

    return { isValid, errors };
  };

  const validation = validateProduct(product);

  if (!validation.isValid) {
    return (
      <div className={s.error_card} role="alert">
        <div className={s.error_icon}>⚠️</div>
        <p className={s.error_text}>Ошибка загрузки товара</p>
        <p className={s.error_details}>ID: {product?.id || "неизвестен"}</p>
      </div>
    );
  }

  // Безопасное извлечение данных с fallback значениями
  const productId = String(product.id);
  const productTitle = product.title?.trim() || "Без названия";
  const productDescription = product.description?.trim() || "";
  const productPrice = product.price || 0;
  const productCategory = product.category?.trim() || "uncategorized";
  const productImage =
    !imageError && product.image?.trim() ? product.image : hihi;
  const productRating = product.rating || { rate: 0, count: 0 };
  const isAvailable = product.inStock !== false;
  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount
    ? productPrice * (1 - (product.discount || 0) / 100)
    : productPrice;

  const handleClick = () => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handleAddToBasketClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    console.log("Добавление в корзину:", productTitle);

    // ✅ Используем пропс onAddToBasket если он передан, иначе используем handleAddToBasket из хука
    if (onAddToBasket) {
      onAddToBasket(product);
    } else {
      handleAddToBasket(e, product);
    }
  };

  const handleTitleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  const handleImageError = () => {
    console.warn("Ошибка загрузки изображения для продукта:", productId);
    setImageError(true);
  };

  return (
    <div className={s.product_cards} data-product-id={productId}>
      <Link
        to={`/product/${productId}`}
        onClick={handleClick}
        className={s.product_link}
        aria-label={`Перейти к товару: ${productTitle}`}
      >
        <div className={s.filter_castle}>
          <div className={s.filter_castle_button_container}>
            {/* Кнопка избранного */}
            <button
              className={s.filter_castle_button_1}
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                console.log("Добавить в избранное:", productTitle);
              }}
              aria-label="Добавить в избранное"
            >
              ♡
            </button>

            {/* ✅ ИСПРАВЛЕНО: Кнопка "SALE" для добавления в корзину */}
            <button
              onClick={handleAddToBasketClick}
              className={`${s.filter_castle_button_2} ${
                hasDiscount ? s.has_discount : ""
              }`}
              aria-label="Добавить в корзину"
            >
              SALE
            </button>

            {/* Статус наличия */}
            <p
              className={`${s.filter_castle_availability_p} ${
                isAvailable ? s.in_stock : s.out_of_stock
              }`}
            >
              {isAvailable ? "В наличии" : "Нет в наличии"}
            </p>
          </div>

          {/* Блок с подарком */}
          {hasDiscount && (
            <div className={s.filter_castle_button_body3}>
              <button className={s.filter_castle_button_3}>
                <img
                  className={s.filter_castle_podarok_3}
                  src={hihi}
                  alt="Иконка подарка"
                />
                Подарок
              </button>
            </div>
          )}

          {/* Изображение товара */}
          <img
            src={productImage}
            className={s.filter_castle_img}
            alt={productTitle}
            onError={handleImageError}
            loading="lazy"
          />
        </div>

        {/* Название товара */}
        <h2
          className={`${s.price_card_name_p} ${isExpanded ? s.expanded : ""}`}
          onClick={handleTitleClick}
          title={isExpanded ? "Скрыть описание" : "Показать описание"}
        >
          {productTitle}
          <span className={s.expand_icon}>{isExpanded ? "▲" : "▼"}</span>
        </h2>

        {/* Описание товара (показывается при развертывании) */}
        {isExpanded && productDescription && (
          <p className={s.product_description}>{productDescription}</p>
        )}

        {/* Рейтинг товара */}
        <div className={s.rating_container}>
          <div
            className={s.rating_stars}
            aria-label={`Рейтинг: ${productRating.rate} из 5`}
          >
            {"★".repeat(Math.round(productRating.rate))}
            {"☆".repeat(5 - Math.round(productRating.rate))}
          </div>
          <p className={s.price_card_reviews_p}>
            {productRating.rate.toFixed(1)} ({productRating.count} отзывов)
          </p>
        </div>

        {/* Цена товара */}
        <div className={s.price_container}>
          <p className={s.price_current_price}>
            {hasDiscount ? (
              <>
                <span className={s.original_price}>
                  ${productPrice.toFixed(2)}
                </span>
                <span className={s.discounted_price}>
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className={s.discount_badge}>-{product.discount}%</span>
              </>
            ) : (
              `$${productPrice.toFixed(2)}`
            )}
          </p>
          <p className={s.price_category}>Категория: {productCategory}</p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
