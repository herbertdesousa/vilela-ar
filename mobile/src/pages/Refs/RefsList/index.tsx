import React from 'react';
import { FlatList, View } from 'react-native';

import FeatherIcons from '@expo/vector-icons/Feather';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import {
  RefsRoutesNavigation,
  RefsRoutesParams,
} from '@/routes/components/RefsRoutes';

import { useReceiptRefs } from '@/hooks/receiptRefs';

import colors from '@/styles/colors';

import { Button, Header, Item, Text } from '@/components';

type RouteProps = RouteProp<RefsRoutesParams, 'RefsList'>;
const RefsList: React.FC = () => {
  const { params } = useRoute<RouteProps>();
  const { goBack } = useNavigation<RefsRoutesNavigation>();

  const { deleteReceiptRef, receiptRefs, receiptRefCreateRef } =
    useReceiptRefs();

  return (
    <>
      <FlatList
        data={receiptRefs.find(i => i.type === params.type)?.data || []}
        ListHeaderComponent={() => (
          <>
            <Header
              icon={{
                name: 'arrow-left',
                onPress: goBack,
              }}
              title="Refs"
            />
            <Text type="title" style={{ marginBottom: 16 }}>
              {params.label}
            </Text>
          </>
        )}
        keyExtractor={item => item}
        renderItem={({ item }) => {
          return (
            <View style={{ flexDirection: 'row' }}>
              <Item
                item={{ title: item }}
                containerStyle={{ flex: 1 }}
                contentContainerStyle={{ height: 56 }}
              />

              <Button
                onPress={async () => deleteReceiptRef(item, params.type)}
                containerStyle={{ width: 56, marginLeft: 8 }}
                type="delete"
              >
                <FeatherIcons
                  name="trash-2"
                  size={24}
                  color={colors.accent_0}
                />
              </Button>
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={{ marginVertical: 8 }} />}
        contentContainerStyle={{
          paddingVertical: 96,
          paddingHorizontal: 24,
        }}
      />
      <Button
        containerStyle={{
          position: 'absolute',
          right: 24,
          bottom: 32,
          borderRadius: 16,
        }}
        onPress={() => receiptRefCreateRef.current?.open(params.type)}
      >
        <Text type="title" style={{ fontSize: 18 }}>
          Adicionar
        </Text>
      </Button>
    </>
  );
};

export default RefsList;
