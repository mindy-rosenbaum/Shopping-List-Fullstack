import React from 'react';
import { Box, Typography, Divider, Button, IconButton } from '@mui/material';
import { Delete as DeleteIcon, Clear as ClearIcon } from '@mui/icons-material';
import { useCart } from '../../hooks/useShoppingList';
import { type CartItem } from '../../types';
import styles from './CartSummary.module.css';

interface CartSummaryProps {
  groupedCartItems: Record<string, CartItem[]>;
  hasItemsInCart: boolean;
  onCheckout?: () => void;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  groupedCartItems,
  hasItemsInCart,
  onCheckout
}) => {
  const { removeFromCart, clearCart, showCheckoutWarning } = useCart();

  const handleCheckout = () => {
    if (!hasItemsInCart) {
      showCheckoutWarning();
      return;
    }
    onCheckout?.();
  };
  return (
    <div className={styles.cartSummary}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h5" className={styles.title}>העגלה שלי</Typography>
        {hasItemsInCart && (
          <Button
            variant="outlined"
            color="error"
            size="small"
            startIcon={<ClearIcon />}
            onClick={() => clearCart(hasItemsInCart)}
            sx={{ borderRadius: '20px' }}>
            נקה הכל
          </Button>
        )}
      </Box>
      <div className={styles.categoriesGrid}>
        {Object.keys(groupedCartItems).map(catName => (
          <Box key={catName} className={styles.categoryCard}>
            <Typography variant="h6" className={styles.categoryTitle}>{catName}</Typography>
            <div className={styles.productsList}>
              {groupedCartItems[catName].map((item: CartItem) => (
                <Box key={`${item.productId}-${item.categoryName}`} 
                     className={styles.productItem}
                     sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}>
                  <Typography>
                    {item.productName} - כמות: {item.quantity}
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={() => removeFromCart(item.productId, item.productName)}
                    sx={{ color: 'error.main' }}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </div>
          </Box>
        ))}
      </div>
      {onCheckout && (
        <Button
          variant="outlined"
          fullWidth
          onClick={handleCheckout}
          className={styles.checkoutButton}
          sx={{ 
            borderRadius: '25px',
            py: 1.5,
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
          המשך להזמנה
        </Button>
      )}
    </div>
  );
};
export default CartSummary;