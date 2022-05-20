import React from 'react';

import {
  DocumentEditorNav,
  DocumentEditorPreviewer,
} from '@/modules/Document/DocumentEditor';
import { DocumentEditorSideMenuGeneral } from '@/modules/Document/DocumentEditor/DocumentEditorSideMenu';

const Editor: React.FC = () => {
  return (
    <>
      <DocumentEditorNav />

      <div className="flex" style={{ height: 'calc(100vh - 96px)' }}>
        <DocumentEditorPreviewer />

        <DocumentEditorSideMenuGeneral />
      </div>
    </>
  );
};

export default Editor;
