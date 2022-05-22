import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

import { useResizeDetector } from 'react-resize-detector';

import { useDocument } from '@/hook/document';

import {
  IDocumentFormDataLayersBlock,
  IDocumentFormDataLayersPayment,
} from '@/hook/document/types/DocumentFormData';
import moneyFormat from '@/utils/moneyFormat';
import onlyNumbersFormat from '@/utils/onlyNumbersFormat';
import DocumentEditorPreviewerFocusIndicator from '../DocumentEditorPreviewerFocusIndicator';

interface IDocumentEditorPreviewerPaymentProps {
  block: IDocumentFormDataLayersPayment;
}

const DocumentEditorPreviewerPayment: React.FC<
  IDocumentEditorPreviewerPaymentProps
> = ({ block }) => {
  const { layers, saveBlockInPageMeasures } = useDocument();
  const router = useRouter();

  const payment = layers.value.filter(
    i => i.type === 'payment',
  )[0] as IDocumentFormDataLayersPayment;
  const blocks = layers.value.filter(
    i => i.type === 'block',
  ) as IDocumentFormDataLayersBlock[];

  const priceTotal = useMemo(() => {
    const prices = blocks
      .filter(b => b.price.value && b.price.sum_price_in_payment)
      .map(i => Number(onlyNumbersFormat(i.price.value)));

    return moneyFormat(prices.reduce((a, b) => a + b, 0));
  }, [blocks]);

  const isOnPaymentPage = useMemo((): boolean => {
    return !!router.pathname.split('/').find(i => i === 'payment');
  }, [router.pathname]);

  const pushPaymentPage = () => {
    router.push('/documents/editor/payment');
  };

  const containerMeasuresRef = useResizeDetector();

  useEffect(() => {
    saveBlockInPageMeasures({
      ...block,
      height: containerMeasuresRef.height,
      width: containerMeasuresRef.width,
    });
  }, [containerMeasuresRef.height, containerMeasuresRef.width]);

  return (
    <div
      ref={containerMeasuresRef.ref}
      className="w-full flex justify-end mt-20"
    >
      <div
        role="button"
        tabIndex={0}
        style={{
          display: !blocks.find(
            b => b.price.value && b.price.sum_price_in_payment,
          )
            ? 'none'
            : 'block',
          width: 242,
          outline: isOnPaymentPage ? '3px solid #A3CCF3' : 0,
        }}
        className="relative border-t border-accent-6 pt-4 px-4 text-xs"
        onClick={pushPaymentPage}
        onKeyDown={pushPaymentPage}
      >
        {isOnPaymentPage && <DocumentEditorPreviewerFocusIndicator />}
        <ul>
          {blocks.map((b, index) =>
            b.price.value && b.price.sum_price_in_payment ? (
              <div
                className={`flex justify-between ${index !== 0 ? 'mt-1' : ''}`}
              >
                <span>{b.title}</span>
                <span>{b.price.value}</span>
              </div>
            ) : (
              <></>
            ),
          )}
          {priceTotal && payment.sum_all_prices && (
            <div className="flex justify-between mt-2">
              <span>Total</span>
              <strong>{priceTotal}</strong>
            </div>
          )}
        </ul>
        <p className="mt-4 text-accent-4">{payment.comments}</p>
      </div>
    </div>
  );
};

export default DocumentEditorPreviewerPayment;
