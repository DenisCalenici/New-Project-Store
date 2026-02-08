// components/filters/FilterProduct.tsx
import React from "react";
// ИСПРАВЛЕНО: Импортируем тип из хука
import type { FilterState } from "../../../hooks/useProductFilter";
import s from "./Filter.module.css";

// ИСПРАВЛЕНО: Добавляем все необходимые пропсы
export interface FilterProductProps {
  filters: FilterState;
  categories: string[];
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (min: number, max: number) => void;
  onSearchChange: (query: string) => void;
  onSortChange?: (sortBy: FilterState["sortBy"]) => void; // ИСПРАВЛЕНО: Добавлено
  onClose?: () => void;
  onReset: () => void;
  className?: string;
}

const FilterProduct: React.FC<FilterProductProps> = ({
  filters,
  categories,
  onCategoryChange,
  onPriceRangeChange,
  onSearchChange,
  onSortChange,
  onClose,
  onReset,
  className = "",
}) => {
  // ИСПРАВЛЕНО: Функция для форматирования категории
  const formatCategoryName = (category: string): string => {
    if (category === "all") return "Все категории";
    // Первая буква заглавная, остальные строчные
    return category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  };

  // ИСПРАВЛЕНО: Проверяем, есть ли активные фильтры
  const hasActiveFilters =
    filters.category !== "all" ||
    filters.searchQuery.trim() !== "" ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 1000;

  return (
    <div className={`${s.filter_container} ${className}`}>
      {/* ИСПРАВЛЕНО: Заголовок с кнопкой закрытия для мобильных */}
      <div className={s.filter_header}>
        <h3 className={s.filter_title}>Фильтры</h3>
        {onClose && (
          <button
            onClick={onClose}
            className={s.close_button}
            aria-label="Закрыть фильтры"
          >
            ✕
          </button>
        )}
      </div>

      {/* ИСПРАВЛЕНО: Секция сортировки */}
      {onSortChange && (
        <div className={s.filter_section}>
          <h4 className={s.filter_section_title}>Сортировка</h4>
          <select
            value={filters.sortBy}
            onChange={(e) => {
              const value = e.target.value as FilterState["sortBy"];
              console.log("Изменена сортировка на:", value);
              onSortChange(value);
            }}
            className={s.sort_select}
            aria-label="Выберите тип сортировки товаров"
          >
            <option value="popularity">По популярности</option>
            <option value="price-low">Сначала дешевые</option>
            <option value="price-high">Сначала дорогие</option>
            <option value="rating">По рейтингу</option>
          </select>
        </div>
      )}

      {/* ИСПРАВЛЕНО: Секция поиска */}
      <div className={s.filter_section}>
        <h4 className={s.filter_section_title}>Поиск</h4>
        <div className={s.search_container}>
          <input
            type="text"
            placeholder="Поиск товаров..."
            value={filters.searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              console.log("Поисковый запрос:", value);
              onSearchChange(value);
            }}
            className={s.search_input}
            aria-label="Поиск товаров по названию или описанию"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className={s.clear_search_button}
              aria-label="Очистить поиск"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* ИСПРАВЛЕНО: Секция цены с улучшенным UX */}
      <div className={s.filter_section}>
        <h4 className={s.filter_section_title}>
          Цена: ${filters.priceRange[0]} - ${filters.priceRange[1]}
        </h4>
        <div className={s.price_range}>
          <div className={s.price_inputs}>
            <label className={s.price_label}>
              <span className={s.price_label_text}>От</span>
              <input
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => {
                  const min = Math.max(0, Number(e.target.value));
                  const max = Math.max(min, filters.priceRange[1]);
                  console.log("Изменение мин. цены:", min);
                  onPriceRangeChange(min, max);
                }}
                min="0"
                max="1000"
                className={s.price_input}
                aria-label="Минимальная цена"
              />
            </label>
            <span className={s.price_separator}>—</span>
            <label className={s.price_label}>
              <span className={s.price_label_text}>До</span>
              <input
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => {
                  const max = Math.min(1000, Number(e.target.value));
                  const min = Math.min(filters.priceRange[0], max);
                  console.log("Изменение макс. цены:", max);
                  onPriceRangeChange(min, max);
                }}
                min="0"
                max="1000"
                className={s.price_input}
                aria-label="Максимальная цена"
              />
            </label>
          </div>
          {/* ИСПРАВЛЕНО: Range слайдер для лучшего UX */}
          <div className={s.price_slider_container}>
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[0]}
              onChange={(e) =>
                onPriceRangeChange(Number(e.target.value), filters.priceRange[1])
              }
              className={s.price_slider}
              aria-label="Минимальная цена слайдер"
            />
            <input
              type="range"
              min="0"
              max="1000"
              value={filters.priceRange[1]}
              onChange={(e) =>
                onPriceRangeChange(filters.priceRange[0], Number(e.target.value))
              }
              className={s.price_slider}
              aria-label="Максимальная цена слайдер"
            />
          </div>
        </div>
      </div>

      {/* ИСПРАВЛЕНО: Секция категорий с radio кнопками */}
      <div className={s.filter_section}>
        <h4 className={s.filter_section_title}>Категории</h4>
        <div className={s.categories_list} role="radiogroup" aria-label="Выбор категории товаров">
          {categories.map((category) => (
            <label
              key={`category-${category}`}
              className={`${s.category_label} ${
                filters.category === category ? s.category_label_active : ""
              }`}
            >
              <input
                type="radio"
                name="category"
                value={category}
                checked={filters.category === category}
                onChange={() => {
                  console.log("Выбрана категория:", category);
                  onCategoryChange(category);
                }}
                className={s.category_radio}
                aria-checked={filters.category === category}
              />
              <span className={s.category_text}>
                {formatCategoryName(category)}
                {filters.category === category && (
                  <span className={s.category_selected_indicator}>✓</span>
                )}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* ИСПРАВЛЕНО: Кнопка сброса фильтров */}
      <div className={s.filter_actions}>
        <button
          onClick={() => {
            console.log("Нажата кнопка сброса фильтров");
            onReset();
          }}
          className={`${s.reset_button} ${
            !hasActiveFilters ? s.reset_button_disabled : ""
          }`}
          disabled={!hasActiveFilters}
          aria-label="Сбросить все фильтры"
        >
          Сбросить фильтры
          {hasActiveFilters && (
            <span className={s.reset_button_badge}>!</span>
          )}
        </button>
      </div>

      {/* ИСПРАВЛЕНО: Информация о текущих фильтрах */}
      {hasActiveFilters && (
        <div className={s.active_filters_info}>
          <h5 className={s.active_filters_title}>Активные фильтры:</h5>
          <ul className={s.active_filters_list}>
            {filters.category !== "all" && (
              <li className={s.active_filter_item}>
                Категория: {formatCategoryName(filters.category)}
              </li>
            )}
            {filters.searchQuery && (
              <li className={s.active_filter_item}>
                Поиск: "{filters.searchQuery}"
              </li>
            )}
            {(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000) && (
              <li className={s.active_filter_item}>
                Цена: ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default FilterProduct;