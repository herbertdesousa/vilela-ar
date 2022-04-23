import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

import { MdAttachMoney, MdHome } from 'react-icons/md';

import style from './Nav.module.css';

const Nav: React.FC = () => {
  const { push, pathname } = useRouter();

  return (
    <div className={style.root}>
      <Image src="/logo.svg" height={40} width={40} />

      <ul className={style.pages}>
        <li className={pathname === '/' ? style['active-page'] : style.page}>
          <Link href="/">
            <MdHome size={20} />
          </Link>
        </li>
        <li
          className={
            pathname === '/finance' ? style['active-page'] : style.page
          }
        >
          <Link href="/finance">
            <MdAttachMoney size={20} />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Nav;
