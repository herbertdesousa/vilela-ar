import React from 'react';

import classNames from 'classnames';

import { IconType } from 'react-icons';

export interface IListItemProps {
  title: React.ReactNode | string;
  description?: React.ReactNode | string;
  rightIcon?: {
    icon: IconType;
    onClick?: () => void;
  };
  showBottomIndicator?: boolean;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

const ListItem: React.FC<IListItemProps> = ({
  title,
  onClick,
  description,
  rightIcon,
  isActive,
  showBottomIndicator,
  className,
}) => {
  return (
    <>
      <li className={classNames('w-full', className)}>
        <button
          type="button"
          onClick={onClick}
          className={`
          flex justify-between items-center px-6 py-0.5 h-14 hover:bg-accent-1 transition w-full
          ${isActive && 'bg-accent-1'}
        `}
        >
          <div>
            <strong className="text-accent-6 font-medium text-left">
              {title}
            </strong>
            {description && (
              <p className="text-accent-3 text-left">{description}</p>
            )}
          </div>

          {rightIcon && <rightIcon.icon size={20} className="text-accent-6" />}
        </button>
      </li>

      {showBottomIndicator && (
        <div
          style={{ width: 'calc(100% - 80px)', height: 1 }}
          className="ml-10 bg-accent-2 mt-2"
        />
      )}
    </>
  );
};

export default ListItem;
