import React from 'react';

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Finance } from '@/pages';
import { IFinanceDTO } from '@/dtos/IFinanceDTO';

import colors from '@/styles/colors';

export type FinanceRoutesParams = {
  FinanceList: undefined;
  FinanceDetails: { item: IFinanceDTO };
  FinanceSave: { item?: IFinanceDTO };
};
export type FinanceRoutesNavigation = NativeStackScreenProps<
  FinanceRoutesParams,
  'FinanceList'
>['navigation'];

const FinanceRouter = createNativeStackNavigator<FinanceRoutesParams>();

const FinanceRoutes: React.FC = () => {
  return (
    <FinanceRouter.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: colors.accent_6 },
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <FinanceRouter.Screen
        component={Finance.FinanceList}
        name="FinanceList"
      />
      <FinanceRouter.Screen
        component={Finance.FinanceDetails}
        name="FinanceDetails"
      />
      <FinanceRouter.Screen
        component={Finance.FinanceSave}
        name="FinanceSave"
      />
    </FinanceRouter.Navigator>
  );
};

export default FinanceRoutes;
