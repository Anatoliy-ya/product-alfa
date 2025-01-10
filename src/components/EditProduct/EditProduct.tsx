import React, { useEffect } from 'react';
import styles from './EditProduct.module.scss';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { updateProduct } from '../../features/products/productsSlice';
import { useNavigate, useParams } from 'react-router-dom';

interface ProductFormInputs {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const EditProduct: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получаем ID продукта из параметров маршрута
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const product = useSelector((state: RootState) =>
    state.products.items.find((item) => item.id === Number(id)),
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormInputs>({
    defaultValues: product
      ? {
          title: product.title,
          price: product.price,
          description: product.description,
          category: product.category,
          image: product.image,
        }
      : {},
  });

  useEffect(() => {
    if (product) {
      reset({
        title: product.title,
        price: product.price,
        description: product.description,
        category: product.category,
        image: product.image,
      });
    }
  }, [product, reset]);

  const onSubmit: SubmitHandler<ProductFormInputs> = (data) => {
    if (product) {
      const updatedProduct = {
        ...product,
        ...data,
        price: Number(data.price),
      };
      dispatch(updateProduct(updatedProduct));
      alert('Product updated successfully!');
      navigate('/'); // Перенаправляем на главную страницу или другую нужную
    }
  };

  if (!product) {
    return <p className={styles.error}>Product not found.</p>;
  }

  return (
    <div className={styles.editProductContainer}>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label="Title"
          {...register('title', { required: 'Title is required' })}
          placeholder="Product title"
          error={errors.title?.message}
        />

        <Input
          label="Price"
          type="number"
          step="0.01"
          {...register('price', {
            required: 'Price is required',
            min: { value: 0.01, message: 'Price must be at least $0.01' },
          })}
          placeholder="Product price"
          error={errors.price?.message}
        />

        <Input
          label="Description"
          type="textarea"
          {...register('description', { required: 'Description is required' })}
          placeholder="Product description"
          error={errors.description?.message}
        />

        <Input
          label="Category"
          {...register('category', { required: 'Category is required' })}
          placeholder="Product category"
          error={errors.category?.message}
        />

        <Input
          label="Image URL"
          {...register('image', { required: 'Image URL is required' })}
          placeholder="Product image URL"
          error={errors.image?.message}
        />

        <Button type="submit">Update Product</Button>
      </form>
    </div>
  );
};

export default EditProduct;
