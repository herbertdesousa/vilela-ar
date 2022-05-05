import React, { useRef } from 'react';

import { MdKeyboardArrowDown } from 'react-icons/md';

import { IDropdownRef } from '@/components/Dropdown';
import { Button, Dropdown, Nav } from '@/components';
import { SideMenu, SaveForm } from '@/modules/Finance';

const Finance: React.FC = () => {
  return (
    <div className="flex max-h-screen">
      <Nav />

      <div className="flex">
        <SideMenu />
        <SaveForm />
      </div>
    </div>
  );
};

export default Finance;
