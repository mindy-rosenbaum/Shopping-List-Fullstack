import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ShoppingList } from './pages/ShoppingList';
import { Checkout } from './pages/Checkout';

function App() {
  return (
    <div style={{ direction: 'rtl' }}>
      <Routes>
        <Route path="/" element={<ShoppingList />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Toaster position="top-center" />
    </div>
  );
}

export default App;