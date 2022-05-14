import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from 'react';

import { useDetectClickOutside } from 'react-detect-click-outside';
import classNames from 'classnames';

import style from './Dropdown.module.css';

export interface IDropdownRef {
  open(): void;
  close(): void;
  toggle(): void;
}

export interface IDropdownDataItem {
  value: string;
  item: React.ReactNode;
}

interface IProps {
  className?: string;
  children?: React.ReactNode;
  data: IDropdownDataItem[];
  onSelect?(value: IDropdownDataItem): void;
}

const Dropdown: React.ForwardRefRenderFunction<IDropdownRef, IProps> = (
  { className, children, data, onSelect },
  ref,
) => {
  const [isOpened, setIsOpened] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const rootClassName = classNames(
    style.root,
    { [style['root-open']]: isOpened },
    { [style['root-close']]: !isOpened },
    className,
  );

  useImperativeHandle(ref, () => ({
    open() {
      openDropdown();
    },
    close() {
      closeDropdown();
    },
    toggle() {
      if (isOpened) closeDropdown();
      else openDropdown();
    },
  }));

  const closeDropdown = useCallback(() => {
    setIsOpened(false);
  }, []);
  const openDropdown = useCallback(() => {
    setIsVisible(true);
    setTimeout(() => setIsOpened(true), 50);
  }, []);
  const onClickOutsideRef = useDetectClickOutside({
    onTriggered: closeDropdown,
  });

  if (!isVisible) return <></>;
  return (
    <div
      ref={onClickOutsideRef}
      className={rootClassName}
      onTransitionEnd={() => setIsVisible(isOpened)}
    >
      <ul className="py-1 max-w-full">
        {data.map(item => (
          <li key={item.value}>
            <button
              type="button"
              onClick={() => {
                onSelect(item);
                closeDropdown();
              }}
              className="
                py-2 pl-2 font-medium hover:bg-accent-1 cursor-pointer w-full flex items-start
              "
            >
              {item.item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default forwardRef(Dropdown);
