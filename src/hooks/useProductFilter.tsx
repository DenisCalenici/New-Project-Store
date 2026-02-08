// hooks/useProductFilter.tsx
import { useState, useMemo, useCallback } from "react";

// ИСПРАВЛЕНО: Создаем тип продукта, который совпадает с твоим IProductCard

import { IProductCard } from "../components/catalog/product/ProductCard.type";

// ИСПРАВЛЕНО: Экспортируем тип состояния фильтров
export interface FilterState {
  category: string;
  priceRange: [number, number];
  searchQuery: string;
  sortBy: "popularity" | "price-low" | "price-high" | "rating";
}

// ИСПРАВЛЕНО: Добавляем интерфейс возвращаемого значения
export interface UseProductFilterReturn {
  filters: FilterState;
  filteredProducts: IProductCard[];
  categories: string[];
  updateCategory: (category: string) => void;
  updatePriceRange: (min: number, max: number) => void;
  updateSearchQuery: (query: string) => void;
  updateSortBy: (sortBy: FilterState["sortBy"]) => void;
  resetFilters: () => void;
  totalProducts: number;
  activeFiltersCount: number;
  hasActiveFilters: boolean;
}

export const useProductFilter = (
  products?: IProductCard[]
): UseProductFilterReturn => {
  // ИСПРАВЛЕНО: Защита от undefined - всегда работаем с массивом
  const safeProducts: IProductCard[] = products || [];

  // ИСПРАВЛЕНО: Логируем для отладки
  console.log("useProductFilter получил:", {
    total: safeProducts.length,
    firstProduct: safeProducts[0],
    isArray: Array.isArray(safeProducts),
  });

  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    priceRange: [0, 1000],
    searchQuery: "",
    sortBy: "popularity",
  });

  // ИСПРАВЛЕНО: Получаем категории с защитой от отсутствия данных
  const categories = useMemo(() => {
    if (!safeProducts || safeProducts.length === 0) {
      console.warn("Нет продуктов для получения категорий");
      return ["all"];
    }

    try {
      // ИСПРАВЛЕНО: Фильтруем продукты без категории
      const productsWithCategory = safeProducts.filter(
        (p) => p && p.category !== undefined && p.category !== null
      );

      if (productsWithCategory.length === 0) {
        return ["all"];
      }

      const uniqueCategories = new Set(
        productsWithCategory.map((product) => product.category)
      );
      const result = ["all", ...Array.from(uniqueCategories)];

      console.log("Полученные категории:", result);
      return result;
    } catch (error) {
      console.error("Ошибка при получении категорий:", error);
      return ["all"];
    }
  }, [safeProducts]);

  // ИСПРАВЛЕНО: Фильтрация с полной проверкой всех полей
  const filteredProducts = useMemo(() => {
    if (!safeProducts || safeProducts.length === 0) {
      console.warn("Нет продуктов для фильтрации");
      return [];
    }

    try {
      let filtered = safeProducts.filter((product) => {
        // ИСПРАВЛЕНО: Проверяем, что продукт существует
        if (!product) {
          console.warn("Найден undefined продукт в массиве");
          return false;
        }

        // ИСПРАВЛЕНО: Проверяем обязательные поля
        const hasRequiredFields =
          product.id !== undefined &&
          product.title !== undefined &&
          product.price !== undefined &&
          product.category !== undefined;

        if (!hasRequiredFields) {
          console.warn("Продукт без обязательных полей:", product);
          return false;
        }

        // 1. Фильтр по категории
        if (
          filters.category !== "all" &&
          product.category !== filters.category
        ) {
          return false;
        }

        // 2. Фильтр по цене
        if (
          typeof product.price !== "number" ||
          product.price < filters.priceRange[0] ||
          product.price > filters.priceRange[1]
        ) {
          return false;
        }

        // 3. Фильтр по поисковому запросу
        if (filters.searchQuery.trim()) {
          const query = filters.searchQuery.toLowerCase();
          const title = (product.title || "").toLowerCase();
          const description = (product.description || "").toLowerCase();

          if (!title.includes(query) && !description.includes(query)) {
            return false;
          }
        }

        return true;
      });

      console.log(`После фильтрации: ${filtered.length} из ${safeProducts.length}`);

      // ИСПРАВЛЕНО: Сортировка с защитой от отсутствия рейтинга
      switch (filters.sortBy) {
        case "price-low":
          filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
          break;
        case "price-high":
          filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
          break;
        case "rating":
          filtered.sort(
            (a, b) =>
              (b.rating?.rate || 0) - (a.rating?.rate || 0)
          );
          break;
        case "popularity":
        default:
          filtered.sort(
            (a, b) =>
              (b.rating?.count || 0) - (a.rating?.count || 0)
          );
          break;
      }

      return filtered;
    } catch (error) {
      console.error("Ошибка при фильтрации продуктов:", error);
      return [];
    }
  }, [safeProducts, filters]);

  // ИСПРАВЛЕНО: Добавляем полезные вычисляемые значения
  const totalProducts = safeProducts.length;
  
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (filters.category !== "all") count++;
    if (filters.searchQuery.trim()) count++;
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000) count++;
    return count;
  }, [filters]);

  const hasActiveFilters = activeFiltersCount > 0;

  // ИСПРАВЛЕНО: Обертываем функции в useCallback для оптимизации
  const updateCategory = useCallback((category: string) => {
    console.log("Изменение категории на:", category);
    setFilters((prev) => ({ ...prev, category }));
  }, []);

  const updatePriceRange = useCallback((min: number, max: number) => {
    console.log("Изменение диапазона цен:", [min, max]);
    setFilters((prev) => ({ ...prev, priceRange: [min, max] }));
  }, []);

  const updateSearchQuery = useCallback((query: string) => {
    console.log("Изменение поискового запроса:", query);
    setFilters((prev) => ({ ...prev, searchQuery: query }));
  }, []);

  const updateSortBy = useCallback((sortBy: FilterState["sortBy"]) => {
    console.log("Изменение сортировки на:", sortBy);
    setFilters((prev) => ({ ...prev, sortBy }));
  }, []);

  const resetFilters = useCallback(() => {
    console.log("Сброс фильтров");
    setFilters({
      category: "all",
      priceRange: [0, 1000],
      searchQuery: "",
      sortBy: "popularity",
    });
  }, []);

  // ИСПРАВЛЕНО: Возвращаем полный объект с данными
  return {
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
  };
};



export type { IProductCard };

