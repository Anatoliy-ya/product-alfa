import styles from './Pagination.module.scss';
import Button from '../UI/Button/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className={styles.pagination}>
      <Button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </Button>
      {pages.map((page) => (
        <Button
          key={page}
          className={currentPage === page ? styles.active : ''}
          onClick={() => onPageChange(page)}>
          {page}
        </Button>
      ))}
      <Button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
        Next
      </Button>
    </div>
  );
};

export default Pagination;
