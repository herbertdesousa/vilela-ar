import React, { ButtonHTMLAttributes } from 'react';

import { FaWhatsapp } from 'react-icons/fa';
import classNames from 'classnames';

import style from './ContactButton.module.css';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'light' | 'dark';
  size?: 'normal' | 'sm';
}

const Button: React.FC<IButtonProps> = ({
  children,
  variant = 'dark',
  size = 'normal',
  ...props
}) => {
  const { className, ...rest } = props;

  const rootClassName = classNames(
    style.root,
    {
      [style['variant-dark']]: variant === 'dark',
      [style['variant-light']]: variant === 'light',
      [style['size-normal']]: size === 'normal',
      [style['size-sm']]: size === 'sm',
    },
    className,
  );

  return (
    <button type="button" className={rootClassName} {...rest}>
      <FaWhatsapp size={20} className="mr-4" />
      {children}
    </button>
  );
};

export default Button;
