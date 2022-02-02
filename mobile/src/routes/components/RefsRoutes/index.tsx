import React from 'react';

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { RefsList } from '@/pages';
import { IRefsData } from '@/hooks/receiptRefs/types';

import colors from '@/styles/colors';

export type RefsRoutesParams = {
  RefsList: IRefsData;
  RefsAll: undefined;
};
export type RefsRoutesNavigation = NativeStackScreenProps<
  RefsRoutesParams,
  'RefsList'
>['navigation'];

const RefsRouter = createNativeStackNavigator<RefsRoutesParams>();

const RefsRoutes: React.FC = () => {
  return (
    <RefsRouter.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: colors.accent_6 },
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <RefsRouter.Screen name="RefsAll" component={RefsList.RefsAll} />
      <RefsRouter.Screen name="RefsList" component={RefsList.RefsList} />
    </RefsRouter.Navigator>
  );
};

export default RefsRoutes;
