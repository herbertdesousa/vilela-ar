import styled, { css } from 'styled-components/native';
import { Animated, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import { shade } from 'polished';
import colors from '@/styles/colors';
import fonts from '@/styles/fonts';

import { IPropsType } from '.';

interface IProps {
  isActive: boolean;
}

interface ITextFieldContainerProps {
  isActive: boolean;
  isError: boolean;
  type: IPropsType;
}

export const TextFieldContainer = styled.View<ITextFieldContainerProps>`
  justify-content: center;

  min-height: 56px;
  padding: 8px 16px 8px 16px;

  border-radius: 4px;
  border-width: 1px;
  border-color: ${colors.accent_4};
  background: ${colors.accent_5};

  ${props =>
    props.isActive &&
    css`
      border-color: ${shade(0.1, colors.accent_4)};
    `}

  ${props =>
    props.isError &&
    css`
      border-bottom-color: ${colors.error};
      border-bottom-width: 2px;
    `}

  ${props =>
    props.type === 'textarea' &&
    css`
      height: 110px;
      justify-content: flex-start;
      padding: 16px;
    `}
`;

export const TextFieldInput = styled(TextInput)`
  font-size: 18px;
  color: ${colors.accent_0};
  font-family: ${fonts.medium};
`;

export const TextFieldLabel = styled(Animated.Text)<IProps>`
  position: absolute;
  left: 16px;
  font-size: 16px;
  color: ${colors.accent_0};
  font-family: ${fonts.medium};

  ${props =>
    props.isActive &&
    css`
      color: ${colors.accent_3};
      font-size: 12px;
    `}
`;

interface ITextFieldHelperProps {
  type: 'helper' | 'error';
}

export const TextFieldHelper = styled.Text<ITextFieldHelperProps>`
  color: ${props => (props.type === 'helper' ? colors.accent_0 : colors.error)};
  font-size: 12px;
  font-family: ${fonts.regular};
  margin-top: 4px;
  margin-left: 8px;
`;

export const TextFieldAutoCompleteContainer = styled.View`
  position: absolute;
  top: 58px;

  /* margin-top: 4px; */
  z-index: 100;
  width: 100%;
  padding: 4px 0;
  background: ${colors.accent_5};
  border-radius: 4px;
  border-width: 1px;
  border-color: ${colors.accent_4};
`;

export const TextFieldAutoCompleteItem = styled(RectButton)`
  flex-direction: row;
  align-items: center;

  width: 100%;
  height: 56px;
  border-radius: 4px;
  padding-left: 16px;

  border-bottom-width: 1px;
  border-bottom-color: ${colors.accent_4};
  background-color: ${colors.accent_5};
`;

interface ITextFieldAutoCompleteTextProps {
  type: 'forecast' | 'typed';
}
export const TextFieldAutoCompleteItemText = styled.Text<ITextFieldAutoCompleteTextProps>`
  font-size: 16px;
  font-family: ${props =>
    props.type !== 'typed' ? fonts.regular : fonts.medium};
  color: ${props =>
    props.type === 'typed' ? colors.accent_0 : colors.accent_0};
`;
