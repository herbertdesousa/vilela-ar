import React, { useMemo, useState } from 'react';

import { IconType } from 'react-icons';
import { useField } from 'formik';

import classNames from 'classnames';

import style from './TextField.module.css';

interface ITextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  icon?: IconType;
  label: string;
  right?: {
    onClick?(): void;
    icon: IconType;
  };
  containerClassName?: string;
}

const TextField: React.FC<ITextFieldProps> = ({
  name,
  icon: Icon,
  label,
  right,
  containerClassName,
  ...props
}) => {
  const { className, onFocus, onBlur, onChange, onClick, onKeyDown, ...rest } =
    props;

  const [fieldProps, meta, helpers] = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');

  const isErrored = useMemo(
    (): boolean => meta.touched && !!meta.error,
    [meta.error, meta.touched],
  );

  const rootClassName = classNames(
    style.root,
    {
      [style['root-focus']]: isFocused,
      [style['root-error']]: isErrored,
    },
    className,
  );
  const labelClassName = classNames(style.label, {
    [style['label-active']]: isFocused || !!text,
    [style['label-error']]: isErrored,
  });
  const iconClassName = classNames(style.icon, {
    [style['icon-active']]: isFocused || !!text,
    [style['icon-error']]: isErrored,
  });

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKeyDown}
      className={containerClassName}
    >
      <div className={rootClassName}>
        {Icon && <Icon size={24} className={iconClassName} />}
        <div className="relative flex flex-1">
          <label htmlFor={name} className={labelClassName}>
            {label}
          </label>
          <input
            type="text"
            name={name}
            id={name}
            className={style.textfield}
            onFocus={e => {
              setIsFocused(true);
              if (onFocus) onFocus(e);
            }}
            onBlur={e => {
              setIsFocused(false);
              fieldProps.onBlur(name)(e);
              if (onBlur) onBlur(e);
            }}
            onChange={e => {
              setText(e.target.value);
              fieldProps.onChange(name)(e);
              if (onChange) onChange(e);
            }}
            value={text}
            {...rest}
          />
        </div>

        {right && (
          <right.icon
            size={24}
            onClick={right.onClick}
            className={style['right-icon']}
          />
        )}
      </div>
      {isErrored && <span className={style.error}>{`* ${meta.error}`}</span>}
    </div>
  );
};

export default TextField;
