import React, { useState, useEffect } from "react";
import Layout from "../common/layout/Layout";
import FilterProduct from "./filters/Filter";
import ProductList from "./product/ProductList";
import Basket from "../common/basket/Basket";
import s from "./Catalog.module.css";
import Ceo from "../common/ceo/Ceo";
import PopularProduct from "../common/popularProduct/PopularProduct";
import {
  useProductFilter,
  type IProductCard,
} from "../../hooks/useProductFilter";
import { Link } from "react-router-dom";

interface BasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CatalogProps {
  title?: string;
  onProductClick?: (product: IProductCard) => void;
}

type FilterState = ReturnType<typeof useProductFilter>["filters"];

const Catalog: React.FC<CatalogProps> = ({
  title = "Накладные электронные замки",
  onProductClick,
}) => {
  const [products, setProducts] = useState<IProductCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 4;

  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [basketItems, setBasketItems] = useState<BasketItem[]>([]);

  const openBasket = () => setIsBasketOpen(true);
  const closeBasket = () => setIsBasketOpen(false);

  const addToBasket = (product: IProductCard) => {
    setBasketItems((prevItems: BasketItem[]) => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        const newItem: BasketItem = {
          id: product.id,
          name: product.title,
          price: product.price,
          quantity: 1,
          image: product.image
        };
        return [...prevItems, newItem];
      }
    });
    
    console.log("✅ Товар добавлен в корзину:", product.title);
  };

  const updateQuantity = (id: number, quantity: number) => {
    setBasketItems((prevItems: BasketItem[]) =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setBasketItems((prevItems: BasketItem[]) => 
      prevItems.filter(item => item.id !== id)
    );
  };

  const totalBasketItems = basketItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    console.log("🔄 Catalog: Запрос данных...");
    setIsLoading(true);

    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка при загрузке данных: ${response.status}`);
        }
        return response.json();
      })
      .then((data: IProductCard[]) => {
        console.log(`✅ Catalog: Получено ${data.length} продуктов`);
        setProducts(data);
        setIsLoading(false);
      })
      .catch((err: any) => {
        console.error("❌ Catalog: Ошибка загрузки:", err);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  const {
    filters,
    filteredProducts,
    categories,
    updateCategory,
    updatePriceRange,
    updateSearchQuery,
    updateSortBy,
    resetFilters,
    activeFiltersCount,
    hasActiveFilters,
  } = useProductFilter(products);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPage = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts.length]);

  if (isLoading) {
    return (
      <Layout>
        <div className={s.loading_container}>
          <div className={s.loading_spinner}></div>
          <p>Загрузка каталога...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className={s.empty_container}>
          <h2>Ошибка загрузки</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className={s.button}>
            Попробовать снова
          </button>
        </div>
      </Layout>
    );
  }

  if (!products || products.length === 0) {
    return (
      <Layout>
        <div className={s.empty_container}>
          <h2>Каталог пуст</h2>
          <p>Товары временно отсутствуют</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section>
        <div className={s.catalog_container}>
          <div className={s.catalog_header}>
            <h1 className={s.h1}>
              {title} ({filteredProducts.length})
            </h1>
          </div>

          <div className={s.catalog_controls}>
            <button
              className={`${s.button} ${s.reset_button} ${
                !hasActiveFilters ? s.button_disabled : ""
              }`}
              onClick={resetFilters}
              disabled={!hasActiveFilters}
              title="Сбросить все фильтры"
            >
              Сбросить фильтры
              {hasActiveFilters && (
                <span className={s.reset_badge}></span>
              )}
            </button>
            {hasActiveFilters && (
              <span className={s.active_filters_badge}>
                Активных фильтров: {activeFiltersCount}
              </span>
            )}
            <div className={s.sort_container}>
              <select
                id="sort-select"
                value={filters.sortBy}
                onChange={(e) =>
                  updateSortBy(e.target.value as FilterState["sortBy"])
                }
                className={s.sort_select}
                aria-label="Выберите тип сортировки"
              >
                <option value="popularity">По популярности</option>
                <option value="price-low">Сначала дешевые</option>
                <option value="price-high">Сначала дорогие</option>
                <option value="rating">По рейтингу</option>
              </select>
            </div>
          </div>

          <div className={s.filter_body}>
            <div
              className={`${s.catalog_filter} ${
                isFiltersOpen ? s.filter_open : ""
              }`}
              role="complementary"
              aria-label="Фильтры товаров"
            >
              <FilterProduct
                filters={filters}
                categories={categories}
                onCategoryChange={updateCategory}
                onPriceRangeChange={updatePriceRange}
                onSearchChange={updateSearchQuery}
                onSortChange={updateSortBy}
                onReset={resetFilters}
                onClose={() => setIsFiltersOpen(false)}
              />
            </div>

            <div className={s.catalog_content} role="main">
              <div className={s.filter_info}>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className={s.clear_filters_button}
                    aria-label="Очистить все фильтры"
                  >
                    Очистить фильтры
                  </button>
                )}
              </div>

              {currentProducts.length === 0 ? (
                <div className={s.no_results} role="alert">
                  <div className={s.no_results_icon}>🔍</div>
                  <h3 className={s.no_results_title}>Товары не найдены</h3>
                  <p className={s.no_results_text}>
                    Попробуйте изменить параметры фильтров или сбросить их
                  </p>
                  <button
                    onClick={resetFilters}
                    className={`${s.button} ${s.no_results_button}`}
                  >
                    Сбросить все фильтры
                  </button>
                </div>
              ) : (
                <>
                  <div className={s.products_grid}>
                    {/* <Link  to={`/product/${productId}`}></Link> */}
                    <ProductList 
                      products={currentProducts}
                      addToBasket={addToBasket}
                      onProductClick={onProductClick}
                    />
                  </div>

                  {totalPages > 1 && (
                    <div className={s.pagination}>
                      <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={s.pagination_arrow}
                        aria-label="Предыдущая страница"
                      >
                        ←
                      </button>

                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                        <button
                          key={number}
                          onClick={() => goToPage(number)}
                          className={`${s.pagination_number} ${
                            currentPage === number ? s.pagination_active : ""
                          }`}
                          aria-label={`Страница ${number}`}
                          aria-current={currentPage === number ? "page" : undefined}
                        >
                          {number}
                        </button>
                      ))}

                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={s.pagination_arrow}
                        aria-label="Следующая страница"
                      >
                        →
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <PopularProduct />
      <Ceo/>

      <Basket
        isOpen={isBasketOpen}
        onClose={closeBasket}
        items={basketItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </Layout>
  );
};

export default Catalog;