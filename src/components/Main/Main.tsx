import React, { useState, useEffect, useRef } from "react";
import s from "./Main.module.css";
import type { IProductCard } from "../../hooks/useProductFilter";
import Numbers from "../Numbers/Numbers";
import WhyChooseUs from "../WhyChooseUs/WhyChooseUs";
import PopularProduct from "../common/popularProduct/PopularProduct";
import Categories from "../Categories";

interface MainProps {
  title?: string;
  onProductClick?: (product: IProductCard) => void;
}

const Main: React.FC<MainProps> = ({
  title = "Накладные электронные замки",
  onProductClick,
}) => {
  const [products, setProducts] = useState<IProductCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

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
          ...item,
          name: item.name || item.title || "",
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

  const showPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : products.length - 1));
  };

  const showNext = () => {
    setCurrentIndex((prev) => (prev < products.length - 1 ? prev + 1 : 0));
  };

  if (isLoading) {
    return (
      <div className={s.main_container}>
        <div className={s.main_loading_container}>
          <div className={s.main_loading_spinner}></div>
          <p>Загрузка продуктов...</p>
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

  const currentProduct = products[currentIndex];

  return (
    <div className={s.main_container}>
      <section className={s.main_section}>
        <div className={s.main_catalog_container}>
          <div className={s.productCenterWrapper}>
            <button
              className={`${s.nav_button} ${s.nav_button_prev}`}
              onClick={showPrevious}
              aria-label="Предыдущий товар"
            >
              ←
            </button>

            <div className={s.productCard}>
              <div className={s.productImageLeft}>
                <img
                  src={currentProduct.image}
                  alt={currentProduct.title}
                  className={s.productImage}
                />
              </div>

              <div className={s.productInfoRight}>
                <h3 className={s.productName}>{currentProduct.title}</h3>

                <p className={s.productDescription}>
                  {currentProduct.description
                    ? `${currentProduct.description.substring(0, 150)}...`
                    : "Описание товара временно отсутствует"}
                </p>

                <div className={s.priceBlock}>
                  <span className={s.currentPrice}>
                    {currentProduct.price} ₽
                  </span>
                  <span className={s.oldPrice}>
                    {Math.round(currentProduct.price * 1.2)} ₽
                  </span>
                </div>

                <button
                  className={s.addToCartButton}
                  onClick={() => addToBasket(currentProduct)}
                >
                  Добавить в корзину
                </button>
              </div>
            </div>

            <button
              className={`${s.nav_button} ${s.nav_button_next}`}
              onClick={showNext}
              aria-label="Следующий товар"
            >
              →
            </button>
          </div>

          <div className={s.productCounter}>
            {currentIndex + 1} / {products.length}
          </div>
        </div>
      </section>
      <section>
        <Numbers />
        <WhyChooseUs />
        <Categories />
        <PopularProduct />
      </section>
    </div>
  );
};

export default Main;