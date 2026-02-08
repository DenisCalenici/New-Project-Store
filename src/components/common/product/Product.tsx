import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import s from "./Product.module.css";
import ProductList from "./ProductList";
import type { IProductCard } from "../../catalog/product/ProductCard.type";
import FilterProduct from "../../catalog/filters/Filter";
import { useProductFilter } from "../../../hooks/useProductFilter";
const Product = () => {
  const [products, setProducts] = useState<IProductCard[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);

  const {
    filters,
    filteredProducts,
    categories,
    updateCategory,
    updatePriceRange,
    updateSearchQuery,
    updateSortBy,
    resetFilters,
  } = useProductFilter(products || []);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    pages.push(1);

    let startPage = Math.max(2, currentPage - 2);
    let endPage = Math.min(totalPages - 1, currentPage + 2);

    if (startPage > 2) {
      pages.push("ellipsis-start");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push("ellipsis-end");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const renderDesktopPagination = () => {
    const pages = renderPageNumbers();
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
      <div className={s.paginator_filter}>
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage - 1);
          }}
          className={`${s.paginator_arrow} ${currentPage === 1 ? s.disabled : ""}`}
        >
          &lt;
        </Link>

        {pages.map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <span key={`ellipsis-${index}`} className={s.paginator_ellipsis}>
                ...
              </span>
            );
          }

          return (
            <Link
              key={page}
              to="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page as number);
              }}
              className={currentPage === page ? s.paginator_active : ""}
            >
              {page}
            </Link>
          );
        })}

        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage + 1);
          }}
          className={`${s.paginator_arrow} ${currentPage === totalPages ? s.disabled : ""}`}
        >
          &gt;
        </Link>
      </div>
    );
  };

  const renderMobilePagination = () => {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const pages = [1, 2, 3, "ellipsis", totalPages].filter(
      (page) => page !== "ellipsis" || totalPages > 4,
    );

    return (
      <div className={s.paginator_filter_mobile}>
        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage - 1);
          }}
          className={`${s.paginator_arrow} ${currentPage === 1 ? s.disabled : ""}`}
        >
          &lt;
        </Link>

        {pages.map((page, index) => {
          if (page === "ellipsis") {
            return (
              <span key="ellipsis" className={s.paginator_ellipsis}>
                ...
              </span>
            );
          }

          return (
            <Link
              key={page}
              to="#"
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(page as number);
              }}
              className={currentPage === page ? s.paginator_active_mobile : ""}
            >
              {page}
            </Link>
          );
        })}

        <Link
          to="#"
          onClick={(e) => {
            e.preventDefault();
            handlePageChange(currentPage + 1);
          }}
          className={`${s.paginator_arrow} ${currentPage === totalPages ? s.disabled : ""}`}
        >
          &gt;
        </Link>
      </div>
    );
  };

  const addToBasket = (product: IProductCard) => {
    console.log("Товар добавлен в корзину:", product);
  };

  const handleResetFilters = () => {
    resetFilters();
    setCurrentPage(1);
    console.log("Фильтры сброшены");
  };

  const handleSortByPopularity = () => {
    const sortOptions: Array<
      "popularity" | "price-low" | "price-high" | "rating"
    > = ["popularity", "price-low", "price-high", "rating"];
    const currentIndex = sortOptions.indexOf(filters.sortBy);
    const nextIndex = (currentIndex + 1) % sortOptions.length;
    updateSortBy(sortOptions[nextIndex]);
    setCurrentPage(1);
  };
  const handleApplyFilter = () => {
    setShowFilters(!showFilters);
  };

  const getSortButtonText = () => {
    switch (filters.sortBy) {
      case "price-low":
        return "Цена (низкая)";
      case "price-high":
        return "Цена (высокая)";
      case "rating":
        return "Рейтингу";
      case "popularity":
      default:
        return "Популярности";
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, filteredProducts.length]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка при загрузке данных: ${response.status}`);
        }
        return response.json();
      })
      .then((data: IProductCard[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className={s.loading_error}>Загрузка...</div>;
  }

  if (error) {
    return <div className={s.loading_error}>Ошибка: {error}</div>;
  }

  return (
    <div className={s.catalog}>
      <div className={s.block}>
        <button className={s.filter_button_1} onClick={handleResetFilters}>
          Сбросить фильтры
        </button>
        <button className={s.filter_button_2} onClick={handleSortByPopularity}>
          <p className={s.filter_p_2}>{getSortButtonText()}</p>
          <div className={s.filter_img_2}>
            <img alt="Стрелка" />
          </div>
        </button>
      </div>

      <div className={s.block_2}>
        <button className={s.filter_button_3} onClick={handleApplyFilter}>
          Фильтр
        </button>
        <br />
        <button className={s.filter_button_4} onClick={handleSortByPopularity}>
          <p className={s.filter_p_4}>{getSortButtonText()}</p>
          <div className={s.filter_img_4}>
            <img alt="Стрелка" />
          </div>
        </button>
      </div>

      <div className={s.filter_block}>
        <div
          className={`${s.filter} ${showFilters ? s.filter_mobile_show : ""}`}
        >
          <FilterProduct
            filters={filters}
            categories={categories}
            onCategoryChange={updateCategory}
            onPriceRangeChange={updatePriceRange}
            onSearchChange={updateSearchQuery}
            onReset={() => {
              resetFilters();
              setCurrentPage(1);
            }}
            onClose={() => setShowFilters(false)}
          />
        </div>
        <div className={s.filter_product}>
          <div className={s.filter_product_cards}>
            <ProductList
              addToBasket={addToBasket}
              products={getCurrentPageProducts()}
            />
          </div>

          {filteredProducts.length > itemsPerPage && (
            <>
              {renderDesktopPagination()}
              {renderMobilePagination()}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
