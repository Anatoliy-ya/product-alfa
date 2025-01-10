import { useEffect, useState } from 'react';
import styles from './ProductsList.module.scss';
import Card from '../../components/Card/Card';
import Pagination from '../../components/Pagination/Pagination';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { loadProducts, removeProduct } from '../../features/products/productsSlice';
import { RootState, AppDispatch } from '../../store/index';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

interface ProductsListProps {
  handleIsLiked: (id: number) => void;
}

const ProductsList: React.FC<ProductsListProps> = ({ handleIsLiked }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items, favorites } = useSelector((state: RootState) => state.products);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [productIsLiked, setProductIsLiked] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(loadProducts());
    console.log(items);
  }, [dispatch]);

  // Сброс текущей страницы при переключении между "все" и "избранные"
  useEffect(() => {
    setCurrentPage(1);
  }, [productIsLiked, searchQuery]);

  // Фильтруем товары
  // Фильтруем товары
  const filteredItems = items
    .filter((product) => (productIsLiked ? favorites.includes(product.id.toString()) : true))
    .filter((product) => product.title.toLowerCase().includes(searchQuery.toLowerCase()));

  // Пагинация
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handleRemove = (id: number) => {
    dispatch(removeProduct(id));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.productsListContainer}>
      <h1>Products</h1>
      <Button className={styles.showLikedButton} onClick={() => setProductIsLiked(!productIsLiked)}>
        {productIsLiked ? 'Показать все' : 'Показать избранные'}
      </Button>
      <Button className={styles.showCreatedButton} onClick={() => navigate('/create-product')}>
        Создать продукт
      </Button>
      <Input
        type="text"
        placeholder="Поиск продуктов..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput} // Стили для поля ввода
      />
      <div className={styles.productsList}>
        {paginatedItems.map((product) => (
          <Card
            key={product.id}
            product={product}
            handleIsLiked={handleIsLiked}
            handleRemove={handleRemove}
          />
        ))}
      </div>
      <div className={styles.paginationContainer}>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductsList;
