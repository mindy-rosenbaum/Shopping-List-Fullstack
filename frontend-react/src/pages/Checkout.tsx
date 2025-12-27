import React, { useState } from 'react';
import { Button, Box, Typography, Paper, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { useFormValidation } from '../hooks/useFormValidation';
import { createOrder } from '../api/ordersApi';
import { clearCart } from '../store/cartSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showSuccess, showError } from '../utils/notifications';
import FormField from '../components/FormField/FormField';
import { type Order } from '../types';
import { type RootState } from '../store';

export const Checkout = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = useSelector((state: RootState) => state.cart.totalAmount);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formValidation = useFormValidation({
    firstName: '',
    lastName: '',
    address: '',
    email: ''
  });

  const handleSubmit = async () => {
    if (formValidation.validateForm()) {
      const order: Order = { 
        firstName: formValidation.formData.firstName,
        lastName: formValidation.formData.lastName,
        email: formValidation.formData.email,
        address: formValidation.formData.address,
        items: cartItems, 
        totalAmount: total, 
        date: new Date() 
      };
      
      setIsSubmitting(true);
      try {
        const response = await createOrder(order);
        if (response.data.success) {
          showSuccess('🎉 הזמנה בוצעה בהצלחה!');
          dispatch(clearCart());
          formValidation.resetForm();
          setTimeout(() => {
            navigate('/');
          }, 2000);
        } else {
          showError(`❌ שגיאה בשליחת ההזמנה: ${response.data.error}`);
        }
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || "❌ שגיאה בשליחת ההזמנה";
        showError(errorMessage);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const hasItems = cartItems.length > 0;

  return (
    <Box sx={{ p: 4, maxWidth: 600, margin: 'auto', direction: 'rtl' }}>
      <Typography variant="h4" gutterBottom>סיכום הזמנה</Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">פרטי משלוח</Typography>
        <Box sx={{ display: 'grid', gap: 2, mt: 2 }}>
          <FormField
            label="שם פרטי"
            name="firstName"
            value={formValidation.formData.firstName}
            error={formValidation.errors.firstName}
            touched={formValidation.touched.firstName}
            onChange={formValidation.handleFieldChange}
            onBlur={formValidation.handleFieldBlur}
          />
          <FormField
            label="שם משפחה"
            name="lastName"
            value={formValidation.formData.lastName}
            error={formValidation.errors.lastName}
            touched={formValidation.touched.lastName}
            onChange={formValidation.handleFieldChange}
            onBlur={formValidation.handleFieldBlur}
          />
          <FormField
            label="כתובת מלאה"
            name="address"
            value={formValidation.formData.address}
            error={formValidation.errors.address}
            touched={formValidation.touched.address}
            onChange={formValidation.handleFieldChange}
            onBlur={formValidation.handleFieldBlur}
          />
          <FormField
            label="מייל"
            name="email"
            type="email"
            value={formValidation.formData.email}
            error={formValidation.errors.email}
            touched={formValidation.touched.email}
            onChange={formValidation.handleFieldChange}
            onBlur={formValidation.handleFieldBlur}
          />
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6">המוצרים שלך</Typography>
        <List>
          {cartItems.map(item => (
            <ListItem key={`${item.productId}-${item.categoryName}`}>
              <ListItemText 
                primary={item.productName} 
                secondary={`כמות: ${item.quantity} | מחיר: ₪${item.totalPrice}`} 
              />
            </ListItem>
          ))}
        </List>
        <Typography variant="h5" sx={{ mt: 2 }}>סה"כ: ₪{total}</Typography>
        <Button 
          variant="contained" 
          color="success" 
          fullWidth 
          sx={{ mt: 3 }} 
          onClick={handleSubmit}
          disabled={!hasItems || !formValidation.isFormValid || isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={16} color="inherit" /> : null}
        >
          {isSubmitting ? 'מעבד הזמנה...' : 'אשר הזמנה ✅'}
        </Button>
        {!formValidation.isFormValid && Object.keys(formValidation.touched).length > 0 && (
          <Typography 
            variant="body2" 
            color="error" 
            sx={{ mt: 1, textAlign: 'center' }}>
            נא למלא את כל השדות בצורה תקינה
          </Typography>
        )}
      </Paper>
    </Box>
  );
};