import styles from './Header.module.scss';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/'); // Переход на главную страницу
  };

  return (
    <div className={styles.headerContainer}>
      <h1 onClick={handleLogoClick}>Product Alfa</h1>
    </div>
  );
};

export default Header;
