// В файле Basket.tsx импортируйте локальный интерфейс
export interface BasketItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface BasketProps {
  isOpen: boolean;
  onClose: () => void;
  items: BasketItem[]; // ✅ Используем локальный интерфейс
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}
