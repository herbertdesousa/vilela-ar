import React from 'react';

import { BorderlessButton } from 'react-native-gesture-handler';
import FeatherIcons from '@expo/vector-icons/Feather';

import colors from '@/styles/colors';
import { HeaderContainer, HeaderTitle } from './styles';

interface IHeaderProps {
  icon: {
    name: string;
    onPress?(): void;
  };
  title: string;
}

const Header: React.FC<IHeaderProps> = ({ icon, title }) => {
  return (
    <HeaderContainer>
      <BorderlessButton style={{ padding: 8 }} onPress={icon.onPress}>
        <FeatherIcons
          name={icon.name as any}
          size={24}
          color={colors.accent_0}
        />
      </BorderlessButton>

      <HeaderTitle>{title}</HeaderTitle>
    </HeaderContainer>
  );
};

export default Header;
