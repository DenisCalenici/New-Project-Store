import { useEffect, useRef, useState } from "react";
import { IProductCard } from "../../catalog/product/ProductCard.type";
import s from "./PopularProduct.module.css";

interface PopularProductProps {
  title?: string;
  onProductClick?: (product: IProductCard) => void;
}

const PopularProduct: React.FC<PopularProductProps> = ({
  title = "Накладные электронные замки",
  onProductClick,
}) => {
  const [products, setProducts] = useState<IProductCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка при загрузке данных: ${response.status}`);
        }
        return response.json();
      })
      .then((apiData: any[]) => {
        const transformedData: IProductCard[] = apiData.map((item) => ({
          id: item.id,
          title: item.title,
          name: item.title,
          price: item.price,
          description: item.description,
          category: item.category,
          image: item.image,
          rating: item.rating,
        }));
        setProducts(transformedData);
        setIsLoading(false);
      })
      .catch((err: any) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const addToBasket = (product: IProductCard) => {
    console.log("Товар добавлен в корзину:", product.title);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };

  if (isLoading) {
    return (
      <div className={s.popular_container}>
        <div className={s.loadingContainer}>
          <div className={s.loadingSpinner}></div>
          <p>Загрузка популярных продуктов...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={s.popular_container}>
        <div className={s.emptyContainer}>
          <h2>Ошибка загрузки</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={s.popular_button}
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={s.popular_container}>
      <div className={s.popular_header}>
        <h1>Наши популярные продукты</h1>
      </div>

      <section className={s.popular_section}>
        <div className={s.popular_catalog_container}>
          <div className={s.popular_products_wrapper}>
            <button
              className={`${s.scrollButton} ${s.scrollButtonLeft}`}
              onClick={scrollLeft}
              aria-label="Прокрутить влево"
            >
              ←
            </button>

            <div
              className={s.popular_products_scroll_container}
              ref={scrollContainerRef}
            >
              <div className={s.popular_products_grid}>
                {products.map((product) => (
                  <div key={product.id} className={s.productCard}>
                    <img
                      src={product.image}
                      alt={product.title}
                      className={s.productImage}
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
                        <span className={s.currentPrice}>
                          {product.price} ₽
                        </span>
                        <span className={s.oldPrice}>
                          {Math.round(product.price * 1.2)} ₽
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              className={`${s.scrollButton} ${s.scrollButtonRight}`}
              onClick={scrollRight}
              aria-label="Прокрутить вправо"
            >
              →
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PopularProduct;
