import styled from 'styled-components/native';
import Animated from 'react-native-reanimated';

import colors from '@/styles/colors';
import fonts from '@/styles/fonts';

export const SwitchTitle = styled.Text`
  font-size: 18px;
  color: ${colors.accent_0};
  font-family: ${fonts.bold};

  margin-bottom: 4px;
`;

export const SwitchCase = styled.TouchableOpacity.attrs({
  activeOpacity: 0.8,
})`
  width: 50%;
  height: 56px;
  align-items: center;
  justify-content: center;
  z-index: 10;
`;

export const SwitchCaseText = styled.Text`
  font-size: 16px;
  color: ${colors.accent_0};
  font-family: ${fonts.medium};
  z-index: 10;
`;

export const SwitchCaseSelect = styled(Animated.View)`
  position: absolute;
  width: 50%;
  height: 56px;

  border-radius: 4px;
  background: ${colors.accent_5};
  border-width: 1px;
  border-color: ${colors.accent_4};
`;
