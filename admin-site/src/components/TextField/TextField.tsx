import React, { useMemo, useState } from 'react';

import { useField } from 'formik';

import classNames from 'classnames';
import { MdClose, MdError } from 'react-icons/md';

import style from './TextField.module.css';

interface ITextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  type?: 'input' | 'textarea';
  name: string;
  isRequired?: boolean;
  label: string;
  containerClassName?: string;
}

const TextField: React.FC<ITextFieldProps> = ({
  type = 'input',
  name,
  isRequired,
  label,
  containerClassName,
  ...props
}) => {
  const [fieldProps, meta, helpers] = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [text, setText] = useState('');

  const isErrored = useMemo(
    (): boolean => meta.touched && !!meta.error,
    [meta.error, meta.touched],
  );

  const textFieldClassName = classNames(style.label, style['text-field'], {
    [style['text-field-textarea']]: type === 'textarea',
    [style['text-field-focus']]: isFocused,
    [style['text-field-error']]: isErrored,
    [style['text-field-filled']]: text && !isFocused,
  });

  return (
    <div className={containerClassName}>
      <div className="flex items-center justify-between">
        <label htmlFor={name} className="font-medium text-accent-6">
          {label}
          {isRequired && <span className="text-red ml-1">*</span>}
        </label>

        {type === 'textarea' && (
          <button
            type="button"
            className="flex items-center text-xs text-accent-3 hover:text-accent-4 transition"
            onClick={() => {
              setText('');
              helpers.setValue('');
            }}
          >
            <MdClose size={12} />
            &nbsp;Limpar Campo
          </button>
        )}
      </div>

      <div
        className="w-full mt-2"
        style={{ height: type === 'textarea' ? 120 : 40 }}
      >
        {type === 'input' && (
          <input
            type="text"
            id={name}
            className={textFieldClassName}
            onFocus={e => {
              setIsFocused(true);
              if (props.onFocus) props.onFocus(e);
            }}
            onBlur={e => {
              setIsFocused(false);
              if (props.onBlur) props.onBlur(e);
            }}
            onChange={e => {
              setText(e.target.value);
              fieldProps.onChange(name)(e);
              if (props.onChange) props.onChange(e);
            }}
            value={text}
            {...props}
          />
        )}
        {type === 'textarea' && (
          <textarea
            id={name}
            className={textFieldClassName}
            onFocus={e => {
              setIsFocused(true);
              if (props.onFocus) props.onFocus(e);
            }}
            onBlur={e => {
              setIsFocused(false);
              if (props.onBlur) props.onBlur(e);
            }}
            onChange={e => {
              setText(e.target.value);
              fieldProps.onChange(name)(e);
              if (props.onChange) props.onChange(e);
            }}
            value={text}
            {...props}
          />
        )}
      </div>

      {isErrored && (
        <span className="flex items-center text-accent-6 text-xs mt-1 ml-2">
          <MdError className="text-red mr-1" />
          {meta.error}
        </span>
      )}
    </div>
  );
};

export default TextField;
