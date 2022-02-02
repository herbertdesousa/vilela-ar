import React from 'react';
import { ViewStyle } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import Text from '../Text';
import { ItemContainer } from './styles';

interface IItemProps {
  onPress?(): void;
  item: {
    title: string;
    content?: string;
  };
  containerStyle?: ViewStyle;
  contentContainerStyle?: ViewStyle;
}

const Item: React.FC<IItemProps> = ({
  onPress,
  item,
  containerStyle,
  contentContainerStyle,
}) => {
  return (
    <RectButton onPress={onPress} style={containerStyle}>
      <ItemContainer style={contentContainerStyle}>
        <Text type="title" style={{ marginBottom: 8 }} numberOfLines={1}>
          {item.title}
        </Text>

        {item.content && <Text type="base">{item.content}</Text>}
      </ItemContainer>
    </RectButton>
  );
};

export default Item;
