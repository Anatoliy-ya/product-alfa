import styles from './Button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  'data-tooltip'?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled,
  type = 'button',
  className,
  'data-tooltip': tooltip,
}) => {
  const classButton = `${styles.button} ${className} `;
  console.log(classButton);
  return (
    <button
      className={classButton}
      onClick={onClick}
      disabled={disabled}
      type={type}
      data-tooltip={tooltip}>
      {children}
    </button>
  );
};

export default Button;
