import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { Product } from './types';
import { fetchProducts } from '../../api/productsApi';
import { RootState } from '../../store';

// Тип состояния
interface ProductsState {
  items: Product[];
  favorites: string[]; // Список ID избранных продуктов
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: JSON.parse(localStorage.getItem('products') || '[]'),
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  loading: false,
  error: null,
};

// Асинхронное действие для загрузки продуктов
export const loadProducts = createAsyncThunk<Product[], void, { state: RootState }>(
  'products/loadProducts',
  async () => {
    return await fetchProducts();
  },
);

// Асинхронное действие для обновления продукта (можно сделать синхронным, если нет API)
export const updateProductAsync = createAsyncThunk<Product, Product>(
  'products/updateProductAsync',
  async (product) => {
    // Здесь можно сделать API-запрос для обновления продукта, если необходимо
    return product;
  },
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
      localStorage.setItem('products', JSON.stringify(state.items));
    },

    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const product = state.items.find((product) => product.id === id);

      if (product) {
        product.isLiked = !product.isLiked;

        if (product.isLiked) {
          if (!state.favorites.includes(id.toString())) {
            state.favorites.push(id.toString());
          }
        } else {
          state.favorites = state.favorites.filter((productId) => productId !== id.toString());
        }
      }
      localStorage.setItem('products', JSON.stringify(state.items));
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },

    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.items.findIndex((product) => product.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        localStorage.setItem('products', JSON.stringify(state.items));
      }
    },

    removeProduct: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((product) => product.id !== action.payload);
      localStorage.setItem('products', JSON.stringify(state.items));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;

        // Проверяем, есть ли данные в localStorage
        const storedProducts = JSON.parse(localStorage.getItem('products') || '[]');

        if (storedProducts.length > 0) {
          state.items = storedProducts; // Используем сохранённые данные
        } else {
          const loadedProducts = action.payload.map((product) => ({
            ...product,
            isLiked: false,
          }));

          // Сохраняем данные в localStorage
          localStorage.setItem('products', JSON.stringify(loadedProducts));
          state.items = loadedProducts;
        }
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load products';
      })
      .addCase(updateProductAsync.fulfilled, (state, action: PayloadAction<Product>) => {
        const index = state.items.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
          localStorage.setItem('products', JSON.stringify(state.items));
        }
      });
  },
});

export const { addProduct, toggleFavorite, removeProduct, updateProduct } = productsSlice.actions;
export default productsSlice.reducer;
