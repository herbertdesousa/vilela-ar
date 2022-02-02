import React from 'react';
import { View, ViewStyle } from 'react-native';

import { useField } from 'formik';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import {
  SwitchCase,
  SwitchCaseSelect,
  SwitchCaseText,
  SwitchTitle,
} from './styles';

interface ISwitchProps {
  name: string;
  label: string;
  options: {
    options1: {
      label: string;
      value: string;
    };
    options2: {
      label: string;
      value: string;
    };
  };
  containerStyle?: ViewStyle;
}

const option2PositionX = { value: 0 };

const Switch: React.FC<ISwitchProps> = ({
  name,
  label,
  options,
  containerStyle,
}) => {
  const [field] = useField(name);

  const sharedSelect = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: sharedSelect.value }],
  }));

  return (
    <View style={containerStyle}>
      <SwitchTitle>{label}</SwitchTitle>

      <View style={{ flexDirection: 'row' }}>
        <SwitchCase
          onPress={() => {
            sharedSelect.value = withTiming(0);
            field.onChange(name)(options.options1.value);
          }}
        >
          <SwitchCaseText>{options.options1.label}</SwitchCaseText>
        </SwitchCase>

        <SwitchCase
          onPress={() => {
            sharedSelect.value = withTiming(option2PositionX.value);
            field.onChange(name)(options.options2.value);
          }}
          onLayout={event => {
            option2PositionX.value = event.nativeEvent.layout.x;
          }}
        >
          <SwitchCaseText>{options.options2.label}</SwitchCaseText>
        </SwitchCase>
        <SwitchCaseSelect style={animatedStyle} />
      </View>
    </View>
  );
};

export default Switch;
