import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import classNames from 'classnames';

import { ContactButton, Grid } from '..';
import style from './Nav.module.css';

type Routes = 'home' | 'blog';

export interface INavProps {
  className?: string;
  active: Routes;
}

const Nav: React.FC<INavProps> = ({ className, active }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const rootClassName = classNames(style.root, className);

  const containerClassName = classNames(style.container, {
    [style.scrolled]: scrollPosition > 50,
  });

  const liClassName = (route: Routes): string => {
    return classNames(style.link, {
      [style.active]: active === route,
    });
  };

  return (
    <div className={rootClassName}>
      <Grid>
        <nav className={containerClassName}>
          <div className="flex">
            <div className="h-8 w-8 transform-gpu transition-all hover:rotate-45">
              <Image src="/logo.svg" width="32" height="32" className="z-10" />
            </div>

            <ul className="flex items-center ml-4 md:ml-12">
              <li className={liClassName('home')}>
                <Link href="/">HOME</Link>
              </li>
              {/* <li className={liClassName('blog')}>
                <Link href="/blog">BLOG</Link>
              </li> */}
            </ul>
          </div>

          <div className="block md:hidden">
            <ContactButton size="sm" style={{ padding: '8px 16px' }}>
              <span className="-ml-4" />
            </ContactButton>
          </div>
          <div className="hidden md:block">
            <ContactButton size="sm" style={{ padding: '8px 16px' }}>
              enviar mensagem
            </ContactButton>
          </div>
        </nav>
      </Grid>
    </div>
  );
};

export default Nav;
