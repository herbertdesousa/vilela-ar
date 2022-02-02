import React from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';

import colors from '@/styles/colors';

import {
  ButtonContainer,
  ButtonLabel,
  ButtonLoading,
  ButtonRipple,
} from './styles';

export type IButtonType = 'submit' | 'outline' | 'delete';
interface IButtonProps {
  type?: IButtonType;
  onPress?: () => void;

  isLoading?: boolean;
  isActive?: boolean;

  secondLabel?: string;

  containerStyle?: StyleProp<ViewStyle>;
  rippleStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;

  children: React.ReactElement | string | React.ReactElement[];
}

const Button: React.FC<IButtonProps> = ({
  children,
  type = 'submit',
  secondLabel,

  isLoading = false,
  rippleStyle,
  isActive = true,
  onPress,

  containerStyle,
  labelStyle,
}) => {
  return (
    <ButtonContainer isActive={isActive} type={type} style={containerStyle}>
      {!isLoading && (
        <ButtonRipple
          enabled={isActive}
          onPress={onPress}
          style={[
            {
              justifyContent: secondLabel ? 'space-between' : 'center',
              padding: secondLabel ? 16 : 0,
            },
            rippleStyle,
          ]}
        >
          <ButtonLabel type={type} isActive={isActive} style={labelStyle}>
            {children}
          </ButtonLabel>

          {!!secondLabel && (
            <ButtonLabel type={type} isActive={isActive}>
              {secondLabel}
            </ButtonLabel>
          )}
        </ButtonRipple>
      )}

      {isLoading && (
        <ButtonLoading
          color={type === 'outline' ? colors.primary : colors.accent_0}
          size="large"
        />
      )}
    </ButtonContainer>
  );
};

export default Button;
