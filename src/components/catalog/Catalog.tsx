import React, { useState, useEffect } from "react";
import Layout from "../common/layout/Layout";
import FilterProduct from "./filters/Filter";
import ProductList from "./product/ProductList"; 
import {
  useProductFilter,
  type IProductCard,
} from "../../hooks/useProductFilter";
import s from "./Catalog.module.css";

interface CatalogProps {
  title?: string;
  onProductClick?: (product: IProductCard) => void;
 
}

const Catalog: React.FC<CatalogProps> = ({
  title = "Накладные электронные замки",
  onProductClick,
}) => {
 
  const [products, setProducts] = useState<IProductCard[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


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
    totalProducts,
    activeFiltersCount,
    hasActiveFilters,
  } = useProductFilter(products);

  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  
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


  const addToBasket = (product: IProductCard) => {
    console.log("Товар добавлен в корзину из Catalog:", product.title);
   
  };

  return (
    <Layout>
      <section>
        <div className={s.catalog_container}>

          <h1 className={s.h1}>
            {title} ({filteredProducts.length})
            {hasActiveFilters && (
              <span className={s.active_filters_badge}>
                Активных фильтров: {activeFiltersCount}
              </span>
            )}
          </h1>

          <div className={s.catalog_controls}>
            <button
              className={`${s.button} ${s.filter_toggle}`}
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              aria-expanded={isFiltersOpen}
            >
              {isFiltersOpen ? "✕ Скрыть фильтры" : "☰ Показать фильтры"}
            </button>

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
                <span className={s.reset_badge}>{activeFiltersCount}</span>
              )}
            </button>

            <div className={s.sort_container}>
              <label htmlFor="sort-select" className={s.sort_label}>
                Сортировка:
              </label>
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

             
              {filteredProducts.length === 0 ? (
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
                <div className={s.products_grid}>
            
                  <ProductList 
                    products={filteredProducts}
                    addToBasket={addToBasket}
                    onProductClick={onProductClick}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Catalog;

type FilterState = ReturnType<typeof useProductFilter>["filters"];
