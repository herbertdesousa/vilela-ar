import React from 'react';

import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { Customer } from '@/pages';
import { ICustomerDTO } from '@/dtos/ICustomerDTO';

import colors from '@/styles/colors';

export type CustomerRoutesParams = {
  CustomerList: undefined;
  CustomerDetails: { item: ICustomerDTO };
  CustomerSave: { item?: ICustomerDTO };
};
export type CustomerRoutesNavigation = NativeStackScreenProps<
  CustomerRoutesParams,
  'CustomerList'
>['navigation'];

const CustomerRouter = createNativeStackNavigator<CustomerRoutesParams>();

const CustomerRoutes: React.FC = () => {
  return (
    <CustomerRouter.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: colors.accent_6 },
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <CustomerRouter.Screen
        component={Customer.CustomerList}
        name="CustomerList"
      />
      <CustomerRouter.Screen
        component={Customer.CustomerDetails}
        name="CustomerDetails"
      />
      <CustomerRouter.Screen
        component={Customer.CustomerSave}
        name="CustomerSave"
      />
    </CustomerRouter.Navigator>
  );
};

export default CustomerRoutes;
