import React, { useState, useEffect, useCallback } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCategories } from '../api/categoriesApi';
import { fetchProducts } from '../api/productsApi';
import { useCart } from '../hooks/useShoppingList';
import  ProductSelector  from '../components/ProductSelector/ProductSelector';
import  CartSummary  from '../components/CartSummary/CartSummary';
import { type Category, type Product, type CartItem } from '../types';
import { type RootState } from '../store';

export const ShoppingList = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const loadProducts = useCallback(async (categoryId: number) => {
    setLoadingProducts(true);
    try {
      const productsResponse = await fetchProducts(categoryId);
      setProducts(productsResponse.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoadingProducts(false);
    }
  }, []);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setSelectedProduct(null);
    setQuantity(1);
    loadProducts(categoryId);
  };

  const handleProductChange = (productId: number) => {
    const product = products.find(p => p.id === productId);
    setSelectedProduct(product || null);
    setQuantity(1);
  };

  const handleAddToCart = async () => {
    if (selectedProduct && quantity > 0) {
      setAddingToCart(true);
      try {
        const categoryName = categories.find(c => c.id === selectedProduct.categoryId)?.name || 'כללי';
        addToCart(selectedProduct, quantity, categoryName);
        // Reset selections after adding
        setSelectedProduct(null);
        setQuantity(1);
      } catch (error) {
        console.error('Error adding to cart:', error);
      } finally {
        setAddingToCart(false);
      }
    }
  };

  const groupedCartItems = cartItems.reduce((acc, item) => {
    if (!acc[item.categoryName]) {
      acc[item.categoryName] = [];
    }
    acc[item.categoryName].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  useEffect(() => {
    const loadCategories = async () => {
      setLoadingCategories(true);
      try {
        const categoriesResponse = await fetchCategories();
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoadingCategories(false);
      }
    };
    loadCategories();
  }, []);

  const canAddToCart = selectedProduct && quantity > 0;
  const hasItemsInCart = cartItems.length > 0;

  return (
    <Box sx={{ p: 4, maxWidth: 800, margin: 'auto', direction: 'rtl' }}>
      <Typography variant="h4" gutterBottom>רשימת הקניות שלי</Typography>

      {loadingCategories ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ProductSelector
          categories={categories}
          products={products}
          selectedCategory={selectedCategory}
          selectedProduct={selectedProduct}
          quantity={quantity}
          onCategoryChange={handleCategoryChange}
          onProductChange={handleProductChange}
          onQuantityChange={setQuantity}
          onAddToCart={handleAddToCart}
          canAddToCart={canAddToCart && !addingToCart}
          loadingProducts={loadingProducts}
          addingToCart={addingToCart}
        />
      )}
      
      <CartSummary
        groupedCartItems={groupedCartItems}
        hasItemsInCart={hasItemsInCart}
        onCheckout={() => navigate('/checkout')}
      />
    </Box>
  );
};