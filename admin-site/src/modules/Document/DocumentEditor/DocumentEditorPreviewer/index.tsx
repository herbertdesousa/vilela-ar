import React, { useState } from 'react';
import { useRouter } from 'next/router';

import { useDocument } from '@/hook/document';

import { Select } from '@/components';

import DocumentEditorPreviewerHeader from './DocumentEditorPreviewerHeader';
import DocumentEditorPreviewerPayment from './DocumentEditorPreviewerPayment';
import DocumentEditorPreviewerBankDetails from './DocumentEditorPreviewerBankDetails';
import DocumentEditorPreviewerBlock from './DocumentEditorPreviewerBlock';

const DOCUMENT_HEIGHT = 842;

const DocumentEditorPreviewer: React.FC = () => {
  const router = useRouter();

  const { add_bank_details_page, blocksInPage, previewPages } = useDocument();

  const pushDocumentoEditorPage = () => {
    router.push('/documents/editor');
  };

  const [bankDetailsPage, setBankDetailsPage] = useState(false);

  console.log(blocksInPage);

  return (
    <section className="flex flex-1 relative items-center justify-center bg-accent-1 w-full min-h-full overflow-x-scroll no-scroll">
      <div
        role="button"
        tabIndex={0}
        className="absolute w-full h-full"
        onClick={pushDocumentoEditorPage}
        onKeyDown={pushDocumentoEditorPage}
      >
        {}
      </div>

      <div
        style={{
          width: 595,
          zoom: 0.9,
          height: DOCUMENT_HEIGHT,
        }}
        className="relative bg-accent-0 rounded z-10"
      >
        {!bankDetailsPage && (
          <div>
            <DocumentEditorPreviewerHeader
              type={previewPages.activeIndex !== 0 ? 'small' : 'with-header'}
            />
            <ul className="px-10 pt-8">
              {blocksInPage[previewPages.activeIndex]
                .sort((a: any, b: any) => a.order - b.order)
                .map((block, blockIndex) => {
                  if (block.type === 'payment')
                    return <DocumentEditorPreviewerPayment block={block} />;
                  return (
                    <DocumentEditorPreviewerBlock
                      key={block.id}
                      block={block}
                      blockIndex={blockIndex}
                    />
                  );
                })}
            </ul>
          </div>
        )}
        {bankDetailsPage && <DocumentEditorPreviewerBankDetails />}
      </div>

      <div className="absolute left-6 bottom-6">
        <Select
          name="pages"
          label=""
          value={previewPages.value.find(i => i.isActive)?.label}
          data={previewPages.value.map(i => ({ ...i, value: i.label }))}
          onSelect={payload => {
            previewPages.changePage(
              previewPages.value.findIndex(i => i.label === payload.value),
            );
            // setBankDetailsPage(payload.value === 'bank_details');
          }}
          className="w-40"
          dropdownStyle={{ bottom: 44 }}
        />
      </div>
    </section>
  );
};

export default DocumentEditorPreviewer;
