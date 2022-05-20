import React from 'react';

import {
  DocumentEditorNav,
  DocumentEditorPreviewer,
} from '@/modules/Document/DocumentEditor';
import { DocumentEditorSideMenuBlock } from '@/modules/Document/DocumentEditor/DocumentEditorSideMenu';

const EditorBlock: React.FC = () => {
  return (
    <>
      <DocumentEditorNav />

      <div className="flex" style={{ height: 'calc(100vh - 96px)' }}>
        <DocumentEditorPreviewer />

        <DocumentEditorSideMenuBlock />
      </div>
    </>
  );
};

export default EditorBlock;
