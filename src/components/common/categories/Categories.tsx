


import { useEffect, useRef, useState } from "react";
import { IProductCard } from "../../catalog/product/ProductCard.type";
import ProductList from "../product/ProductList";
import s from "./PopularProduct.module.css";
interface CategoriesProps {
  title?: string;
  onProductClick?: (product: IProductCard) => void;
}
const Categories: React.FC<CategoriesProps> = ({
  title = "Накладные электронные замки",
  onProductClick,
}) => {
  const [products, setProducts] = useState<IProductCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  coёnst [error, setError] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    console.log("🔄 Main: Запрос данных...");
    setIsLoading(true);

    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка при загрузке данных: ${response.status}`);
        }
        return response.json();
      })
      .then((apiData: any[]) => {
        console.log(`✅ Main: Получено ${apiData.length} продуктов`);

        const transformedData: IProductCard[] = apiData.map((item) => ({
          ...item,
          name: item.name || item.title || "",
        }));

        setProducts(transformedData);
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.error("❌ Main: Ошибка загрузки:", err);
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
      <div className={s.main_container}>
        <div className={s.main_loading_container}>
          <div className={s.main_loading_spinner}></div>
          <p>Загрузка популярных продуктов...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={s.main_container}>
        <div className={s.main_empty_container}>
          <h2>Ошибка загрузки</h2>
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className={s.main_button}
          >
            Попробовать снова
          </button>
        </div>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className={s.main_container}>
        <div className={s.main_empty_container}>
          <h2>Каталог пуст</h2>
          <p>Товары временно отсутствуют</p>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <h1>Наши популярные продукты</h1>
      </div>
      <div>
        <section className={s.main_section}>
          <div className={s.main_catalog_container}>
            <div className={s.main_products_wrapper}>
              <button
                className={`${s.main_scroll_button} ${s.main_scroll_button_left}`}
                onClick={scrollLeft}
                aria-label="Прокрутить влево"
              >
                ←
              </button>

              <div
                className={s.main_products_scroll_container}
                ref={scrollContainerRef}
              >
                <div className={s.main_products_grid}>
                  <ProductList
                    products={products}
                    addToBasket={addToBasket}
                    onProductClick={onProductClick}
                  />
                </div>
              </div>

              <button
                className={`${s.main_scroll_button} ${s.main_scroll_button_right}`}
                onClick={scrollRight}
                aria-label="Прокрутить вправо"
              >
                →
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Categories