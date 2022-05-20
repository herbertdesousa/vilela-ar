import React from 'react';

import {
  DocumentEditorNav,
  DocumentEditorPreviewer,
} from '@/modules/Document/DocumentEditor';
import { DocumentEditorSideMenuBlockPlaceDevice } from '@/modules/Document/DocumentEditor/DocumentEditorSideMenu';

const EditorBlockPlaceDevice: React.FC = () => {
  return (
    <>
      <DocumentEditorNav />

      <div className="flex" style={{ height: 'calc(100vh - 96px)' }}>
        <DocumentEditorPreviewer />

        <DocumentEditorSideMenuBlockPlaceDevice />
      </div>
    </>
  );
};

export default EditorBlockPlaceDevice;
