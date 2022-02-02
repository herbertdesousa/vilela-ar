import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { Button, TextField, Text } from '@/components';

import { Modalize } from 'react-native-modalize';
import { IHandles } from 'react-native-modalize/lib/options';
import colors from '@/styles/colors';
import { useReceiptRefs } from '..';

import { IReceiptRefsCreateModalizeRef, ReceiptRefsTypes } from '../types';

type IRef = IReceiptRefsCreateModalizeRef;

const SchemaValidation = Yup.object().shape({
  name: Yup.string().required(),
});

const ReceiptRefsCreateModalize: React.ForwardRefRenderFunction<IRef> = (
  { ...r },
  ref,
) => {
  const { createReceiptRef } = useReceiptRefs();
  const modalizeRef = useRef<IHandles>(null);

  const [receiptRefType, setReceiptRefType] = useState<ReceiptRefsTypes>();

  useImperativeHandle(ref, () => ({
    close() {
      modalizeRef.current?.open();
    },
    open(type) {
      setReceiptRefType(type);
      modalizeRef.current?.open();
    },
  }));

  const onSubmit = useCallback(
    async (
      { name }: { name: string },
      actions: FormikHelpers<{ name: string }>,
    ) => {
      if (!receiptRefType) return;
      try {
        await createReceiptRef(name, receiptRefType);
        actions.setSubmitting(false);
        modalizeRef.current?.close();
      } catch (err: any) {
        if (err.response.status === 422 || err.response.status === 401) {
          actions.setErrors(err.response.data.errors);
          actions.setSubmitting(false);
        }
      }
    },
    [createReceiptRef, receiptRefType],
  );

  return (
    <Modalize
      ref={modalizeRef}
      adjustToContentHeight
      modalStyle={{
        paddingHorizontal: 24,
        paddingVertical: 32,
        backgroundColor: colors.accent_6,
      }}
    >
      <Text type="heading">Novo</Text>
      <Formik
        initialValues={{ name: '' }}
        onSubmit={onSubmit}
        validationSchema={SchemaValidation}
      >
        {({ submitForm, isSubmitting }) => (
          <>
            <TextField
              name="name"
              label="Nome"
              containerStyle={{ marginVertical: 24 }}
            />
            <Button
              onPress={submitForm}
              containerStyle={{ marginBottom: 32 }}
              isLoading={isSubmitting}
            >
              Criar
            </Button>
          </>
        )}
      </Formik>
    </Modalize>
  );
};

export default forwardRef(ReceiptRefsCreateModalize);
