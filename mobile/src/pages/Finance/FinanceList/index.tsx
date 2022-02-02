import React from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';

import { useNavigation, DrawerActions } from '@react-navigation/native';
import { FinanceRoutesNavigation } from '@/routes/components/FinanceRoutes';

import CustomerImage from '@/assets/customers/customer.svg';
import { Button, Header, Item, Text } from '@/components';

import { useFinances } from '@/hooks/finances';

import { moneyFormatter } from '@/utils/formatters';
import colors from '@/styles/colors';
import { CustomerListHeader } from './styles';

const FinanceList: React.FC = () => {
  const { navigate, dispatch } = useNavigation<FinanceRoutesNavigation>();
  const {
    finances,
    isInitialLoading,
    isRefreshing,
    onRefresh,
    nextPage,
    isLoadingMore,
  } = useFinances();

  if (isInitialLoading) {
    return (
      <Text type="heading" style={{ marginTop: 96, marginLeft: 24 }}>
        {'Carregando\nFinancias...'}
      </Text>
    );
  }
  return (
    <>
      <FlatList
        data={finances}
        ListHeaderComponent={() => (
          <>
            <Header
              icon={{
                name: 'menu',
                onPress: () => dispatch(DrawerActions.openDrawer),
              }}
              title="Financias"
            />

            <CustomerListHeader>
              <View>
                <Text type="base">Total</Text>

                <Text type="title">{`${finances.length} Financias`}</Text>
              </View>

              <CustomerImage />
            </CustomerListHeader>
          </>
        )}
        renderItem={({ item }) => (
          <Item
            item={{
              title: item.type === 'income' ? 'Entrada' : 'Saída',
              content: `Valor: ${moneyFormatter(item.value)}\nDescrição: ${
                item.description || 'Não Informado'
              }${
                item.type === 'income' && item.customerId
                  ? `\nCliente: ${item.customer?.name}`
                  : ''
              }`,
            }}
            onPress={() => {
              navigate('FinanceDetails', { item });
            }}
          />
        )}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 4 }} />}
        contentContainerStyle={{
          paddingVertical: 96,
          paddingHorizontal: 24,
        }}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        // -----------------------------//
        showsVerticalScrollIndicator={false}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isLoadingMore ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : (
            <Button
              type="outline"
              containerStyle={{ marginTop: 16 }}
              onPress={nextPage}
            >
              Carregar Mais
            </Button>
          )
        }
      />
      <Button
        containerStyle={{
          position: 'absolute',
          right: 24,
          bottom: 32,
          borderRadius: 16,
        }}
        onPress={() => navigate('FinanceSave', {})}
      >
        <Text type="title" style={{ fontSize: 18 }}>
          Adicionar
        </Text>
      </Button>
    </>
  );
};

export default FinanceList;
