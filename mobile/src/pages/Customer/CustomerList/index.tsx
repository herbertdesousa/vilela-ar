import React from 'react';
import { FlatList, View } from 'react-native';

import { useNavigation, DrawerActions } from '@react-navigation/native';
import { CustomerRoutesNavigation } from '@/routes/components/CustomerRoutes';

import CustomerImage from '@/assets/customers/customer.svg';
import { Button, Header, Item, Text } from '@/components';

import { useCustomers } from '@/hooks/customers';

import { CustomerListHeader } from './styles';

const CustomerList: React.FC = () => {
  const { navigate, dispatch } = useNavigation<CustomerRoutesNavigation>();
  const { customers, isLoading, isRefreshing, onRefresh } = useCustomers();

  if (isLoading) {
    return (
      <Text type="heading" style={{ marginTop: 96, marginLeft: 24 }}>
        {'Carregando\nClientes...'}
      </Text>
    );
  }
  return (
    <>
      <FlatList
        data={customers}
        ListHeaderComponent={() => (
          <>
            <Header
              icon={{
                name: 'menu',
                onPress: () => dispatch(DrawerActions.openDrawer),
              }}
              title="Clientes"
            />

            <CustomerListHeader>
              <View>
                <Text type="base">Total</Text>

                <Text type="title">{`${customers.length} Clientes`}</Text>
              </View>

              <CustomerImage />
            </CustomerListHeader>
          </>
        )}
        renderItem={({ item }) => (
          <Item
            item={{
              title: item.name,
              content: `Tipo: ${
                item.type === 'PERSONAL' ? 'Pessoa Física' : 'Empresa'
              }\n${item.type === 'PERSONAL' ? 'CPF' : 'CNPJ'}: ${
                item.document || 'Não Informado'
              }`,
            }}
            onPress={() => {
              navigate('CustomerDetails', { item });
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
      />
      <Button
        containerStyle={{
          position: 'absolute',
          right: 24,
          bottom: 32,
          borderRadius: 16,
        }}
        onPress={() => navigate('CustomerSave', {})}
      >
        <Text type="title" style={{ fontSize: 18 }}>
          Adicionar
        </Text>
      </Button>
    </>
  );
};

export default CustomerList;
