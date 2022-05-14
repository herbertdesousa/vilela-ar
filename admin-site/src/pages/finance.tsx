import React, { useState } from 'react';

import { Nav } from '@/components';
import { SideMenu, SaveForm } from '@/modules/Finance';

import { IFinanceItem } from '@/types/IFinanceItem';

const Finance: React.FC = () => {
  const [financeDetails, setFinanceDetails] = useState<
    IFinanceItem | undefined
  >();
  const [isSaveFormShowing, setIsSaveFormShowing] = useState(false);

  return (
    <>
      <div />

      <div className="flex max-h-screen">
        <Nav />

        <div className="flex">
          <SideMenu
            onClickAddFinance={() => {
              setIsSaveFormShowing(true);
              setFinanceDetails(undefined);
            }}
            onClickEditFinance={data => {
              setIsSaveFormShowing(true);
              setFinanceDetails(data);
            }}
            onCloseSaveForm={() => setIsSaveFormShowing(false)}
          />
          {isSaveFormShowing && (
            <SaveForm
              financeDetails={financeDetails}
              onCloseSaveForm={() => setIsSaveFormShowing(false)}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Finance;
