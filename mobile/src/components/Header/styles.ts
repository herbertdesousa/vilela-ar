import styled from 'styled-components/native';
import { Text } from 'react-native';

import colors from '@/styles/colors';
import fonts from '@/styles/fonts';

export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 32px;
`;

export const HeaderTitle = styled.Text`
  color: ${colors.accent_0};
  font-family: ${fonts.bold};
  font-size: 36px;

  margin-left: 16px;
`;
