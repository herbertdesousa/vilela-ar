import colors from '@/styles/colors';
import styled from 'styled-components/native';

export const DrawerContentContainer = styled.View`
  flex: 1;
  background: ${colors.accent_5};

  padding: 96px 24px 16px 24px;
`;

export const DrawerContentButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  flex-direction: row;
  align-items: center;

  width: 100%;
  padding: 16px;
  height: 56px;
  background: ${colors.accent_4};
  border-radius: 4px;
`;
