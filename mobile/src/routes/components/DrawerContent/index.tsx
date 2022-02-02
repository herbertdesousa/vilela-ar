import React from 'react';

import { DrawerContentComponentProps } from '@react-navigation/drawer';

import FeatherIcons from '@expo/vector-icons/Feather';
import { Text } from '@/components';
import colors from '@/styles/colors';

import { DrawerContentButton, DrawerContentContainer } from './styles';

interface IDrawerContent {
  options: DrawerContentComponentProps;
}

const DrawerContent: React.FC<IDrawerContent> = ({ options }) => {
  return (
    <DrawerContentContainer>
      <Text type="heading" style={{ marginBottom: 32 }}>
        Menu
      </Text>

      <DrawerContentButton
        onPress={() => options.navigation.navigate('Customer')}
      >
        <FeatherIcons name="user" size={24} color={colors.accent_0} />

        <Text type="title" style={{ fontSize: 18, marginLeft: 16 }}>
          Clientes
        </Text>
      </DrawerContentButton>

      <DrawerContentButton
        style={{ marginTop: 8 }}
        onPress={() => options.navigation.navigate('Finance')}
      >
        <FeatherIcons name="dollar-sign" size={24} color={colors.accent_0} />

        <Text type="title" style={{ fontSize: 18, marginLeft: 16 }}>
          Finances
        </Text>
      </DrawerContentButton>
      {/* <DrawerContentButton style={{ marginTop: 8, marginBottom: 24 }}>
        <FeatherIcons name="paperclip" size={24} color={colors.accent_0} />

        <Text type="title" style={{ fontSize: 18, marginLeft: 16 }}>
          Papel Timbrado
        </Text>
      </DrawerContentButton>

      <Text type="title" style={{ marginBottom: 8 }}>
        Configuração
      </Text>
      <DrawerContentButton
        style={{ marginTop: 8, marginBottom: 24 }}
        onPress={() => options.navigation.navigate('Refs')}
      >
        <FeatherIcons name="git-commit" size={24} color={colors.accent_0} />

        <Text type="title" style={{ fontSize: 18, marginLeft: 16 }}>
          Refs
        </Text>
      </DrawerContentButton> */}
    </DrawerContentContainer>
  );
};

export default DrawerContent;
