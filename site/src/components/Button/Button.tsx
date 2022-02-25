import React, { ButtonHTMLAttributes } from 'react';

import classNames from 'classnames';

import style from './Button.module.css';

export interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'primary' | 'delete' | 'alert';
  size?: 'normal' | 'sm';
  loading?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  children,
  variant = 'primary',
  size = 'normal',
  loading = false,
  ...props
}) => {
  const { className, onClick, ...rest } = props;

  const rootClassName = classNames(
    style.root,
    {
      [style['variant-outline']]: variant === 'outline',
      [style['variant-primary']]: variant === 'primary',
      [style['variant-delete']]: variant === 'delete',
      [style['variant-alert']]: variant === 'alert',
      [style['size-normal']]: size === 'normal',
      [style['size-sm']]: size === 'sm',
    },
    className,
  );

  return (
    <button
      type="button"
      className={rootClassName}
      onClick={e => {
        if (!loading && onClick) onClick(e);
      }}
      {...rest}
    >
      {!loading ? children : '...'}
    </button>
  );
};

export default Button;
