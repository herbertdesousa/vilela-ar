import React from 'react';

import classNames from 'classnames';
import style from './Grid.module.css';

interface GridProps {
  className?: string;
}

const Grid: React.FC<GridProps> = ({ className, children }) => {
  const rootClassName = classNames(style.root, className);

  return <div className={rootClassName}>{children}</div>;
};

export default Grid;
