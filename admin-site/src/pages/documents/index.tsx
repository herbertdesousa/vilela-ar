import React from 'react';

import { Nav } from '@/components';

import { DocumentListSideMenu } from '@/modules/Document/DocumentList';

const Finance: React.FC = () => {
  return (
    <>
      <div />

      <div className="flex max-h-screen">
        <Nav />

        <div className="flex min-h-full">
          <DocumentListSideMenu />
        </div>
      </div>
    </>
  );
};

export default Finance;
