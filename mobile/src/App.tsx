import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'expo-status-bar';

import { NavigationContainer } from '@react-navigation/native';

import { SWRConfigComponent } from './lib/SWRConfig';
import Routes from './routes';
import Hooks from './hooks';

const App: React.FC = () => {
  return (
    <SWRConfigComponent>
      <NavigationContainer>
        <StatusBar backgroundColor="transparent" translucent />

        <Hooks>
          <Routes />
        </Hooks>
      </NavigationContainer>
    </SWRConfigComponent>
  );
};

export default App;
