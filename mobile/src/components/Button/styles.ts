import styled, { css } from 'styled-components/native';
import { View, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import colors from '@/styles/colors';
import fonts from '@/styles/fonts';

import { IButtonType } from '.';

interface IProps {
  isActive: boolean;
  type: IButtonType;
}

export const ButtonContainer = styled(View)<IProps>`
  align-items: center;
  justify-content: center;

  border-radius: 4px;
  background: ${colors.primary};
  height: 56px;

  ${props =>
    !props.isActive &&
    css`
      background: ${colors.accent_4};
    `}

  ${props =>
    props.type === 'outline' &&
    css`
      border-width: 1px;
      border-color: ${colors.accent_4};
      border-radius: 4px;

      background: transparent;
    `}

  ${props =>
    props.type === 'delete' &&
    css`
      background: ${colors.error};
    `}
`;

export const ButtonRipple = styled(RectButton).attrs({
  rippleColor: colors.accent_4,
})`
  align-items: center;
  justify-content: center;
  flex-direction: row;

  border-radius: 4px;
  height: 100%;
  width: 100%;
`;

/* ${props =>
    props.type === 'outline' &&
    css`
      color: ${colors.};

      ${!props.isActive &&
      css`
        color: ${colors.base_gray};
      `}
    `} */
export const ButtonLabel = styled(Text)<IProps>`
  font-family: ${fonts.medium};
  font-size: 16px;
  color: ${colors.accent_0};

  ${props =>
    props.type === 'delete' &&
    css`
      color: ${colors.accent_0};

      ${!props.isActive &&
      css`
        color: ${colors.accent_4};
      `}
    `}
`;

export const ButtonLoading = styled.ActivityIndicator``;
