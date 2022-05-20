import React from 'react';

import {
  DocumentEditorNav,
  DocumentEditorPreviewer,
} from '@/modules/Document/DocumentEditor';
import { DocumentEditorSideMenuHeader } from '@/modules/Document/DocumentEditor/DocumentEditorSideMenu';

const EditorHeader: React.FC = () => {
  return (
    <>
      <DocumentEditorNav />

      <div className="flex" style={{ height: 'calc(100vh - 96px)' }}>
        <DocumentEditorPreviewer />

        <DocumentEditorSideMenuHeader />
      </div>
    </>
  );
};

export default EditorHeader;
