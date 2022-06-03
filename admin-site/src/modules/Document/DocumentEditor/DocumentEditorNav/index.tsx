import React from 'react';
import { useRouter } from 'next/router';

import { useDocument } from '@/hook/document';

import { Button } from '@/components';
import { MdChevronLeft } from 'react-icons/md';

const DocumentEditorNav: React.FC = () => {
  const router = useRouter();

  const { pdf, title, saveDocument, clearEditor } = useDocument();

  return (
    <nav className="flex justify-between items-center w-full px-10 h-24 border-b border-accent-2">
      <div className="flex items-center">
        <button
          type="button"
          className="flex items-center mr-16"
          onClick={() => router.push('/documents')}
        >
          <MdChevronLeft size={16} className="mr-2" />
          Sair
        </button>

        <h1 className="font-merriweather text-2xl font-bold">{title}</h1>
      </div>

      <div className="flex">
        <Button
          size="sm"
          variant="outline"
          className="mr-2"
          onClick={clearEditor}
        >
          Salvar
        </Button>
        <Button size="sm" onClick={pdf.generate}>
          Gerar PDF e Enviar
        </Button>
      </div>
    </nav>
  );
};

export default DocumentEditorNav;
