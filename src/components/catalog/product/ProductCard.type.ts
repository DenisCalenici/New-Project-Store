import { ReactNode } from "react";

export interface IProductCard {
  name: ReactNode;
  id: number;
  title: string; 
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
  // Дополнительные поля
  inStock?: boolean;
  discount?: number;
  brand?: string;

}
