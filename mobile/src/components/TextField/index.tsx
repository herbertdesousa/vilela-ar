import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Animated,
  NativeSyntheticEvent,
  ScrollView,
  StyleProp,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';

import { useField } from 'formik';
import {
  TextFieldAutoCompleteContainer,
  TextFieldAutoCompleteItem,
  TextFieldAutoCompleteItemText,
  TextFieldContainer,
  TextFieldHelper,
  TextFieldInput,
  TextFieldLabel,
} from './styles';

interface IAutoCompleteItem {
  id: string;
  label: string;
  value: string;
}

export type IPropsType = 'textarea' | 'single';
interface IProps extends TextInputProps {
  name: string;
  type?: IPropsType;
  label: string;
  helpers?: string[];

  autoComplete?: {
    onQuery: (
      query: string,
    ) => IAutoCompleteItem[] | Promise<IAutoCompleteItem[]>;
    onSelect?: (item: IAutoCompleteItem) => void;
  };
  formatOnChange?: (item: string) => string;

  containerStyle?: StyleProp<ViewStyle>;
}

const TextField: React.FC<IProps> = ({
  name,
  label,
  type = 'single',
  containerStyle,
  helpers = [],
  autoComplete,
  formatOnChange,
  ...rest
}) => {
  const inputRef = useRef<TextInput>(null);

  const [field, meta] = useField(name);
  const [isFocused, setIsFocused] = useState(false);
  const [autoCompletedData, setAutoCompletedData] = useState<
    IAutoCompleteItem[]
  >([]);
  const [autocompleteSelectedItem, setAutoCompletedCompleteItem] = useState<
    IAutoCompleteItem | undefined
  >();

  const animatedLabelTranslateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (type === 'textarea') {
      Animated.timing(animatedLabelTranslateY, {
        toValue: isFocused || !!field.value ? 0 : 16,
        duration: 200,
        useNativeDriver: true,
      }).start();
      return;
    }

    Animated.timing(animatedLabelTranslateY, {
      toValue: isFocused || !!field.value ? -18 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [animatedLabelTranslateY, isFocused, field.value, type]);

  const onFocus = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(true);
      rest.onFocus && rest.onFocus(e);
    },
    [rest],
  );

  const onBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocused(false);
      field.onBlur(name)(e);
      rest.onBlur && rest.onBlur(e);
    },
    [field, name, rest],
  );

  const onChangeText = useCallback(
    async (_text: string) => {
      const parsedText = formatOnChange ? formatOnChange(_text) : _text;
      field.onChange(name)(parsedText);

      if (autoComplete) {
        setAutoCompletedData(await autoComplete.onQuery(parsedText));
      }
    },
    [autoComplete, field, formatOnChange, name],
  );

  const onSelectItemAutoComplete = useCallback(
    (item: IAutoCompleteItem) => {
      setAutoCompletedCompleteItem(item);
      field.onChange(name)(item.value);
      autoComplete && autoComplete.onSelect && autoComplete.onSelect(item);
    },
    [autoComplete, field, name],
  );

  const isShowingAutoComplete =
    !!autoCompletedData.length && isFocused && field.value.length > 0;

  const isShowingError = meta.touched && !!meta.error;

  return (
    <View style={[containerStyle, { zIndex: isShowingAutoComplete ? 100 : 0 }]}>
      <TextFieldContainer
        isActive={isFocused}
        isError={isShowingError}
        type={type}
      >
        <TextFieldInput
          ref={inputRef}
          onFocus={onFocus}
          onBlur={onBlur}
          onChangeText={onChangeText}
          value={field.value}
          // textarea
          numberOfLines={type === 'textarea' ? 4 : 1}
          multiline={type === 'textarea'}
          style={{ textAlignVertical: type === 'textarea' ? 'top' : 'center' }}
          //
          {...rest}
        />
        <TextFieldLabel
          style={{ transform: [{ translateY: animatedLabelTranslateY }] }}
          onPress={() => inputRef.current?.focus()}
          isActive={isFocused || !!field.value}
        >
          {label}
        </TextFieldLabel>
      </TextFieldContainer>

      {isShowingError && (
        <TextFieldHelper type="error">{`* ${meta.error}`}</TextFieldHelper>
      )}
      {helpers.map(item => (
        <TextFieldHelper key={item} type="helper">
          {`* ${item}`}
        </TextFieldHelper>
      ))}

      {isShowingAutoComplete && (
        <TextFieldAutoCompleteContainer>
          <ScrollView keyboardShouldPersistTaps="handled">
            {autoCompletedData.map(item => (
              <TextFieldAutoCompleteItem
                key={item.id}
                onPress={() => onSelectItemAutoComplete(item)}
              >
                <TextFieldAutoCompleteItemText type="typed">
                  {item.label.slice(0, field.value.length)}
                </TextFieldAutoCompleteItemText>
                <TextFieldAutoCompleteItemText type="forecast">
                  {item.label.slice(field.value.length)}
                </TextFieldAutoCompleteItemText>
              </TextFieldAutoCompleteItem>
            ))}
          </ScrollView>
        </TextFieldAutoCompleteContainer>
      )}
    </View>
  );
};

export default TextField;
