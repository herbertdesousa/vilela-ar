import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import {
  FinanceRoutesParams,
  FinanceRoutesNavigation,
} from '@/routes/components/FinanceRoutes';

import { useFinances } from '@/hooks/finances';

import { Button, Text, Header } from '@/components';
import { cpfAndCnpjFormatter, moneyFormatter } from '@/utils/formatters';

type RouteProps = RouteProp<FinanceRoutesParams, 'FinanceDetails'>;
const FinanceDetails: React.FC = () => {
  const {
    params: { item },
  } = useRoute<RouteProps>();
  const { goBack, navigate } = useNavigation<FinanceRoutesNavigation>();
  const { deleteFinance } = useFinances();

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
    await deleteFinance(item.id, item.type);
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
        <Text type="base">
          {`Tipo: ${item.type === 'income' ? 'Entrada' : 'Saída'}`}
        </Text>
        <Text type="base">{`Valor: ${moneyFormatter(item.value)}`}</Text>
        <Text type="base">
          {`Descrição: ${item.description || 'Não Informado'}`}
        </Text>

        {item.type === 'income' && item.customerId && (
          <>
            <Text type="title" style={{ marginBottom: 8, marginTop: 24 }}>
              Cliente
            </Text>
            <Text type="base">{`Nome: ${item.customer?.name}`}</Text>
            <Text type="base">
              {`Document: ${cpfAndCnpjFormatter(
                item.customer?.document || '',
              )}`}
            </Text>
            <Text type="base">
              {`Tipo: ${
                item.customer?.type === 'PERSONAL' ? 'Pessoa Física' : 'Empresa'
              }`}
            </Text>
            {item.customer?.type !== 'PERSONAL' && (
              <Text type="base">
                {`Representante: ${
                  item.customer?.representative || 'Não Informado'
                }`}
              </Text>
            )}
            <Text type="base">
              {`${item.customer?.type === 'PERSONAL' ? 'CPF' : 'CNPJ'}: ${
                item.customer?.document || 'Não Informado'
              }`}
            </Text>
          </>
        )}
      </View>

      <View style={{ marginTop: 24 }}>
        <Text type="title" style={{ marginBottom: 8 }}>
          Ações
        </Text>

        <Button
          type="outline"
          onPress={() => navigate('FinanceSave', { item })}
          containerStyle={{ marginBottom: 8 }}
        >
          Editar
        </Button>
        <Button
          type="delete"
          onPress={() => !isDeleting && onPressDelete()}
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

export default FinanceDetails;
