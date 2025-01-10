import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import ProductsList from './pages/ProductsList/ProductsList';
import Product from './pages/Product/Product';
import CreateProduct from './pages/CreateProduct/CreateProduct';
import EditProduct from './components/EditProduct/EditProduct';
import { toggleFavorite } from './features/products/productsSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from './store';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const handleIsLiked = (id: number) => {
    console.log(id);
    dispatch(toggleFavorite(id));
  };
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<ProductsList handleIsLiked={handleIsLiked} />} />
          <Route path="/products/:id" element={<Product handleIsLiked={handleIsLiked} />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route path="/edit-product/:id" element={<EditProduct />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
