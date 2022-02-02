/* eslint-disable import/no-duplicates */
import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import * as regexs from '@/utils/regex';
import { moneyMask } from '@/utils/mask';

import { useCustomers } from '@/hooks/customers';
import { useFinances } from '@/hooks/finances';
import { ISaveFinance } from '@/hooks/finances/types';
import { IFinanceDTO } from '@/dtos/IFinanceDTO';

import { Button, Header, Switch, Text, TextField } from '@/components';
import { FinanceRoutesParams } from '@/routes/components/FinanceRoutes';
import { ICustomerDTO } from '@/dtos/ICustomerDTO';

const SchemaValidation = Yup.object().shape({
  type: Yup.string()
    .required('obrigatório')
    .oneOf(['income', 'outcome'], 'inválido'),
  date: Yup.string().required('obrigatório'),
  value: Yup.string().required('obrigatório'),
  description: Yup.string().notRequired(),
});

type RouteProps = RouteProp<FinanceRoutesParams, 'FinanceSave'>;
const FinanceSave: React.FC = () => {
  const {
    params: { item },
  } = useRoute<RouteProps>();
  const { goBack } = useNavigation();
  const { createFinance, updateFinance } = useFinances();
  const { customers } = useCustomers();

  const [isShowingDatePicker, setIsShowingDatePicker] = useState(false);

  const onSubmit = async (
    formData: ISaveFinance,
    actions: FormikHelpers<ISaveFinance>,
  ) => {
    try {
      if (
        formData.type === 'income' &&
        formData.customerId &&
        !customers.find(i => i.id === formData.customerId)
      ) {
        actions.setErrors({ customerId: 'inválido' });
        return;
      }

      const data = {
        ...formData,
        value: Number(String(formData.value).replace(/\D/g, '')),
        date: String(new Date(formData.date).toISOString()),
      };
      !item ? await createFinance(data) : await updateFinance(item.id, data);

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
          item
            ? (({ value, ...r }) => ({ ...r, value: String(value) }))(item)
            : {
                type: 'income',
                date: `${new Date(Date.now())}`,
                value: '',
                description: '',
                customerId: '',
              }
        }
        onSubmit={onSubmit}
        validationSchema={SchemaValidation}
      >
        {({ values, submitForm, isSubmitting, setFieldValue }) => (
          <>
            <Text type="title">Gerais</Text>

            <Switch
              name="type"
              label="Tipo"
              options={{
                options1: { label: 'Entrada', value: 'income' },
                options2: { label: 'Saída', value: 'outcome' },
              }}
              containerStyle={{ marginTop: 8 }}
            />
            <Button
              type="outline"
              onPress={() => setIsShowingDatePicker(true)}
              containerStyle={{ marginTop: 16 }}
            >
              {format(new Date(values.date), 'MMM, dd yyyy', { locale: ptBR })}
            </Button>
            {isShowingDatePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={new Date(item?.date || Date.now())}
                mode="date"
                is24Hour={false}
                display="default"
                onChange={(_: any, date: Date | undefined) => {
                  setIsShowingDatePicker(false);
                  if (date) setFieldValue('date', String(date));
                }}
              />
            )}

            <TextField
              name="value"
              label="Valor *"
              formatOnChange={moneyMask}
              keyboardType="numeric"
              containerStyle={{ marginTop: 8 }}
            />
            <TextField
              name="description"
              label="Descrição"
              containerStyle={{ marginTop: 8 }}
            />
            {values.type === 'income' && (
              <TextField
                name="customerId"
                label="Cliente"
                autoComplete={{
                  onQuery: query => {
                    return customers
                      .filter(i =>
                        i.name
                          .toLocaleLowerCase()
                          .includes(query.toLocaleLowerCase()),
                      )
                      .map(i => ({
                        id: i.id,
                        label: i.name,
                        value: i.id,
                      }));
                  },
                }}
                value={(() => {
                  const finded = customers.find(
                    i => i.id === values.customerId,
                  );
                  return finded ? finded.name : values.customerId;
                })()}
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

export default FinanceSave;
