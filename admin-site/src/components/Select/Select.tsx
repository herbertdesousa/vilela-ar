import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

import { useDetectClickOutside } from 'react-detect-click-outside';
import classNames from 'classnames';

import { MdKeyboardArrowDown } from 'react-icons/md';

import style from './Select.module.css';
import Button from '../Button';
import Dropdown, { IDropdownDataItem, IDropdownRef } from '../Dropdown';

interface IItem extends IDropdownDataItem {
  default?: boolean;
}

interface IProps {
  ref: React.MutableRefObject<IDropdownRef>;
  className?: string;
  data: IItem[];
  onSelect?(value: string): void;
}

const Select: React.FC<IProps> = ({
  ref,
  className,
  children,
  data,
  onSelect,
}) => {
  const [selectedItem, setSelectedItem] = useState<IDropdownDataItem>();

  // fazer para versão #document#

  return (
    <div className="relative">
      <Button
        onClick={() => ref.current?.toggle()}
        variant="outline"
        size="sm"
        rightIcon={MdKeyboardArrowDown}
      >
        Agosto 2022
      </Button>

      <Dropdown
        ref={ref}
        className="absolute w-full"
        data={data}
        onSelect={onSelect}
      />
    </div>
  );
};

export default Select;
