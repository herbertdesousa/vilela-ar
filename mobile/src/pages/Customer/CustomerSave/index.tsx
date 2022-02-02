import React from 'react';
import { ScrollView } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { cpfAndCnpjFormatter } from '@/utils/formatters';
import * as regexs from '@/utils/regex';

import { useCustomers } from '@/hooks/customers';
import { ISaveCustomer } from '@/hooks/customers/types';

import { Button, Header, Switch, Text, TextField } from '@/components';
import { CustomerRoutesParams } from '@/routes/components/CustomerRoutes';

const SchemaValidation = Yup.object().shape({
  name: Yup.string().required('obrigatório'),
  type: Yup.string()
    .required('obrigatório')
    .oneOf(['PERSONAL', 'ENTITY'], 'inválido'),
  document: Yup.string()
    .notRequired()
    .matches(regexs.cpfAndCnpjRegex, 'inválido'),
  representative: Yup.string().notRequired(),
});

type RouteProps = RouteProp<CustomerRoutesParams, 'CustomerSave'>;
const CustomerSave: React.FC = () => {
  const {
    params: { item },
  } = useRoute<RouteProps>();
  const { goBack } = useNavigation();
  const { createCustomer, updateCustomer } = useCustomers();

  const onSubmit = async (
    formData: ISaveCustomer,
    actions: FormikHelpers<ISaveCustomer>,
  ) => {
    try {
      !item
        ? await createCustomer(formData)
        : await updateCustomer(item.id, formData);

      actions.setSubmitting(false);
      goBack();
    } catch (err: any) {
      console.log(err.response.data);
      if (err.response.status === 422 || err.response.status === 401) {
        actions.setErrors(err.response.data.errors);
        actions.setSubmitting(false);
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 96,
        paddingHorizontal: 24,
      }}
    >
      <Header icon={{ name: 'arrow-left', onPress: goBack }} title="Criar" />

      <Formik
        initialValues={
          item || {
            name: '',
            type: 'PERSONAL',
            document: '',
            representative: '',
          }
        }
        onSubmit={onSubmit}
        validationSchema={SchemaValidation}
      >
        {({ values, submitForm, isSubmitting }) => (
          <>
            <Text type="title">Gerais</Text>

            <Switch
              name="type"
              label="Tipo"
              options={{
                options1: { label: 'Pessoa Física', value: 'PERSONAL' },
                options2: { label: 'Empresa', value: 'ENTITY' },
              }}
              containerStyle={{ marginTop: 8 }}
            />
            <TextField
              name="name"
              label="Nome *"
              containerStyle={{ marginTop: 16 }}
            />
            <TextField
              name="document"
              label={values.type === 'PERSONAL' ? 'CPF *' : 'CNPJ *'}
              keyboardType="numeric"
              formatOnChange={cpfAndCnpjFormatter}
              containerStyle={{ marginTop: 8 }}
            />
            {values.type !== 'PERSONAL' && (
              <TextField
                name="representative"
                label="Representate"
                containerStyle={{ marginTop: 8 }}
              />
            )}

            <Button
              onPress={submitForm}
              isLoading={isSubmitting}
              containerStyle={{ marginTop: 24 }}
            >
              Salvar
            </Button>
          </>
        )}
      </Formik>
    </ScrollView>
  );
};

export default CustomerSave;
