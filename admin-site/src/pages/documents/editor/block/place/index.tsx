import React from 'react';

import {
  DocumentEditorNav,
  DocumentEditorPreviewer,
} from '@/modules/Document/DocumentEditor';
import { DocumentEditorSideMenuBlockPlace } from '@/modules/Document/DocumentEditor/DocumentEditorSideMenu';

const EditorBlockPlace: React.FC = () => {
  return (
    <>
      <DocumentEditorNav />

      <div className="flex" style={{ height: 'calc(100vh - 96px)' }}>
        <DocumentEditorPreviewer />

        <DocumentEditorSideMenuBlockPlace />
      </div>
    </>
  );
};

export default EditorBlockPlace;
