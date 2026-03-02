import React from 'react';
import { BasketItem } from '../../../types/Basket.type';


interface BasketProps {
  isOpen: boolean;
  onClose: () => void;
  items: BasketItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

const Basket: React.FC<BasketProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  return (
    <div className="basket-overlay" onClick={onClose}>
      <div className="basket-modal" onClick={(e) => e.stopPropagation()}>
        <div className="basket-header">
          <h2>Корзина</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="basket-items">
          {items.length === 0 ? (
            <p className="empty-basket">Корзина пуста</p>
          ) : (
            items.map((item) => (
              <div key={item.id} className="basket-item">
                <div className="item-info">
                  {item.image && <img src={item.image}  />}
                  <div>
                    <h4>{item.name}</h4>
                    <p>{item.price} ₽</p>
                  </div>
                </div>
                
                <div className="item-controls">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                  />
                  <button onClick={() => onRemoveItem(item.id)}>Удалить</button>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="basket-footer">
          <div className="total">Итого: {totalPrice} ₽</div>
          <button className="checkout-btn" disabled={items.length === 0}>
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Basket;