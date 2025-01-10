export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  isLiked: boolean;
  rating: {
    rate: number;
    count: number;
  };
}
