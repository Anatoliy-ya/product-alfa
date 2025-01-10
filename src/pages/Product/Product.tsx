import styles from './Product.module.scss';
import Button from '../../components/UI/Button/Button';
import Rating from '../../components/Rating/Rating';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface ProductProps {
  handleIsLiked: (id: number) => void;
}

const Product: React.FC<ProductProps> = ({ handleIsLiked }) => {
  const { id } = useParams<{ id: string }>();

  const product = useSelector((state: RootState) =>
    state.products.items.find((item) => item.id === Number(id)),
  );

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className={styles.productContainer}>
      <img src={product.image} alt={product.title} />
      <div className={styles.productInfo}>
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <div className={styles.ratingAndPrice}>
          <p>Price: ${product.price}</p>
          <Rating rating={product.rating} miniRating={true} />
        </div>
        <div className={styles.buttonContainer}>
          <Button>Купить</Button>
          <Button onClick={() => handleIsLiked(product.id)}>
            {product.isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}{' '}
            {product.isLiked ? '💖' : '🤍'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
