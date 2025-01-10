import ReactStars from 'react-rating-stars-component';

interface RatingProps {
  rating: { rate: number; count: number };
  miniRating: boolean;
}

const Rating: React.FC<RatingProps> = ({ rating, miniRating }) => {
  return (
    <div>
      <ReactStars
        count={5}
        value={rating.rate}
        edit={false}
        size={24}
        activeColor="#ffd700"
        isHalf={true}
      />
      {miniRating && (
        <>
          <span>{rating.rate.toFixed(1)} / 5</span>
          <span>({rating.count} reviews)</span>
        </>
      )}
    </div>
  );
};

export default Rating;
