import { useCart } from "../context/CartContext";
import type { IProductCard } from "../components/catalog/product/ProductCard.type";
import React from "react";
export const useCartActions = () => {
  const { addToCart } = useCart();

  const handleAddToBasket = (e: React.MouseEvent, product: IProductCard) => {
    e.stopPropagation();
    e.preventDefault();
    addToCart(product);
  };

  return { handleAddToBasket };
};
