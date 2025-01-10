import React, { ChangeEvent, forwardRef } from 'react';
import styles from './Input.module.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  error?: string;
  type?: 'text' | 'number' | 'textarea'; // Поддержка textarea
  className?: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  value?: string | number;
  placeholder?: string;
}

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ label, error, onChange, type = 'text', ...props }, ref) => {
    const classInput = `${styles.inputGroup} ${props.className}`;
    return (
      <div className={classInput}>
        <label htmlFor={props.name}>{label}</label>
        {type === 'textarea' ? (
          <textarea
            onChange={onChange}
            id={props.name}
            ref={ref as React.Ref<HTMLTextAreaElement>}
            {...props}
          />
        ) : (
          <input
            onChange={onChange}
            id={props.name}
            type={type}
            ref={ref as React.Ref<HTMLInputElement>}
            {...props}
          />
        )}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
  },
);

export default Input;
