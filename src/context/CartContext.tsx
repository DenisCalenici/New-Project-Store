import type { ReactNode } from "react";
import React, { createContext, useContext, useState, useEffect } from "react";
import type { IProductCard } from "../components/catalog/product/ProductCard.type";

interface CartItem extends IProductCard {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: IProductCard) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
  headerCartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [headerCartCount, setHeaderCartCount] = useState<number>(0);

  const actualCartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  useEffect(() => {
    setHeaderCartCount(actualCartCount);
  }, [actualCartCount]);

  useEffect(() => {
    localStorage.setItem("headerCartCount", headerCartCount.toString());
  }, [headerCartCount]);

  const addToCart = (product: IProductCard) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) => {
      return prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      );
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    headerCartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
