import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { CustomerRoutes, DrawerContent, FinanceRoutes } from './components';

export type AppDrawerRoutesParams = {
  Customer: undefined;
  Finance: undefined;
  // Refs: undefined;
};

const AppDrawer = createDrawerNavigator<AppDrawerRoutesParams>();

const Routes: React.FC = () => {
  return (
    <AppDrawer.Navigator
      screenOptions={{ headerShown: false }}
      drawerContent={props => <DrawerContent options={props} />}
    >
      <AppDrawer.Screen name="Customer" component={CustomerRoutes} />
      <AppDrawer.Screen name="Finance" component={FinanceRoutes} />
      {/* <AppDrawer.Screen name="Refs" component={RefsRoutes} /> */}
    </AppDrawer.Navigator>
  );
};

export default Routes;
