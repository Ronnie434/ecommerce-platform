import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  productId: string;
  name: string;
  priceId: string;
  price: number;
  currency: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string, priceId: string) => void;
  clearCart: () => void;
  updateQuantity: (productId: string, priceId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) setItems(JSON.parse(stored));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addToCart = (item: CartItem) => {
    setItems(prev => {
      const existing = prev.find(
        i => i.productId === item.productId && i.priceId === item.priceId
      );
      if (existing) {
        return prev.map(i =>
          i.productId === item.productId && i.priceId === item.priceId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  };

  const removeFromCart = (productId: string, priceId: string) => {
    setItems(prev => prev.filter(i => !(i.productId === productId && i.priceId === priceId)));
  };

  const clearCart = () => setItems([]);

  const updateQuantity = (productId: string, priceId: string, quantity: number) => {
    setItems(prev => prev.map(i =>
      i.productId === productId && i.priceId === priceId
        ? { ...i, quantity }
        : i
    ));
  };

  // Always render children; let consumers handle hydration if needed
  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}; 