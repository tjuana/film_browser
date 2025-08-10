import type { ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';
import './Button.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
}

export const Button = ({
  variant = 'primary',
  size = 'medium',
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx('btn', `btn--${variant}`, `btn--${size}`, className)}
      {...props}
    >
      {children}
    </button>
  );
};
