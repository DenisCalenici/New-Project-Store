import { IProductCard } from "../../../hooks/useProductFilter";

export type { IProductCard };
// export interface IProductCard {
//   id: number;
//   title: string;        // Название товара (должно быть одно поле)
//   description: string;
//   price: number;
//   category: string;
//   image: string;
//   rating: {
//     rate: number;
//     count: number;
//   };
//   inStock?: boolean;
//   discount?: number;
//   brand?: string;
//}
export interface BasketItem {
  id: number;
  name: string;  // Здесь name - это название товара для корзины
  price: number;
  quantity: number;
  image: string;
}