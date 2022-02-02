import React from 'react';
import { FlatList, View } from 'react-native';

import { useNavigation, DrawerActions } from '@react-navigation/native';
import { RefsRoutesNavigation } from '@/routes/components/RefsRoutes';

import { useReceiptRefs } from '@/hooks/receiptRefs';

import { Header, Item, Text } from '@/components';

const RefsAll: React.FC = () => {
  const { isLoading, receiptRefs, isRefreshing, onRefresh } = useReceiptRefs();

  const { navigate, dispatch } = useNavigation<RefsRoutesNavigation>();

  if (isLoading) {
    return (
      <Text type="heading" style={{ marginTop: 96, marginLeft: 24 }}>
        {'Carregando\nRefs...'}
      </Text>
    );
  }
  return (
    <FlatList
      data={receiptRefs}
      ListHeaderComponent={() => (
        <Header
          icon={{
            name: 'menu',
            onPress: () => dispatch(DrawerActions.openDrawer),
          }}
          title="Refs"
        />
      )}
      keyExtractor={item => item.label}
      renderItem={({ item }) => (
        <Item
          item={{ title: item.label, content: `${item.data.length} Itens` }}
          onPress={() => navigate('RefsList', item)}
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
  );
};

export default RefsAll;
