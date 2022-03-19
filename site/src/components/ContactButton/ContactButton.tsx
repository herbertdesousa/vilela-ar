import React, { AnchorHTMLAttributes } from 'react';

import { FaWhatsapp } from 'react-icons/fa';
import classNames from 'classnames';

import style from './ContactButton.module.css';

const PHONE = '5511998620875';
export interface IButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'light' | 'dark';
  size?: 'normal' | 'sm';
  messageToSend?: string;
}

const Button: React.FC<IButtonProps> = ({
  children,
  variant = 'dark',
  size = 'normal',
  messageToSend = '',
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
    <a
      type="button"
      className={rootClassName}
      rel="noreferrer"
      target="_blank"
      href={`https://api.whatsapp.com/send?phone=${PHONE}&text=${messageToSend}`}
      {...rest}
    >
      <FaWhatsapp size={20} className="mr-4" />
      {children}
    </a>
  );
};

export default Button;
