import styles from './Card.module.scss';
import Rating from '../Rating/Rating';
import Button from '../UI/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../features/products/types';

interface CardProps {
  product: Product;
  handleIsLiked: (id: number) => void;
  handleRemove: (id: number) => void;
}
const Card: React.FC<CardProps> = ({ product, handleIsLiked, handleRemove }) => {
  const navigate = useNavigate();

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Предотвращаем срабатывание клика, если выбрана кнопки
    if ((e.target as HTMLElement).tagName === 'BUTTON') return;
    navigate(`/products/${product.id}`);
  };

  const handleEdit = () => {
    navigate(`/edit-product/${product.id}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <Button
        className={styles.likeButton}
        onClick={() => handleIsLiked(product.id)}
        data-tooltip={product.isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}>
        {product.isLiked ? '💖' : '🤍'}
      </Button>
      <Button
        className={styles.removeButton}
        onClick={() => handleRemove(product.id)}
        data-tooltip="Удалить карточку">
        🗑️
      </Button>
      <Button className={styles.editButton} onClick={handleEdit} data-tooltip="Редактировать">
        ✏️
      </Button>
      <div className={styles.rating}>
        <Rating rating={product.rating} miniRating={false} />
      </div>
    </div>
  );
};

export default Card;
