import styles from './CreateProduct.module.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../features/products/productsSlice';
import { useNavigate } from 'react-router-dom';

interface ProductFormInputs {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const CreateProduct: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormInputs>({
    defaultValues: {
      title: '',
      price: 0,
      description: '',
      category: '',
      image: '',
    },
  });

  console.log(errors);

  const handleLogoClick = () => {
    navigate('/'); // Переход на главную страницу
  };

  const onSubmit: SubmitHandler<ProductFormInputs> = (data) => {
    const newProduct = {
      id: Date.now(),
      ...data,
      price: Number(data.price),
      rating: {
        rate: 0,
        count: 0,
      },
      isLiked: false,
    };
    console.log(newProduct);
    dispatch(addProduct(newProduct));
    alert('Product added successfully!');
    reset();
    handleLogoClick();
  };

  return (
    <div className={styles.createProductContainer}>
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          className={styles.inputCreate}
          label="Title"
          {...register('title', { required: 'Title is required' })}
          placeholder="Product title"
          error={errors.title?.message}
        />

        <Input
          className={styles.inputCreate}
          label="Price"
          type="number"
          step="0.01"
          {...register('price', {
            required: 'Price is required',
            min: { value: 1, message: 'Price must be at least $1' },
          })}
          placeholder="Product price"
          error={errors.price?.message}
        />

        <Input
          className={styles.inputCreate}
          label="Description"
          type="textarea" // Поддержка textarea в компоненте Input
          {...register('description', { required: 'Description is required' })}
          placeholder="Product description"
          error={errors.description?.message}
        />

        <Input
          className={styles.inputCreate}
          label="Category"
          {...register('category', { required: 'Category is required' })}
          placeholder="Product category"
          error={errors.category?.message}
        />

        <Input
          className={styles.inputCreate}
          label="Image URL"
          {...register('image', { required: 'Image URL is required' })}
          placeholder="Product image URL"
          error={errors.image?.message}
        />

        <Button type="submit">Add Product</Button>
      </form>
    </div>
  );
};

export default CreateProduct;
