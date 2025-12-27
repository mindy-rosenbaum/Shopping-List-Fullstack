import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, Button, TextField, Paper, CircularProgress, Box } from '@mui/material';
import { type Category, type Product } from '../../types';
import styles from './ProductSelector.module.css';

interface ProductSelectorProps {
  categories: Category[];
  products: Product[];
  selectedCategory: number | null;
  selectedProduct: Product | null;
  quantity: number;
  onCategoryChange: (categoryId: number) => void;
  onProductChange: (productId: number) => void;
  onQuantityChange: (quantity: number) => void;
  onAddToCart: () => void;
  canAddToCart: boolean;
  loadingProducts?: boolean;
  addingToCart?: boolean;
}

const ProductSelector: React.FC<ProductSelectorProps> = ({
  categories,
  products,
  selectedCategory,
  selectedProduct,
  quantity,
  onCategoryChange,
  onProductChange,
  onQuantityChange,
  onAddToCart,
  canAddToCart,
  loadingProducts = false,
  addingToCart = false
}) => {
  return (
    <Paper className={styles.productSelector}>
      <FormControl className={styles.formControl}>
        <InputLabel>קטגוריה</InputLabel>
        <Select
          value={selectedCategory || ''}
          onChange={(e) => onCategoryChange(Number(e.target.value))}
          variant="outlined">
          <MenuItem value="">הכל</MenuItem>
          {categories.map(c => <MenuItem key={c.id} value={c.id}>{c.name}</MenuItem>)}
        </Select>
      </FormControl>
      <FormControl className={styles.formControl}>
        <InputLabel>מוצר</InputLabel>
        <Select
          value={selectedProduct?.id || ''}
          onChange={(e) => onProductChange(Number(e.target.value))}
          variant="outlined"
          disabled={loadingProducts || !selectedCategory}
        >
          {loadingProducts ? (
            <MenuItem disabled>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={16} />
                טוען מוצרים...
              </Box>
            </MenuItem>
          ) : (
            products.map(p => <MenuItem key={p.id} value={p.id}>{p.name}</MenuItem>)
          )}
        </Select>
      </FormControl>
      <TextField
        type="number"
        label="כמות"
        value={quantity}
        onChange={(e) => onQuantityChange(Number(e.target.value))}
        className={styles.quantityField}
        inputProps={{ min: 1 }}
        variant="outlined"
        disabled={addingToCart}
      />   
      <Button 
        variant="contained" 
        onClick={onAddToCart} 
        disabled={!canAddToCart}
        className={styles.addButton}
        startIcon={addingToCart ? <CircularProgress size={16} /> : null}>
        {addingToCart ? 'מוסיף...' : 'הוסף לסל'}
      </Button>
    </Paper>
  );
};

export default ProductSelector;