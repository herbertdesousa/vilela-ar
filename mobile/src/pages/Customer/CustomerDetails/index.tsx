import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  CustomerRoutesParams,
  CustomerRoutesNavigation,
} from '@/routes/components/CustomerRoutes';

import { useCustomers } from '@/hooks/customers';

import { Button, Text, Header } from '@/components';
import { cpfAndCnpjFormatter } from '@/utils/formatters';

type RouteProps = RouteProp<CustomerRoutesParams, 'CustomerDetails'>;
const CustomerDetails: React.FC = () => {
  const {
    params: { item },
  } = useRoute<RouteProps>();
  const { goBack, navigate } = useNavigation<CustomerRoutesNavigation>();
  const { deleteCustomer } = useCustomers();

  const [isConfirmDeleteActive, setIsConfirmDeleteActive] = useState(false);
  const [confirmTime, setConfirmTime] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!isConfirmDeleteActive) return () => ({});

    const myInterval = setInterval(() => {
      if (confirmTime > 0) {
        setConfirmTime(confirmTime - 1);
      }
      if (confirmTime === 1) {
        setIsConfirmDeleteActive(false);
        clearInterval(myInterval);
      }
    }, 1000);

    return () => {
      clearInterval(myInterval);
    };
  }, [confirmTime, isConfirmDeleteActive]);

  const onPressDelete = async () => {
    if (!isConfirmDeleteActive) {
      setIsConfirmDeleteActive(true);
      setConfirmTime(5);
      return;
    }

    setIsDeleting(true);
    await deleteCustomer(item?.id || '');
    setIsConfirmDeleteActive(false);
    setIsDeleting(false);
    goBack();
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingVertical: 96,
        paddingHorizontal: 24,
      }}
    >
      <Header icon={{ name: 'arrow-left', onPress: goBack }} title="Detalhes" />

      <View>
        <Text type="title" style={{ marginBottom: 8 }}>
          Gerais
        </Text>
        <Text type="base">{`Nome: ${item.name}`}</Text>
        <Text type="base">
          {`Document: ${cpfAndCnpjFormatter(item.name || '')}`}
        </Text>
        <Text type="base">
          {`Tipo: ${item.type === 'PERSONAL' ? 'Pessoa Física' : 'Empresa'}`}
        </Text>
        {item.type !== 'PERSONAL' && (
          <Text type="base">
            {`Representante: ${item.representative || 'Não Informado'}`}
          </Text>
        )}
        <Text type="base">
          {`${item.type === 'PERSONAL' ? 'CPF' : 'CNPJ'}: ${
            item.document || 'Não Informado'
          }`}
        </Text>
      </View>

      <View style={{ marginTop: 24 }}>
        <Text type="title" style={{ marginBottom: 8 }}>
          Ações
        </Text>

        <Button
          type="outline"
          onPress={() => navigate('CustomerSave', { item })}
          containerStyle={{ marginBottom: 8 }}
        >
          Editar
        </Button>
        <Button
          type="delete"
          onPress={onPressDelete}
          secondLabel={
            !isDeleting && isConfirmDeleteActive ? `${confirmTime}s` : ''
          }
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          {!isDeleting
            ? isConfirmDeleteActive
              ? 'Realmente Deseja Deletar?'
              : 'Remover'
            : 'Deletando'}
        </Button>
      </View>
    </ScrollView>
  );
};

export default CustomerDetails;
