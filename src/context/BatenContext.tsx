// BasketContext.tsx
import React, { createContext, useContext, useState } from 'react';
import { IProductCard, BasketItem } from '../components/catalog/product/ProductCard.type';

interface BasketContextType {
  items: BasketItem[];
  addToBasket: (product: IProductCard) => void;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  totalItems: number;
  totalPrice: number;
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context) {
    throw new Error('useBasket must be used within BasketProvider');
  }
  return context;
};

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<BasketItem[]>([]);

  const addToBasket = (product: IProductCard) => {
    setItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <BasketContext.Provider value={{
      items,
      addToBasket,
      updateQuantity,
      removeItem,
      totalItems,
      totalPrice
    }}>
      {children}
    </BasketContext.Provider>
  );
};