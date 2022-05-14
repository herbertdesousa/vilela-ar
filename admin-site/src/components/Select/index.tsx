import React, { useRef } from 'react';

import classNames from 'classnames';

import { MdKeyboardArrowDown } from 'react-icons/md';

import { useField } from 'formik';
import Button from '../Button';
import Dropdown, { IDropdownRef, IDropdownDataItem } from '../Dropdown';

interface IItem {
  value: string;
  label?: string;
  isActive?: boolean;
}

interface IProps {
  className?: string;
  buttonClassName?: string;

  name: string;
  data: IItem[];
  label: string;
  onSelect?(value: IItem): void;
}

const Select: React.FC<IProps> = ({
  name,
  className,
  buttonClassName,
  label,
  data,
  onSelect,
}) => {
  const [fieldProps, meta, helpers] = useField(name);

  const dropdownRef = useRef<IDropdownRef>(null);

  return (
    <div className={classNames('relative', className)}>
      <Button
        onClick={() => dropdownRef.current.toggle()}
        variant="outline"
        className={buttonClassName}
        size="sm"
        rightIcon={MdKeyboardArrowDown}
      >
        {label}
      </Button>
      <Dropdown
        ref={dropdownRef}
        data={data.map(item => ({
          value: item.value,
          item: (
            <span className={item.isActive ? 'text-primary' : 'text-accent-6'}>
              {item.label || item.value}
            </span>
          ),
        }))}
        onSelect={item => {
          if (onSelect) onSelect(item);
          helpers.setValue(item.value);
        }}
      />
    </div>
  );
};

export default Select;
