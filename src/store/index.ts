import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '../features/products/productsSlice';
import { ProductsState } from '../features/products/types';

interface RootReducer {
  products: ProductsState;
}

const store = configureStore<RootReducer>({
  reducer: {
    products: productsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
