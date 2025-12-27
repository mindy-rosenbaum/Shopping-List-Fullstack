import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from '../store/cartSlice';
import { type CartItem } from '../types';
import { showSuccess, showWarning } from '../utils/notifications';

export const useCart = () => {
  const dispatch = useDispatch();

  const handleAddToCart = useCallback((product: any, quantity: number, categoryName: string) => {
    if (!product) return;

    const cartItem: CartItem = {
      productId: product.id,
      productName: product.name,
      categoryName: categoryName,
      pricePerUnit: product.price,
      quantity: quantity,
      totalPrice: product.price * quantity
    };
    dispatch(addToCart(cartItem));
    showSuccess(`${product.name} נוסף לעגלה!`);
  }, [dispatch]);

  const handleRemoveFromCart = useCallback((productId: number, productName: string) => {
    dispatch(removeFromCart(productId));
    showSuccess(`${productName} הוסר מהעגלה`);
  }, [dispatch]);

  const handleClearCart = useCallback((hasItems: boolean) => {
    if (hasItems) {
      dispatch(clearCart());
      showSuccess('העגלה נוקתה בהצלחה!');
    }
  }, [dispatch]);

  const handleCheckoutWarning = useCallback(() => {
    showWarning('יש להוסיף מוצרים לעגלה קודם!');
  }, []);

  return {
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    clearCart: handleClearCart,
    showCheckoutWarning: handleCheckoutWarning
  };
};