import React from 'react';

import classNames from 'classnames';
import styleTailwind from './Grid.module.css';

interface GridProps {
  className?: string;
  style?: React.CSSProperties;
}

const Grid: React.FC<GridProps> = ({ className, children, style }) => {
  const rootClassName = classNames(styleTailwind.root, className);

  return (
    <div className={rootClassName} style={style}>
      {children}
    </div>
  );
};

export default Grid;
